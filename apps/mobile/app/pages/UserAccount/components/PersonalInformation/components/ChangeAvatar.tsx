import { Text, TouchableOpacity, View } from "react-native";
import AccountAvatarIcon from "../../../../../../assets/SVG/AccountAvatarIcon";
import ModifyIcon from "../../../../../../assets/SVG/ModifyIcon";

 export const ChangeAvatar = () => {
  return (
    <View className="flex flex-row gap-x-8 items-center">
      <View className="border border-slate-200/40 w-20 h-20 rounded-md flex items-center justify-center">
        <AccountAvatarIcon/>
        <View className='p-[4px] absolute -bottom-[9%] -right-2 bg-gray-900'>
          <ModifyIcon/>
        </View>
      </View>
      <View>
        <TouchableOpacity className="rounded-md bg-white/10 px-3 py-2 flex justify-center items-center">
          <Text className="text-sm font-semibold text-white">Change avatar</Text>
        </TouchableOpacity>
        <Text className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</Text>
      </View>
    </View>
  )
}

export default {ChangeAvatar}