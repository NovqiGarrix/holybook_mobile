import { FunctionComponent, useContext, useEffect, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  Text,
  ActivityIndicator,
  ListRenderItemInfo,
} from "react-native";
import { useQuery } from "react-query";

import COLORS from "../constants/COLORS";
import { MainContext } from "../contexts/MainContext";

import getChapters from "../fetchers/getChapters";
import useSearch from "../hooks/useSearch";
import Chapter from "./Chapter";

const Chapters: FunctionComponent = () => {
  const { setActiveChapter, activeChapter, activeBook } =
    useContext(MainContext);
  const { query } = useSearch();

  const flatListRef = useRef<FlatList | null>(null);

  const {
    data: chaptersData,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["chapters", activeBook],
    () => getChapters(activeBook?.kitab!),
    { enabled: false }
  );

  useEffect(() => {
    if (activeBook) {
      refetch().then(({ data }) => {
        if (!data?.chapters.length) return;

        setActiveChapter(data.chapters[0]!);
      });
    }
  }, [activeBook?.kitab]);

  /**
   * Handle search
   */
  useEffect(() => {
    if (!query) return;
    if (!activeBook) return;
    if (!chaptersData?.chapters.length) return;

    const chapters = chaptersData.chapters;

    let chapterQuery: string | number = query;

    if (chapterQuery.includes(":")) {
      chapterQuery = chapterQuery.split(":")[0];
      chapterQuery = Number(
        chapterQuery.split(" ").length >= 3
          ? chapterQuery.split(" ")[2]
          : chapterQuery.split(" ")[1]
      );
    } else {
      chapterQuery =
        chapterQuery.split(" ")[1]?.length > 2
          ? chapterQuery.split(" ")[2]
          : chapterQuery.split(" ")[1];
      chapterQuery = Number(chapterQuery);
    }

    const matchedChapter = chapters.find(
      (book) => book.pasal === chapterQuery && book.kitabId === activeBook.id
    );
    const matchedChapterIndex = chapters.findIndex(
      (book) => book.pasal === chapterQuery && book.kitabId === activeBook.id
    );

    if (matchedChapter) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: matchedChapterIndex,
          animated: true,
        });
      }

      setActiveChapter(matchedChapter);
    }
  }, [activeBook, query, chaptersData?.chapters.length]);

  const RenderChapter = (info: ListRenderItemInfo<any>) => {
    const isActive = info.item.pasal === activeChapter?.pasal;
    return (
      <TouchableWithoutFeedback onPress={() => setActiveChapter(info.item)}>
        <View style={{ padding: 5 }}>
          <Chapter
            isActive={isActive}
            activeBook={activeBook!}
            chapter={info.item}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
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
        <>
          {(chaptersData?.chapters.length ?? 0) > 0 && (
            <>
              <View style={{ zIndex: -10 }}>
                <View
                  style={{
                    height: 200,
                    flex: 1,
                    position: "absolute",
                    top: -50,
                    left: 35,
                    width: 1,
                    backgroundColor: "#fff",
                  }}
                />
                <View
                  style={{
                    height: 40,
                    flex: 1,
                    position: "absolute",
                    top: 70,
                    left: 33.5,
                    width: 4,
                    backgroundColor: "#fff",
                  }}
                />
              </View>

              <FlatList
                ref={flatListRef}
                data={chaptersData?.chapters}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                initialNumToRender={chaptersData?.chapters.length ?? 100}
                onScrollToIndexFailed={(info) =>
                  // flatListRef.current?.scrollToIndex({
                  //   animated: true,
                  //   index: info.index,
                  // })
                  console.log(info.index)
                }
                style={{
                  flexGrow: 0,
                  overflow: "visible",
                  padding: 5,
                }}
                renderItem={RenderChapter}
                keyExtractor={(item) => item.id}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Chapters;
