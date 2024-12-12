import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import SearchIcon from "../../../../../../assets/SVG/SearchIcon";


 const SearchButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}
      className='flex h-10 px-4 py-2 bg-transparent border rounded-lg border-slate-400/20 w-full flex-row items-center relative justify-between'>
      <Text className='text-sm text-gray-400'>
        Search for Artists, Labels or Songs...
      </Text>
      <SearchIcon color='#9ca3af'/>
    </TouchableOpacity>
  )
}
export default SearchButton