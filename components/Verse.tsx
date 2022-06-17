import { FunctionComponent, useContext } from "react";
import { Image, Text, View } from "react-native";
import COLORS from "../constants/COLORS";
import ETC from "../constants/ETC";
import IMAGES from "../constants/IMAGES";
import { MainContext } from "../contexts/MainContext";
import { IAyat } from "../types";

interface IVerseProps {
  verse: IAyat;
  isActive: boolean;
}
const Verse: FunctionComponent<IVerseProps> = (props) => {
  const { verse, isActive } = props;
  const { activeBook, activeChapter } = useContext(MainContext);

  return (
    <>
      {activeBook && activeChapter && (
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              // justifyContent: "space-between",
              // paddingRight: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Dosis_600SemiBold",
                color: "#fff",
                marginBottom: 10,
                fontSize: isActive ? 16 : 14,
              }}
            >
              {verse.query}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: isActive ? "Dosis_600SemiBold" : "Dosis_500Medium",
              color: COLORS.dark,
              lineHeight: 25,
              fontSize: isActive ? 16 : 14,
            }}
          >
            {verse.description}
          </Text>
        </View>
      )}
    </>
  );
};

export default Verse;
