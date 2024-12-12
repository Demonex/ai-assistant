import { Text, TextInput, View } from "react-native";
import React from "react";

type CustomInputTypeProps = {
  title?: string
  placeholder?: string
  inputMode: React.HTMLAttributes<HTMLLIElement>["inputMode"]
  keyboardType: any
  value: string
  onChange?: () => void
  secureTextEntry?: boolean
  anotherChild?: any
}
const CustomInput = ({
  title,
  placeholder,
  inputMode,
  keyboardType,
  value,
  onChange,
  secureTextEntry,
  anotherChild
}: CustomInputTypeProps) => {
  return (
    <>
      <Text className="text-medium_grey text-caption_m_desk">
        {title}
      </Text>
      <View className="w-full flex flex-row justify-between rounded-xl border border-secondary_dark_gray px-3.5 py-2.5 mt-1.5 h-12">
        <TextInput
          className="text-t2Regular text-white w-2/3"
          placeholder={placeholder}
          placeholderTextColor="#7B7B7B"
          inputMode={inputMode}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          inputAccessoryViewID="Dismiss"

        >
        </TextInput>
        {anotherChild}
      </View>
    </>
  );
};
export default CustomInput;