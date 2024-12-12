import { useArtistTrack } from "../../hooks/useArtistTrack";
import { useArtist } from "../../../../hooks/Artist/useArtist";
import { memo, useCallback, useRef, useState } from "react";
import { useLazyFetch } from "../../../../hooks/useFetch";
import { TrackDataType } from "../../types";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

const WithButtons = memo<{
  data: TrackDataType["trackData"]["listData"][number]
}>(({
  data
}) => {
  const {source, artistUniqueId } = useArtist();
  const [activeButton, setActiveButton] = useState(0);
  const buttonRef = useRef(null)
  const [{ data: dataLoaded, loading, error }, fetchData] = useLazyFetch({
    url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/analytics/top_list_track_data`
  });

  const handleButtonClick = useCallback((index: number, buttonId: string) => {
    setActiveButton(index);
    const requestButtonIdIndex = buttonRef.current;
    if (!data.items[requestButtonIdIndex]?.length) {
      void fetchData({
        url: `https://backend.musicstats.ru/api/rest/proxy/api/v1/analytics/top_list_track_data?idUnique=${artistUniqueId}&source=${source}&buttonId=${buttonId}`
      }).then(({ data: { topListTrackData } }) => {
        data.items[requestButtonIdIndex] = topListTrackData?.items;
      });
    }

  }, []);
  return (
    <>
      <View className="w-full flex flex-row justify-start items-center gap-2 mb-5 px-2">
        {
          data.buttons.map(({ title, buttonId }, index) => (
              <TouchableOpacity key={index}
                      className={` px-4 py-2 rounded-[8px] border
                       ${index === activeButton ? "bg-indigo-500 border-transparent" : "bg-transparent border-indigo-500"}
                       `}
                      onPress={() => handleButtonClick(index, buttonId)}
                ref={buttonRef}
              >
                <Text className='text-white text-xs'>{title}</Text>
              </TouchableOpacity>
            )
          )
        }
      </View>
      <View className="w-full overflow-y-scroll flex flex-col gap-3 mb-5">
        {
          data.items[activeButton]?.map((track, index) => {
              if (index > 9) {
                return null;
              }
              return (
                <View
                  className="rounded-xl w-full"
                  key={index}>
                  <View className="bg-transparent p-2 rounded-xl flex flex-row justify-between items-center">
                    <View className="flex flex-row gap-3 items-start">
                      <Image source={{uri: track.imageUrl}} alt="" className="w-10 h-10" />
                      <View className="flex flex-col gap-1.5 max-w-[75%]">
                        <Text
                          className="font-normal text-gray-300 text-sm flex-1" numberOfLines={1}>{track.primaryText}</Text>
                        <Text
                          className="text-gray-400 font-light text-[10px] xl:text-[12px] capitalize">{track.secondaryText}</Text>
                      </View>
                    </View>
                    <Text
                      className="text-sm  text-white capitalize  font-bold">{track.primaryValue}</Text>
                  </View>
                </View>
              );
            }
          )
        }
      </View>
    </>
  );
});
const TopTracks = () => {
  const { data: trackData, loading: apiTrackDataLoading } = useArtistTrack();
  /* const getLogo = socials.filter((item, _) => {
     const getSource = trackData?.sourceId;
     return item.slug === getSource;
   });*/

  return (
    <View
      className="w-full flex flex-col gap-4 mt-4">
      {
        trackData?.trackData.listData.map((item, index) => {
          if (!("buttons" in item && item.items.length || (item as any).items?.length)) {
            return null;
          }
          return (
            <View
              className="bg-indigo-200/5 rounded-3xl my-3 h-fit py-4 px-3  w-full"
              key={index}>
              <View className="flex items-center gap-3 mb-5 justify-center">
                  <View
                    className="bg-indigo-200/5 border border-indigo-500/30 p-[6px] rounded-md flex items-center justify-center ">
                    {/*{
                      getLogo.map((logo, index) => (
                        <img src={logo.logo} alt="" className="w-[15px] h-[15px]" key={index} />
                      ))
                    }*/}
                  </View>
                <Text
                  className="text-sm  text-indigo-500 uppercase ">{item.headerText}</Text>
              </View>
              {
                apiTrackDataLoading
                ? <ActivityIndicator/>
                  : <>{
                    "buttons" in item
                      ? (<WithButtons data={item} />)
                      : (
                        <View className="w-full overflow-y-scroll flex flex-col gap-3 mb-5">
                          {
                            (item as any).items?.map((track, index) => {
                              return (
                                <View
                                  className="rounded-xl w-full"
                                  key={index}>
                                  <View className="bg-transparent p-2 rounded-xl flex flex-row justify-between items-center">
                                    <View className="flex flex-row gap-3 items-start">
                                      <Image source={{uri: track.imageUrl}} alt="" className="w-10 h-10" />
                                      <View className="flex flex-col gap-1.5 max-w-[9.125rem]">
                                        <Text
                                          className="font-normal text-gray-300 text-sm xl:text-md">{track.primaryText}</Text>
                                        <Text
                                          className="text-gray-400 font-light text-[10px] xl:text-[12px] capitalize">{track.secondaryText}</Text>
                                      </View>
                                    </View>
                                    <Text
                                      className="text-sm  text-white capitalize  font-bold">{track.primaryValue}</Text>
                                  </View>
                                </View>
                              );
                            })
                          }
                        </View>
                      )
                  }</>
              }
            </View>
          );
        })

      }
    </View>
  );
};
export default TopTracks;