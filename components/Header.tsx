import { FunctionComponent } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import COLORS from "../constants/COLORS";
import IMAGES from "../constants/IMAGES";

const Header: FunctionComponent = () => {
  return (
    <>
      <TouchableOpacity onPress={() => console.log("Open Sidebar")}>
        <Image
          source={IMAGES.menuIcon}
          style={{ width: 24, height: 24, overlayColor: "#fff" }}
        />
      </TouchableOpacity>

      <View style={{ position: "relative" }}>
        <Text
          style={{
            fontFamily: "Trirong_500Medium",
            fontSize: 35,
            marginTop: 50,
            color: "#fff",
          }}
        >
          the
        </Text>
        <Text
          style={{
            fontFamily: "Trirong_300Light",
            fontSize: 28,
            marginTop: -15,
            color: "#fff",
          }}
        >
          HOLY BOOK
        </Text>

        <Image
          source={IMAGES.cross}
          style={{
            position: "absolute",
            top: -10,
            right: 25,
            resizeMode: "cover",
            transform: [{ scale: 1.2 }],
            opacity: 0.8,
          }}
        />
      </View>
    </>
  );
};

export default Header;
