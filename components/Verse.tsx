import { FunctionComponent, useContext } from "react";
import { Text, View } from "react-native";
import COLORS from "../constants/COLORS";
import { MainContext } from "../contexts/MainContext";
import { IAyat } from "../types";

interface IVerseProps {
  verse: IAyat;
}
const Verse: FunctionComponent<IVerseProps> = (props) => {
  const { activeBook, activeChapter } = useContext(MainContext);
  const { verse } = props;

  return (
    <>
      {activeBook && activeChapter && (
        <View
          style={{
            width: "100%",
          }}
        >
          <Text style={{ fontFamily: "Dosis_400Regular", color: "#fff" }}>
            {verse.query}
          </Text>
          <Text style={{ fontFamily: "Dosis_400Regular", color: COLORS.dark }}>
            {verse.description}
          </Text>
        </View>
      )}
    </>
  );
};

export default Verse;
