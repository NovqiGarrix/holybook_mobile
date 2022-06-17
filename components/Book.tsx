import { FunctionComponent, MutableRefObject } from "react";
import { Image, Text, View } from "react-native";
import COLORS from "../constants/COLORS";
import IMAGES from "../constants/IMAGES";
import { IBook } from "../types";

interface IBookProps {
  book: IBook;
  index: number;
  isActive?: boolean;
}
const Book: FunctionComponent<IBookProps> = (props) => {
  const { isActive, book, index } = props;

  return (
    <View
      style={{
        backgroundColor: isActive ? "#fff" : COLORS.darkBlue,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 7,
        width: 125,
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowColor: "#171717",
        elevation: isActive ? 5 : 3,
        transform: [{ scale: isActive ? 1.1 : 1 }],
        marginHorizontal: isActive ? 10 : 0,
        marginLeft: index === 0 ? 0 : undefined,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: isActive ? "rgba(154, 186, 236, .4)" : COLORS.darkBlue,
          paddingBottom: 2,
          borderRadius: 12,
          paddingVertical: isActive ? 15 : 10,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: isActive ? "Dosis_700Bold" : "Dosis_400Regular",
            fontSize: 16,
            textAlign: "center",
            color: isActive ? "#000" : "#fff",
          }}
        >
          {book.kitab}
        </Text>
        {isActive ? (
          <Image
            source={IMAGES.blackCross}
            style={{
              transform: [{ scale: 0.6 }],
              marginTop: -10,
              opacity: 5,
            }}
          />
        ) : (
          <Image
            source={IMAGES.cross}
            style={{
              transform: [{ scale: 0.6 }],
              marginTop: -18,
              opacity: 5,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Book;
