import {Text, TouchableOpacity, View} from "react-native";
import {ChangeAvatar} from "./components/ChangeAvatar";
import {ChangeName} from "./components/ChangeName";
import ArrowBack from "../../../../../assets/SVG/ArrowBack";
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

export const PersonalInformation = () => {
  const router = useRouter();

  return (
    <View className="w-full h-full bg-gray-900">
      <SafeAreaView>
        <View className="p-4 w-full h-full flex gap-y-6 pt-12">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowBack/>
          </TouchableOpacity>
          <View className='mb-10'>
            <Text className="text-2xl font-extrabold tracking-tight text-slate-200">Personal Information</Text>
            <Text className="mt-1 text-sm leading-6 text-gray-400">Use a permanent address where you can receive
              mail.</Text>
          </View>
          <ChangeAvatar/>
          <ChangeName/>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default {
  PersonalInformation
}