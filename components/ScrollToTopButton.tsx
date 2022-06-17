import { FunctionComponent } from "react";
import { Image, TouchableOpacity } from "react-native";
import COLORS from "../constants/COLORS";
import IMAGES from "../constants/IMAGES";

interface IScrollToTopButtonProps {
  handler: () => void;
}
const ScrollToTopButton: FunctionComponent<IScrollToTopButtonProps> = ({
  handler,
}) => {
  return (
    <TouchableOpacity
      onPress={handler}
      style={{
        padding: 5,
        position: "absolute",
        left: 25,
        bottom: 30,
        backgroundColor: COLORS.darkBlue,
        borderRadius: 20,
        elevation: 1.5,
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        shadowColor: "#171717",
      }}
    >
      <Image source={IMAGES.chevronUp} style={{}} />
    </TouchableOpacity>
  );
};

export default ScrollToTopButton;
