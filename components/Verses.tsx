import {
  FunctionComponent,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  LayoutChangeEvent,
  Keyboard,
} from "react-native";
import { useQuery } from "react-query";
import COLORS from "../constants/COLORS";
import { MainContext } from "../contexts/MainContext";
import getVerses from "../fetchers/getVerses";
import useSearch from "../hooks/useSearch";
import { IAyat } from "../types";
import Verse from "./Verse";

interface IVersesProps {
  scrollViewRef: RefObject<ScrollView>;
}
const Verses: FunctionComponent<IVersesProps> = ({ scrollViewRef }) => {
  const { activeChapter, activeBook, versesRefs } = useContext(MainContext);
  const { isLoading, isError, refetch, data } = useQuery(
    ["verses", activeChapter],
    () => getVerses(activeBook?.kitab!, activeChapter?.pasal!),
    { enabled: false }
  );
  const [activeVerse, setActiveVerse] = useState<Record<string, IAyat>>({});
  const { query } = useSearch();

  useEffect(() => {
    if (!activeBook?.kitab || !activeChapter?.pasal) return;
    refetch();
  }, [activeBook?.kitab, activeChapter?.id]);

  /**
   * Handle search
   */
  useEffect(() => {
    if (!query) return;
    if (!activeChapter) return;
    if (!data?.ayat.length) return;

    const verses = data.ayat;

    let verse: string | number = query.split(":")[1];
    let endVerse: string | number = verse?.split("-")[1];
    if (!verse) return;

    verse = Number(verse?.split("-")[0]);

    const matchedVerse = verses.find(
      (_verse) => _verse.ayat === verse && _verse.pasalId === activeChapter.id
    );
    const matchedVerseIndex = verses.findIndex(
      (_verse) => _verse.ayat === verse && _verse.pasalId === activeChapter.id
    );

    if (matchedVerse) {
      Keyboard.dismiss();

      const currentRef = versesRefs[matchedVerseIndex];
      setActiveVerse((prev) => ({ ...prev, [matchedVerse.id]: matchedVerse }));

      currentRef.current.measure((_x, _y, _widht, _hei, _pageX, pageY) => {
        if (!pageY) return;
        const newPageY = pageY - 200;
        scrollViewRef?.current?.scrollTo({ animated: true, y: newPageY });
      });

      endVerse = Number(endVerse);
      if (endVerse && typeof endVerse === "number" && endVerse > verse) {
        for (let index = verse + 1; index <= Number(endVerse); index++) {
          const otherVerse = verses.find((_verse) => _verse.ayat === index);
          if (otherVerse)
            setActiveVerse((prev) => ({
              ...prev,
              [otherVerse.id]: otherVerse,
            }));
        }
      }
    }
  }, [activeChapter?.id, query]);

  return (
    <View
      style={{
        paddingLeft: 55,
        marginTop: 25,
        height: "100%",
        marginBottom: data?.ayat.length
          ? data.ayat[data.ayat.length - 1].description.length
          : 50,
      }}
    >
      {isLoading ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color={COLORS.darkBlue}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{
              fontFamily: "Dosis_400Regular",
              fontSize: 16,
              color: "#FFF",
            }}
          >
            Getting all chapters...
          </Text>
        </View>
      ) : isError ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Dosis_600SemiBold",
              fontSize: 18,
            }}
          >
            An error occured
          </Text>
        </View>
      ) : (
        (data?.ayat?.length ?? 0) > 0 &&
        data?.ayat.map((verse, index) => {
          return (
            <View
              ref={versesRefs[index]}
              style={{ marginBottom: 20 }}
              key={verse.id}
            >
              <Verse verse={verse} />
            </View>
          );
        })
      )}
    </View>
  );
};

export default Verses;
