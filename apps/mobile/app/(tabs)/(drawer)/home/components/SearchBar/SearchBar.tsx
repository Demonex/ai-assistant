import React, {useEffect, useRef, useState} from "react";
import {
  View,
  Animated, TextInput, Touchable, TouchableOpacity, Text
} from "react-native";

import SearchIcon from "../../../../../../assets/SVG/SearchIcon";
import {useSearch} from "../../../../../hooks/Search/useSearch";
import {SearchResultsPanel} from "../SearchResultsPanel/SearchResultsPanel";
import {useOpenSearchBar} from "../../../../../hooks/SearchBar/useOpenSearchBar";

 const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(true);
  const {data, loading, error, setValue, value} = useSearch();
  const {setOpenSearchBar} = useOpenSearchBar();

  // console.log(JSON.stringify({ data, loading, error }, null, 2));
  // console.log("value", value);
  return (

    <View className="w-full h-full bg-[#111827] absolute top-[10%] left-0 ">
      <View className="w-full h-full flex justify-start items-center px-3">
        <View
          className={`w-full bg-[#1e293b] shadow-md  py-4 px-4 ${value ? "rounded-t-md" : "rounded-md"}`}>
          <View className="w-full flex flex-row justify-between items-center ">
            <SearchIcon color={isFocused ? "#818cf8" : "#9ca3af"}/>
            <TextInput
              autoFocus={true}
              placeholder="Search for Artists, Labels or Songs..."
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              inputMode="text"
              className="border-r border-[#e2e8f00d] flex-1 pl-3 mr-3 text-md text-start text-white py-4"
              onChangeText={(text) => setValue(text)}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => setOpenSearchBar(false)}>
              <Text className="text-gray-400">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          value && (
            <SearchResultsPanel/>
          )
        }
      </View>
    </View>
  );
};
export default SearchBar