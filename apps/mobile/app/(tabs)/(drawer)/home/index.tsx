import {useArtist} from "../../../hooks/Artist/useArtist";
import {View} from "react-native";
import React, {useState} from "react";
import SearchButton from "./components/SearchButton/SearchButton";
import SearchBar from "./components/SearchBar/SearchBar";
import ArtistProfile from "../../../pages/artistprofile";
import {useOpenSearchBar} from "../../../hooks/SearchBar/useOpenSearchBar";
import {SafeAreaView} from "react-native-safe-area-context";

const Item = () => (
  <View className="flex gap-y-1.5">
    <View className="bg-gray-500/10 rounded-xl min-h-[200px]"/>
    <View className="bg-gray-500/10 rounded-md min-h-[20px]"></View>
  </View>

);
const Home = () => {
  const {setOpenSearchBar, openSearchBar} = useOpenSearchBar();

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
  };

  return (
    <>
      <SafeAreaView className="w-full h-full flex flex-col bg-background">
        <View
          className={`w - full h-full flex flex-col gap-y-5 px-4 py-8 ${openSearchBar ? 'opacity-0' : 'opacity-100'}`}>
          <SearchButton onPress={handleOpenSearchBar}/>
        </View>
        {
          openSearchBar && (
            <SearchBar/>
          )
        }

      </SafeAreaView>
    </>
  );
};
export default function PageHome() {
  const {artistUniqueId} = useArtist()
  return !artistUniqueId ? <Home/> : <ArtistProfile/>;
}

