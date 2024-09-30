import {useChartTrackData} from "../hooks/useChartTrackData.js";
import {socials} from "../../../data/consts/socials.js";
import {SkeletonPerformance} from "../../ArtistPage/components/Analytics/Performance.js";

const Performance = () => {
  const {chartTrackData, loading} = useChartTrackData() || {};
  const getLogo = socials.filter((item, _) => {
    const getSource = chartTrackData?.chart.source;
    return  item.slug === getSource;
  });
  return (
    <div className="w-full flex flex-col items-center bg-indigo-200/5 rounded-3xl">
      {
        loading
        ? <SkeletonPerformance/>
          :  <>
            <div className=" flex items-center gap-3 w-full justify-center pt-4">
              <div
                className="flex w-6 xl:w-8 h-6 xl:h-8 items-center justify-center rounded-md  p-[0.060rem] text-center aspect-square">
                <div
                  className="bg-indigo-200/5 border border-indigo-500/30 p-[6px] xl:p-[8px] h-full w-full rounded-md flex items-center justify-center ">
                  {
                    getLogo.map((logo, index) => (
                      <img src={logo.logo} alt="" className="w-[15px] h-[15px]" key={index}/>
                    ))
                  }
                </div>
              </div>
              <p
                className="text-sm lg:text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">ДОСТИЖЕНИЯ</p>
            </div>
            {
              chartTrackData?.chart.iconData.map((item, index) => {
                return (
                  <div className="w-full overflow-y-scroll flex flex-col gap-3 px-3 xl:px-5 py-2 xl:py-3" key={index}>
                    <div
                      className="text-white w-full"
                    >
                      <div className="bg-transparent p-2 rounded-xl h-full flex justify-between ">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-normal text-white text-sm lg:text-[1.1rem] xl:text-md">{item.text}</span>
                          <p className="text-gray-400 font-light text-xs xl:text-sm capitalize">{item.secondaryText}</p>
                        </div>
                        <span
                          className=" text-md xl:text-xl text-transparent capitalize bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text font-bold">{item.count}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </>
      }

    </div>
  )
}
export default Performance
