import { Text, TouchableOpacity } from "react-native";
import React from "react";


type PrimaryButtonProps = {
  onPress?: () => void
  title: string
}
 const PrimaryButton = ({onPress, title}: PrimaryButtonProps) => {

  return (
    <TouchableOpacity
      className="py-4 px-8 w-full bg-primary_blue rounded-[12px]"
      onPress={onPress}><Text className="text-caption_m_desk text-white text-center ">{title}</Text></TouchableOpacity>
  )
}
export default PrimaryButton