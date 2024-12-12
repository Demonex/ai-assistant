import { useArtistChart } from "../../hooks/useArtistChart";
import { ActivityIndicator, Text, View } from "react-native";

const ChartPerformance = () => {
  const {data: chartData, loading: apiChartDataLoading} = useArtistChart();
  const filteredData = chartData?.chart.iconData.filter((item) => (item.secondaryText === 'total'));
 /* const getLogo = socials.filter((item, _) => {
    const getSource = chartData?.chart.source;
    return  item.slug === getSource;
  });*/

  return (
    <View className="w-full flex flex-col bg-indigo-200/5 rounded-3xl mt-6">
      <View className="flex items-center gap-3 w-full justify-center pt-4 ">
          <View
           /* className="bg-indigo-200/5 border border-indigo-500/30 p-[6px] xl:p-[8px] h-full w-full rounded-md flex items-center justify-center "*/
          >
           {/* {
              getLogo.map((logo, index) => (
                <img src={logo.logo} alt="" className="w-[15px] h-[15px]" key={index} />
              ))
            }*/}
          </View>
        <Text
          className="text-sm text-indigo-500 uppercase bg-clip-text">PERFORMANCE</Text>
      </View>
      {
        apiChartDataLoading
        ? <ActivityIndicator style={{paddingBottom: 20}}/>
          : filteredData?.map((item, index) => {
            return (
              <View className="flex flex-col px-3 py-3"  key={index}>
                <View className="w-full">
                  <View className="w-full p-2 rounded-xl flex flex-row justify-between ">
                    <View className="flex flex-col gap-1.5">
                      <Text className="font-normal text-white text-[18px]">{item.text}</Text>
                      <Text className="text-gray-400 font-light text-xs xl:text-sm capitalize">{item.secondaryText}</Text>
                    </View>
                    <Text
                      className=" text-xl text-indigo-500 capitalize font-bold">{item.count}</Text>
                  </View>
                </View>
              </View>
            );
          })

      }
    </View>
  )
}
export default ChartPerformance