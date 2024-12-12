import {
  ImageBackground,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity, Platform
} from "react-native";
import React, {useCallback, useRef, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useRouter} from "expo-router";
import {useArtistProfile} from "../../hooks/Artist/useArtistProfile";
import SocialTabs from "../../components/SocialTabs/SocialTabs";
import ChartPerformance from "./Analitics/components/Performance";
import TopTracks from "./Analitics/components/TopTracks";
import {RelatedTracks} from "./Analitics/components/RelatedTracks";
import Chart from "./Analitics/components/Chart/Chart";
import ChartComponent from "./Analitics/components/Chart/Chart";
import get from "lodash.get";
import {overviewSources} from "../../consts/favoriteSources";
import {useArtist} from "../../hooks/Artist/useArtist";
import SearchButton from "../../(tabs)/(drawer)/home/components/SearchButton/SearchButton";
import SearchBar from "../../(tabs)/(drawer)/home/components/SearchBar/SearchBar";
import {useOpenSearchBar} from "../../hooks/SearchBar/useOpenSearchBar";
import {SafeAreaView} from "react-native-safe-area-context";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import BurgerIcon from "../../../assets/SVG/BurgerIcon";


const ArtistProfile = () => {
  const {data: artist} = useArtistProfile();
  const {source, setSource} = useArtist();
  // console.log("artist", JSON.stringify({ artist }, null, 2));
  const router = useRouter();
  const handleClick = useCallback((index: number) => {
    setSource(get(overviewSources, `${index}.slug`));
  }, [source, overviewSources]);
  const {openSearchBar, setOpenSearchBar} = useOpenSearchBar();
  console.log(router)
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <View className="bg-gray-900 w-full h-full">
      {
        openSearchBar && (
          <View className="w-full h-full mt-8 flex ">
            <SearchBar/>
          </View>
        )
      }
      {
        Platform.OS === 'android'
          ? <TouchableOpacity className='absolute top-10 z-10 left-8' onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer())
          }}>
            <BurgerIcon/>
          </TouchableOpacity>
          : null
      }
      <ImageBackground source={{
        uri: artist?.account.imageUrl
      }}
                       resizeMode="cover" className="w-full h-full" blurRadius={15}>
        <LinearGradient
          colors={["transparent", "rgba(17,24,39,0.8)", "#111827"]}
          style={{position: "absolute", width: "100%", height: "100%"}}
        />
        <View className="mt-10">

        </View>
        <SafeAreaView className="w-full h-full relative">
          <ScrollView className={`px-4 flex flex-col h-full ${Platform.OS === 'android' ? 'mt-10' : ''}`}
                      contentContainerStyle={{justifyContent: "space-between"}}>
            <SearchButton onPress={() => setOpenSearchBar(!openSearchBar)}/>
            <View className="w-full px-24 py-8 flex-1">

              <View className="w-[100%] h-[100%] flex flex-col items-center">
                <Image source={{
                  uri: artist?.account.imageUrl
                }} className="w-48 h-48 rounded-3xl" resizeMode="cover"/>
                <View className="flex flex-col gap-y-5 items-center pt-8">
                  <Text className="text-2xl text-white font-bold tracking-wider block">{artist?.account.name}</Text>
                  {/*<View className="flex w-8 h-8 items-center justify-center">
                    <LinearGradient
                      colors={["rgba(57,58,138,0.7)", "#111827"]}
                      style={{position: "absolute", width: "100%", height: "100%", borderRadius: 6}}
                    />
                  </View>*/}
                  <Text className="text-md  capitalize text-indigo-400">Playlist & Chart Positions</Text>

                </View>
              </View>
            </View>
            <View className="flex-1 ">
              <SocialTabs onPress={handleClick}/>
            </View>
            <ChartComponent/>
            <ChartPerformance/>
            <TopTracks/>
            <RelatedTracks/>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default ArtistProfile;
