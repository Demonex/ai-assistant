import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis, Label
} from 'recharts';
import get from 'lodash.get';
import set from 'lodash.set';
import {DateTime} from 'luxon';
import React, {forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import humanNumber from 'human-number';
import type {TooltipProps as CustomTooltipProps} from 'recharts/types/component/Tooltip.js';
import {useWindowSize} from '@uidotdev/usehooks';
import {useArtistChart} from '../../hooks/useArtistChart.js';
import turnPhoneIcon from '/assets/svg/turnPhoneIcon.svg'
import {useArtist} from "../../hooks/useArtist.js";
import {overviewSources} from "../../../../data/consts/favoriteSources.js";
import {useSizes} from "../../../../hooks/useSizes.js";
import settings from "/assets/svg/settings_icon.svg";
import {ShowOnMobileOnly} from "../../../../components/Sizes/ShowOnMobileOnly/ShowOnMobileOnly.js";


type DataType = ({ time: number } & { [k: string]: unknown })[]

type TabsZoomProps = {
  zoom: Zoom
  setZoom: React.Dispatch<React.SetStateAction<Zoom>>
  currentDataFiltered: any
  refTabs: { current: any[] }
}

enum Zoom {
  '1m' = '1 мес',
  '3m' = '3 мес',
  '6m' = '6 мес',
  'ytd' = '2024',
  '1y' = '1 год',
  'all' = 'Все'
}

const OFFSET_PERCENT = 10;

const ChartStub = () => {
  return (
    <div className='w-full min-h-[10rem] flex flex-col justify-center items-center gap-3'>
      <p className='text-white'>Turn the phone over to see the Tracks Chart</p>
      <img src={turnPhoneIcon} alt='' className='w-6 h-6'/>
    </div>
  )
}
const TabsZoom = forwardRef<HTMLImageElement, TabsZoomProps>(({
                                                                zoom,
                                                                setZoom,
                                                                currentDataFiltered,
                                                                refTabs
                                                              }, refSettings) => {
  const {source} = useArtist();
  const tabsParentRef = useRef<HTMLDivElement>(null);
  const tabMarkerRef = useRef<HTMLDivElement>(null);
  const [activateAnimation, setActivateAnimation] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const {width, height} = useWindowSize();
  const getLogo = overviewSources.find(item => item.slug === source);
  const {elementRange} = useSizes();
  const logoChart = elementRange(6, 11.25);
  const [openZoom, setOpenZoom] = useState(false);

  const handleClickOnTab = (value, index) => {
    if (tabMarkerRef) {
      setZoom(value);
      setSelectedTab(index);
      setOpenZoom(!openZoom);
    }
    return
  }
  useEffect(() => {
    const selectedIndex = Object.values(Zoom).indexOf(zoom);
    if (!tabsParentRef.current
      || !tabMarkerRef.current
      || selectedIndex == -1) {
      return;
    }
    const buttons = Array.from(tabsParentRef.current.childNodes as NodeListOf<HTMLDivElement>);
    const buttonSelected = get(buttons, selectedIndex);
    if (!buttonSelected) {
      return;
    }
    tabMarkerRef.current.style.width = `${buttonSelected.offsetWidth + 1}px`;
    tabMarkerRef.current.style.height = `${buttonSelected.offsetHeight}px`;
    tabMarkerRef.current.style.left = `${buttonSelected.offsetLeft}px`;
    if (!activateAnimation) {
      setActivateAnimation(true);
    }
    setActivateAnimation(true);
  }, [zoom, tabsParentRef.current, tabMarkerRef.current, width, height, activateAnimation]);
  return (
    <>
      <div className="flex gap-4 flex-col md:flex-row">
        <div style={{
          width: `${logoChart}rem`,
        }}
             className=' mr-6'>
          {getLogo?.logo}
        </div>
        <div className='flex gap-10'>
          {
            currentDataFiltered?.map((item, index) => (
              <div className="flex flex-col " key={index}>
                <h1
                  className={`pl-1 text-caption_s_desk whitespace-nowrap uppercase text-medium_grey border-l-2 ${index === 0 ? 'border-magenta' : 'border-yellow'}`}>{item.text}</h1>
                <h1
                  className="text-t1Semi_deck text-light_grey">{item.count}</h1>
              </div>
            ))
          }
        </div>

      </div>
      {
        width > 1680 || width < 1023
          ?
          <>
            <div className="flex w-full lg:justify-end items-center select-none gap-8">
              <div
                className="relative flex gap-2 h-8 overflow-x-auto"
                ref={tabsParentRef}>
                {
                  Object.values(Zoom).map((value, index) => (
                    <button
                      ref={ref => {
                        if (refTabs.current.includes(ref)) {
                          return;
                        }
                        refTabs.current.push(ref)
                      }}
                      key={index}
                      onClick={(e) => {
                        handleClickOnTab(value, index)
                      }}
                      className={`relative z-20 items-center gap-2 w-auto h-8  px-6 py-2 text-caption_m_desk cursor-pointer transition-all whitespace-nowrap border border-solid border-secondary_dark_gray rounded-[30px] hover:border-yellow  ${index === selectedTab ? 'bg-yellow text-black  ' : 'text-medium_grey hover:text-white'}`}
                      type="button">
                      {value}
                    </button>
                  ))
                }
              </div>
            </div>
            <ShowOnMobileOnly>
              <p className='text-caption_s_desk text-medium_grey'>Нажмите на график, чтобы увидеть значения</p>
            </ShowOnMobileOnly>
          </>
          : (
            <div className='w-full flex justify-end relative'>
              <img className='fill-white w-7 h-7 cursor-pointer' src={settings} ref={refSettings}
                   onClick={() => setOpenZoom(!openZoom)}/>
              {
                openZoom && (
                  <div className=" rounded-xl w-[10rem] absolute bg-popup_gray p-4 z-20 top-8">
                    <div
                      className="relative flex gap-2 flex-col "
                      ref={tabsParentRef}>
                      {
                        Object.values(Zoom).map((value, index) => (
                          <button
                            ref={ref => {
                              if (refTabs.current.includes(ref)) {
                                return;
                              }
                              refTabs.current.push(ref)
                            }}
                            key={index}
                            onClick={() => {
                              setZoom(value);
                              setSelectedTab(index)
                              setOpenZoom(!openZoom)
                            }}
                            className={`relative z-20 items-center gap-2 w-auto h-8 text-sm px-6 py-2 text-caption_m_desk cursor-pointer transition-all whitespace-nowrap border border-solid border-secondary_dark_gray rounded-[30px] ${index === selectedTab ? 'bg-yellow text-[black]' : ''}`}
                            type="button">
                            {value}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
          )
      }

    </>

  );
});

const CustomTooltip = memo<CustomTooltipProps<number, string>>(({
                                                                  active,
                                                                  payload
                                                                }) => {
  if (!active || !payload?.length) {
    return null;
  }
  const date = new Date(payload[0].payload.time);
  const formattedDate = DateTime.fromJSDate(date).setLocale('ru').toFormat(`ccc d/MM/yyyy`);
  return (
    <div className="flex flex-col bg-popup_gray text-white p-2 rounded-md gap-2">
      <p
        className='text-caption_s_desk text-medium_grey pb-1 border-b border-medium_grey capitalize'>{formattedDate}</p>
      {
        payload.map(({name, value}, index) => (
          <div className="flex gap-1" key={index}>
            <p
              className={`text-caption_s_desk uppercase text-medium_grey border-l-2 pl-1 ${index === 0 ? "border-magenta" : "border-yellow"}`}>{name}: </p>
            <span className='text-xs text-light_grey'>{value}</span>
          </div>
        ))
      }
    </div>
  );
});

export const Chart = forwardRef<any, any>(({setPopupChart, popupChart}, ref) => {
  const {data: chartData} = useArtistChart();
  const refSettings = useRef<HTMLImageElement>(null);
  const refTabs = useRef<any[]>([]);
  const {isMobile, width} = useSizes();
  const areachartWidth = width - 32

  const currentDataFiltered = chartData?.chart?.iconData?.filter((item, index) => (
    (item.secondaryText === 'current' || item.secondaryText === 'total') && index < 2
  ));
  const chartDataGraph: DataType = useMemo(() => {
    const seriesData = get(chartData, 'chart.seriesData', []);
    return seriesData?.length ? seriesData?.filter(({data}) => data.length).reduce((prev, current, index, array) => {
      current.data.forEach(item => {
        const time = String(get(item, 0, ''));
        const value = get(item, 1);
        const prevValue = get(prev, time, {});
        if (!time) {
          return;
        }
        set(prev, String(time), {
          ...prevValue,
          [current.name]: value
        });
      });
      return index === array.length - 1 ? Object.entries<any>(prev).reduce<any>((prev, [time, object = {}]) => {
        const emptyData = Object.fromEntries(seriesData?.filter(({data}) => data.length)
          .map(({name}) => name)
          .filter(name => !(Object.keys(object).includes(name)))
          .map((name) => [name, 0]) || []
        )
        return [
          ...prev,
          {
            time: Number(time),
            ...emptyData,
            ...object
          }
        ];
      }, []) : prev;
    }, {} as any) : [];
  }, [chartData]);
  const [zoom, setZoom] = useState<Zoom>(Zoom['1m']);

  const startDate = useMemo(() => {
    switch (zoom) {
      case Zoom['1y']: {
        return DateTime.now().minus({year: 1}).toMillis();
      }
      case Zoom['6m']: {
        return DateTime.now().minus({month: 6}).toMillis();
      }
      case Zoom['3m']: {
        return DateTime.now().minus({month: 3}).toMillis();
      }
      case Zoom['1m']: {
        return DateTime.now().minus({month: 1}).toMillis();
      }
      case Zoom['ytd']: {
        return DateTime.now().startOf('year').toMillis();
      }
      case Zoom.all:
      default: {
        return DateTime.fromMillis(get(chartDataGraph?.at(0), 'time', Date.now())).toMillis();
      }
    }
  }, [zoom, chartDataGraph]);

  const endDate = useMemo(() => {
    return DateTime.fromMillis(get(chartDataGraph?.at?.(-1), 'time', Date.now())).toMillis();
  }, [chartDataGraph]);

  const dateFormatter = useCallback((timestamp: any) => {
    const date = DateTime.fromMillis(timestamp);
    return `${date.toFormat('MMM')} '${date.toFormat('yy')}`;
  }, []);

  const tickYFormatter = useCallback((value: any) => {
    return value >= 1000 ? humanNumber(value, n => n.toFixed(1)) : value;
  }, []);

  const getTicks = useCallback((_startDate: number, _endDate: number, ticks: number) => {
    const startDate = DateTime.fromMillis(_startDate);
    const endDate = DateTime.fromMillis(_endDate);
    const diffDays = endDate.diff(startDate, ['days']).days;
    const velocity = Math.round(diffDays / (ticks - 1));
    return [
      startDate.toMillis(),
      ...Array.from({length: ticks - 1}).map((_, i) => startDate.plus({
        days: (i + 1) * velocity
      }).toMillis()),
      endDate.toMillis()
    ];
  }, []);

  const fillTicksData = useCallback((ticks: number[], data: DataType = []) => {
    const minTick = Math.min(...ticks);
    return data.filter?.((item) => {
      return item.time >= minTick;
    });
  }, []);

  const domainX = useCallback(([dataMin, dataMax]): [number, number] => {
    return [dataMin, endDate];
  }, []);

  const domainY = useCallback(([dataMin, dataMax]): [number, number] => {
    return [
      Math.floor(dataMin - (dataMin / 100 * OFFSET_PERCENT)),
      Math.ceil(dataMax + (dataMax / 100 * OFFSET_PERCENT))
    ];
  }, []);

  const ticks = useMemo(() => {
    return getTicks(startDate, endDate, 10);
  }, [startDate, endDate]);

  const filledData = useMemo(() => {
    return fillTicksData(ticks, chartDataGraph);
  }, [ticks, chartDataGraph]);

  const keys = useMemo(() => {
    return chartData?.chart?.seriesData?.filter(({data}) => data.length).map(item => item.name) || [];
  }, [chartData]);

  return (
    <div ref={ref}
         onClick={(e) => {
           if (
             e.target === refSettings.current
             || refTabs.current?.includes(e.target)
           ) {
             return
           }
           setPopupChart?.(true)
         }}
         className={`relative flex  h-fit xl:min-h-full flex-col text-xs gap-4 md:gap-5 py-4 lg:px-8 lg:py-8 rounded-[20px] w-full  ${popupChart ? 'lg:bg-popup_gray' : 'lg:bg-popup_gray/50 '}`}>
      <>
        <div className="flex flex-col lg:flex-row gap-4">
          {
            <TabsZoom
              zoom={zoom}
              setZoom={setZoom}
              currentDataFiltered={currentDataFiltered}
              ref={refSettings}
              refTabs={refTabs}
            />
          }
        </div>
        <ResponsiveContainer
          width="100%"
          aspect={3 / 1}
          height="fit-content"
          maxHeight={500}
          //aspect or height={300}

        >
          <AreaChart data={filledData}

                     margin={{
                       top: 0,
                       right: !isMobile ? 20 : 0,
                       left: !isMobile ? 20 : 0,
                       bottom: 0
                     }}>
            <defs>
              <linearGradient id="Color0" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E4FF29" stopOpacity={0.1}/>
                <stop offset="100%" stopColor="#E4FF29" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="Color0Stroke" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="0%" stopColor="#E4FF29"/>
                <stop offset="100%" stopColor="#E4FF29"/>
              </linearGradient>
              <linearGradient id="Color1" x1="0." y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A51BC8" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#A51BC8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="Color1Stroke" x1="1" y1="0.5" x2="0" y2="0.5">
                <stop offset="5%" stopColor="#A51BC8"/>
                <stop offset="95%" stopColor="#A51BC8"/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="#7B7B7B"
              tickFormatter={dateFormatter}
              scale="time"
              type="number"
              domain={domainX}
              ticks={ticks}
              axisLine={false}
              tickLine={false}
              interval="equidistantPreserveStart"
              padding="no-gap"
              textAnchor="middle"
              tick={!isMobile}
              dy={10}
            />
            {
              keys.map((key, index) => {
                return (
                  <React.Fragment key={index}>
                    <YAxis
                      yAxisId={key}
                      key={index}
                      dataKey={key}
                      type="number"
                      domain={domainY}
                      stroke="#7B7B7B"
                      orientation={index === 0 ? 'left' : 'right'}
                      axisLine={false}
                      tickLine={false}
                      tick={!isMobile}
                      label={
                        /* <Label className='text-caption_r_desk uppercase absolute'>{key}</Label>*/
                        !isMobile && (
                          {
                            value: key,
                            angle: index === 0 ? -90 : 90,
                            position: index === 0 ? 'insideLeft' : 'insideRight',
                            fill: '#7B7B7B',
                            offset: index === 0 ? -10 : -10,
                            style: {
                              fontSize: 16,
                              lineHeight: 24,
                              fontWeight: 400,
                            }
                          }
                        )
                      }
                      dx={index === 0 ? -10 : 10}
                      tickFormatter={tickYFormatter}
                    />
                    <Area
                      key={index}
                      type="monotone"
                      dataKey={key}
                      stroke={`url(#Color${index}Stroke)`}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth={2}
                      strokeOpacity={1}
                      fillOpacity={1}
                      fill={`url(#Color${index})`}
                      dot={false}
                      yAxisId={key}
                    />
                  </React.Fragment>
                );
              })
            }
            <Tooltip content={<CustomTooltip/>}/>
          </AreaChart>
        </ResponsiveContainer>
      </>
    </div>

  );
});
