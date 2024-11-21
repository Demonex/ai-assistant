import {memo} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useArtistChart} from '../../hooks/useArtistChart.js';
import {socials} from "../../../../data/consts/socials.js";
import InfoIcon from "../../../../assets/InfoIcon.js";

export const SkeletonPerformance = () => {
  return (
    <SkeletonTheme baseColor="#C7D2FE0D"
                   highlightColor="#C7D2FE12">
      <div className='p-4 w-full mb-5'>
        <div className=" flex items-center gap-3 w-full justify-center pt-4">
          <Skeleton width={32} height={32}/>
          <p
            className="text-sm lg:text-md text-transparent capitalize bg-gradient-to-r from-indigo-300 to-indigo-400 bg-clip-text">{
            <Skeleton width={100}/>}</p>
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
    const getSource = chartData?.chart?.source;
    return item.slug === getSource;
  });
  const filteredData = chartData?.chart?.iconData?.filter((item) => (item.secondaryText === 'total'));
  return (
    <div className=" flex-col items-center lg:bg-popup_gray/50 rounded-[20px] lg:px-7 lg:py-8 gap-2.5 w-full lg:max-w-[20.3rem]">
      {
        apiChartDataLoading === true
          ? <SkeletonPerformance/>
          : <>
            <div className=" flex items-center w-full justify-between pb-4 border-b border-dark_grey mb-4">
              <p
                className="text-btnText capitalize text-light_grey">статистика</p>
              <InfoIcon className='fill-light_grey hover:fill-medium_grey'/>
            </div>
            {
              filteredData?.map((item, index) => {
                return (
                  <div className="w-full overflow-y-scroll flex flex-col gap-3 " key={index}>
                    <div
                      className="text-white w-full"
                    >
                      <div className="bg-transparent py-2 rounded-xl h-full flex justify-between items-center gap-10 ">
                        <span className="text-medium_grey text-caption_r_desk">{item.text}</span>
                        <span
                          className="text-t1Semi_mob md:text-t1Semi_deck">{item.count}</span>
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
