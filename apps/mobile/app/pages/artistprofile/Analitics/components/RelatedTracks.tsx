import {useArtistTrack} from "../../hooks/useArtistTrack";
import {memo} from "react";
import {ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";

export const RelatedTracks = memo(() => {
  const {data: trackData, loading: apiTrackDataLoading} = useArtistTrack();
  /* const getLogo = socials.filter((item, _) => {
     const getSource = trackData?.sourceId;
     return  item.slug === getSource;
   });*/
  return (
    <View className="bg-indigo-200/5 rounded-3xl py-4 pb-10 w-full flex-1 h-full px-4 mb-24">

      {
        apiTrackDataLoading === true
          ? <ActivityIndicator/>
          : trackData?.trackData.relatedTracks.map((relatedTracksItem, index) =>
            (
              <View key={index}>
                <View className="flex items-center gap-3 justify-center mb-4">
                  <View
                    className="bg-indigo-200/5 border border-indigo-500/30 p-[6px] rounded-md flex items-center justify-center ">
                    {/* {
                        getLogo.map((logo,index) => (
                          <img src={logo.logo} alt="" className="w-[15px] h-[15px]" key={index}/>
                        ))
                      }*/}
                  </View>
                  <Text
                    className="text-sm  text-indigo-500 uppercase bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">{relatedTracksItem.headerText}</Text>
                </View>


                <View className="w-full h-full gap-4">
                  {
                    relatedTracksItem.relatedTracks.map((track, index) => (
                      <TouchableOpacity key={index} className="w-full flex" activeOpacity={1}>
                        <View className="bg-gray-900/50 rounded-xl flex flex-row">
                          <View
                            className="w-[100px] h-[100px] flex items-center justify-center rounded-xl box-border overflow-hidden">
                            <ImageBackground className=" h-full w-full rounded-xl"
                                             source={{uri: `${track.imageUrl}`}}
                                             resizeMode="cover"/>
                          </View>
                          <View className="p-2 max-w-[75%]">
                            <Text className=" text-sm font-bold leading-6 text-white truncate"
                                  numberOfLines={1}> {track.trackName}</Text>
                            <Text className="mt-2 text-sm text-gray-400 line-clamp-1">{track.artistName}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </View>
            )
          )
      }
    </View>
  );
});

export default {
  RelatedTracks
}