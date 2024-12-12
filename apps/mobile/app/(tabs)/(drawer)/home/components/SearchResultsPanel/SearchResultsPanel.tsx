import { useSearch } from "../../../../../hooks/Search/useSearch";
import React from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useArtist } from "../../../../../hooks/Artist/useArtist";
import { useArtistProfile } from "../../../../../hooks/Artist/useArtistProfile";
import { useOpenSearchBar } from "../../../../../hooks/SearchBar/useOpenSearchBar";


const RenderItem = ({ item, router }) => {
  const { setArtistUniqueId } = useArtist();
  const { setValue } = useSearch();
  const {setOpenSearchBar} = useOpenSearchBar();

  return (
    <>
      <View className="py-2 px-4 bg-[#e2e8f00d] w-full">
        <Text className="text-sm text-[#777aaf] font-semibold tracking-loose uppercase">{item.title}</Text>
      </View>
      <>
        {item.items.map((elem, i) => (
          <TouchableOpacity activeOpacity={1}
                            onPress={() => {
                              setArtistUniqueId(elem.id);
                              router.replace("/(tabs)/home");
                              setValue('');
                              setOpenSearchBar(false)
                            }}
                            className="flex flex-row w-full py-2 px-4 justify-start items-center gap-x-2  border-b border-[#e2e8f00d]"
                            key={i}>
            <Image source={{ uri: `${elem.photo}` }} className="w-5 h-5 rounded-full mr-3" />
            <View className="flex flex-col w-full gap-y-2 ">
              <Text className="truncate text-gray-500 capitalize text-[12px]">{elem.description}</Text>
              <Text key={i} className="truncate font-semibold text-[14px] text-gray-400">{elem.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </>
    </>
  );
};
 const SearchResultsPanel = () => {
  const router = useRouter();
  const { data, loading, error, setValue } = useSearch();
  // console.log(JSON.stringify({ data, loading, error }, null, 2));
  return (
    <View className="w-full bg-[#e2e8f00d]">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <RenderItem item={item} router={router} />
        )}
      />
    </View>
  );
};
export default SearchResultsPanel