import { FunctionComponent } from "react";
import { View, Text } from "react-native";
import COLORS from "../constants/COLORS";
import { IBook, IPasal } from "../types";

interface IChapterProps {
  chapter: IPasal;
  isActive: boolean;
  activeBook: IBook;
}
const Chapter: FunctionComponent<IChapterProps> = (props) => {
  const { activeBook, chapter, isActive } = props;

  return (
    <View
      style={{
        backgroundColor: isActive ? "#fff" : COLORS.darkBlue,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowColor: "#171717",
        elevation: isActive ? 3 : 1,
      }}
    >
      <Text
        style={{
          fontFamily: "Trirong_500Medium",
          color: isActive ? COLORS.dark : "#fff",
          fontSize: 12,
        }}
      >
        {activeBook?.kitab} {chapter.pasal}
      </Text>
    </View>
  );
};

export default Chapter;
