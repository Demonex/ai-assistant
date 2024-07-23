import {memo} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useArtistChart} from '../../hooks/useArtistChart.js';
import {socials} from "../../../../data/consts/socials.js";

export const SkeletonPerformance = () => {
  return (
    <SkeletonTheme baseColor="#C7D2FE0D"
                   highlightColor="#C7D2FE12">
      <div className='p-4 w-full mb-5'>
        <div className=" flex items-center gap-3 w-full justify-center pt-4">
          <Skeleton width={32} height={32}/>
          <p
            className="text-sm lg:text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">{<Skeleton width={100}/>}</p>
        </div>
        {
          Array.from({length: 4}).map((item, index) => (
            <div
              className=" w-full mb-5"
              key={index}>
              <div className="p-2 rounded-xl h-full flex justify-between ">
                <div className="flex flex-col gap-1.5">
                  <span>{<Skeleton width={100}/>}</span>
                  <p>{<Skeleton width={70}/>}</p>
                </div>
                <span>{<Skeleton width={50} height={32}/>}</span>
              </div>
            </div>
          ))
        }

      </div>
    </SkeletonTheme>

  );
};

export const Performance = memo(() => {
  const {data: chartData, loading: apiChartDataLoading} = useArtistChart();
  const getLogo = socials.filter((item, _) => {
    const getSource = chartData?.chart.source;
    return  item.slug === getSource;
  });
  const filteredData = chartData?.chart.iconData.filter((item) => (item.secondaryText === 'total'));
  return (
    <div className="w-full flex flex-col items-center bg-indigo-200/5 rounded-3xl">
      {
        apiChartDataLoading === true
          ? <SkeletonPerformance/>
          : <>
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
                className="text-sm lg:text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">PERFORMANCE</p>
            </div>
            {
              filteredData?.map((item, index) => {
                return (
                  <div className="w-full overflow-y-scroll flex flex-col gap-3 px-3 xl:px-5 py-2 xl:py-3"  key={index}>
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
  );
});
