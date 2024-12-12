import { Text, TouchableOpacity } from "react-native";
import React from "react";
import AppleLogoWhite from "../../../assets/SVG/AppleLogoWhite";


type SecondaryButtonProps = {
  onPress?: () => void
  title: string
  element?: any
}
 const SecondaryButton = ({ onPress, title, element }: SecondaryButtonProps) => {

  return (
    <TouchableOpacity
      className="flex items-center justify-center gap-x-3  px-8 py-4 w-full rounded-[12px] border border-medium_grey"
      onPress={onPress}>
      <Text className="text-caption_m_desk text-light_grey text-center">{title}</Text>
      {element}
    </TouchableOpacity>
  );
};
export default SecondaryButton