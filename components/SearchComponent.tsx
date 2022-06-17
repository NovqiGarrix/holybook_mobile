import { FunctionComponent, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

import COLORS from "../constants/COLORS";
import IMAGES from "../constants/IMAGES";
import useDebounce from "../hooks/useDebounce";

const SearchComponent: FunctionComponent = () => {
  const [query, setQuery] = useState("");

  useDebounce(query, 400);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 20,
      }}
    >
      {/* <KeyboardAvoidingView> */}
      <TextInput
        placeholder="Ex: Kejadian 1:1"
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholderTextColor="#ECECEC"
        style={{
          width: "80%",
          marginRight: 10,
          backgroundColor: COLORS.darkBlue,
          borderRadius: 9999,
          paddingHorizontal: 20,
          paddingVertical: 12,
          color: "#fff",
          fontFamily: "Trirong_500Medium",
        }}
      />
      <View
        style={{
          padding: 12,
          backgroundColor: COLORS.darkBlue,
          borderRadius: 9999,
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Image source={IMAGES.bookOpenIcon} style={{}} />
        </TouchableOpacity>
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default SearchComponent;
