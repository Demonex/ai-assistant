import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator, Platform
} from "react-native";
import SocialTabs from "../../../components/SocialTabs/SocialTabs";
import {useArtist} from "../../../hooks/Artist/useArtist";
import {useArtistProfile} from "../../../hooks/Artist/useArtistProfile";
import {useLazyFetch} from "../../../hooks/useFetch";
import React, {useEffect, useState} from "react";
import {BlurView} from "expo-blur";
import {Link} from "expo-router";
import StarIcon from "../../../../assets/SVG/StarIcon";
import InstagramLogo from "../../../../assets/SVG/InstagramLogo";
import ModalFeed from "./components/ModalFeed";
import SearchButton from "../../../(tabs)/(drawer)/home/components/SearchButton/SearchButton";
import SearchBar from "../../../(tabs)/(drawer)/home/components/SearchBar/SearchBar";
import {useOpenSearchBar} from "../../../hooks/SearchBar/useOpenSearchBar";
import {SafeAreaView} from "react-native-safe-area-context";
import {DrawerActions, ParamListBase, useNavigation} from "@react-navigation/native";
import BurgerIcon from "../../../../assets/SVG/BurgerIcon";
import {DrawerNavigationProp} from "@react-navigation/drawer";

export default function Feed() {
  const {artistUniqueId} = useArtist();
  const {data: artistProfile} = useArtistProfile();
  const [page, setPage] = useState(1);
  const [openModalFeed, setOpenModalFeed] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [{data: feedData, loading}, fetchFeed] = useLazyFetch({
    url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/activities/index`
  });
// console.log('page',page)
// console.log('isFetching',isFetching)
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  useEffect(() => {
    void fetchFeed({
      url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/activities/index?page=${page}&source=overview&idUnique=${artistUniqueId}`
    });
  }, [page, artistUniqueId]);
  useEffect(() => {
    if (!isFetching) return;
    setPage((prevState) => prevState + 1);
  }, [isFetching]);
  const {setOpenSearchBar, openSearchBar} = useOpenSearchBar();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
  };
  return (
    <View className="w-full h-full bg-gray-900">
      <SafeAreaView className="w-full h-full">
        {
          openSearchBar && (
            <View className='w-full h-full'>
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
        <View
          className={`p-4 ${Platform.OS === 'android' ? 'mt-10' : ''} ${openSearchBar ? 'opacity-0' : 'opacity-100'}`}>
          <SearchButton onPress={handleOpenSearchBar}/>

        </View>

        <View className="w-full h-full p-4">
          <SocialTabs onPress={() => setOpenModalFeed(true)}/>
          <ModalFeed openModalFeed={openModalFeed} setOpenModalFeed={setOpenModalFeed}/>
          <ScrollView onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              setIsFetching(true);
            }
          }}
                      scrollEventThrottle={400}>
            <View className="w-full absolute py-4 rounded-2xl flex overflow-hidden z-10">
              <BlurView intensity={10}>
                <View className="w-full h-full flex flex-col justify-center items-center gap-4 p-8">
                  <Text className=" text-[18px] font-bold tracking-tight text-slate-200">Want to see your
                    last 30 days of
                    data?</Text>
                  <Text className="capitalize flex text-xs leading-6 font-semibold text-gray-400 ">Subscribe
                    to {artistProfile?.account.name} to
                    unlock your latest activities and get notified right away!</Text>
                  <View className="relative button-wrapper w-fit h-[36px] mt-4 bg-[#4f46e5] rounded-2xl"
                        style={{
                          shadowColor: "#4f46e5", shadowOffset: {
                            width: 0,
                            height: 0
                          },
                          shadowOpacity: 0.50,
                          shadowRadius: 6
                        }}
                  >
                    <TouchableOpacity
                      className="w-full  flex justify-center items-center bg-[#111827] rounded-[10px] px-4 h-full"
                    >
                      <Text className="text-white text-[12px] font-normal">Subscribe
                        to {artistProfile?.account.name}</Text>
                    </TouchableOpacity>
                    <View className="button-bg "></View>
                  </View>
                </View>
              </BlurView>
            </View>
            <View className="relative space-y-2 h-full flex items-end mt-6">
              {
                loading
                  ? <ActivityIndicator style={{position: 'absolute', top: '50%', left: '50%'}}/>
                  : feedData?.tracks.map((item, index) => {
                    const date = new Date(`${item.date}`);
                    const dd = new Date(date).getDate();
                    const mm = new Date(date).toLocaleString("default", {month: "short"});
                    return (
                      <View className="w-[90%] h-fit rounded-2xl border border-white/5 my-4 relative" key={index}>
                        <View className="p-4 flex flex-row items-center gap-x-3">
                          <StarIcon/>
                          <View>
                            <Text
                              className="text-sm leading-6 text-slate-100 font-semibold "
                              numberOfLines={1} style={{flex: 1, width: '90%'}} ellipsizeMode='tail'
                            >{item.actionDescriptorText}</Text>
                            <Text className="text-base text-indigo-500 capitalize" numberOfLines={1}
                                  style={{marginRight: 10}} ellipsizeMode='tail'>{item.actionSubjectText}</Text>
                          </View>
                        </View>
                        <View className="flex flex-row px-4 gap-x-3 pb-4 items-center">
                          <Image source={{uri: `${item.avatarFullpath}`}} className="w-12 h-12"/>
                          <View className='w-[90%]'>
                            <Text className="text-base font-normal text-white" numberOfLines={1} style={{width: '90%'}}
                                  ellipsizeMode='tail'>{item.trackName}</Text>
                            <Text className="text-sm font-normal text-gray-600 mr-10">{item.artistName}</Text>
                          </View>
                        </View>
                        <View
                          className="w-7 h-7 rounded-md border border-indigo-500/30 absolute top-[40%] -left-[11%] flex items-center justify-center ">
                          <InstagramLogo/>
                        </View>
                        <Text
                          className="text-gray-600 text-[10px] font-light absolute uppercase top-[30%] -left-[11%]">{`${mm} ${dd}`}</Text>
                      </View>
                    );
                  })
              }
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
