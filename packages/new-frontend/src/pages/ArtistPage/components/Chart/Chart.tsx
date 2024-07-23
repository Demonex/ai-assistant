import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis
} from 'recharts';
import get from 'lodash.get';
import set from 'lodash.set';
import {DateTime} from 'luxon';
import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import humanNumber from 'human-number';
import type {TooltipProps as CustomTooltipProps} from 'recharts/types/component/Tooltip.js';
import {useWindowSize} from '@uidotdev/usehooks';
import {useArtistChart} from '../../hooks/useArtistChart.js';
import turnPhoneIcon from '/assets/svg/turnPhoneIcon.svg'


type DataType = ({ time: number } & { [k: string]: unknown })[]

type TabsZoomProps = {
  zoom: Zoom
  setZoom: React.Dispatch<React.SetStateAction<Zoom>>
}

enum Zoom {
  '1m' = '1m',
  '3m' = '3m',
  '6m' = '6m',
  'ytd' = 'YTD',
  '1y' = '1y',
  'all' = 'All'
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
const TabsZoom = memo<TabsZoomProps>(({zoom, setZoom}) => {
  const tabsParentRef = useRef<HTMLDivElement>(null);
  const tabMarkerRef = useRef<HTMLDivElement>(null);
  const [activateAnimation, setActivateAnimation] = useState(false);
  const {width, height} = useWindowSize();
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
    <div className="flex w-full justify-end items-center select-none gap-8">
      <span className="text-slate-200 text-[11px] h-8 leading-9">Zoom</span>
      <div
        className="relative flex xl:gap-4 h-8 text-white"
        ref={tabsParentRef}>
        {
          Object.values(Zoom).map((value, index) => (
            <button
              key={index}
              onClick={() => {
                setZoom(value);
              }}
              className={'relative z-20 items-center gap-2 w-auto h-8 text-sm p-2 font-medium cursor-pointer transition-all whitespace-nowrap'}
              type="button">
              {value}
            </button>

          ))
        }
        <div
          className={`absolute left-0 w-0 z-10 h-full duration-300 ease-out ${activateAnimation ? 'duration-300' : 'duration-0'}`}
          ref={tabMarkerRef}>
          <div className="w-full h-full rounded-lg bg-vulcan-900 border-2 border-indigo-500 mt-[2px]"/>
        </div>
      </div>
    </div>
  );
});

const CustomTooltip = memo<CustomTooltipProps<number, string>>(({
                                                                  active,
                                                                  payload
                                                                }) => {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="flex flex-col bg-indigo-500/70 text-white p-2 rounded-md">
      {
        payload.map(({name, value}, index) => (
          <div className="" key={index}>{name}: {value}</div>
        ))
      }
    </div>
  );
});

export const Chart = memo(() => {
  const {data: chartData} = useArtistChart();
  const {width} = useWindowSize();
  const currentDataFiltered = chartData?.chart.iconData.filter((item) => (
    item.secondaryText === 'current'
  ));
  const chartDataGraph: DataType = useMemo(() => {
    const seriesData = get(chartData, 'chart.seriesData', []);
    return seriesData.length ? seriesData.filter(({data}) => data.length).reduce((prev, current, index, array) => {
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
        return [
          ...prev,
          {
            time: Number(time),
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
    return DateTime.fromMillis(get(chartDataGraph?.at(-1), 'time', Date.now())).toMillis();
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

  const fillTicksData = useCallback((ticks: number[], data: DataType) => {
    const minTick = Math.min(...ticks);
    return data.filter((item) => {
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
    return chartData?.chart.seriesData.filter(({data}) => data.length).map(item => item.name) || [];
  }, [chartData]);

  return (
    <div className="relative flex flex-col text-xs mt-6 gap-5 px-4 xl:px-6 bg-indigo-200/5 py-4 rounded-3xl w-full flex-1 h-fit">
      {
        width < 660
        ? <ChartStub/>
          : <>
            <div className="flex gap-4 w-full justify-end text-base text-slate-200 mb-2 ">
              {
                <TabsZoom zoom={zoom} setZoom={setZoom}/>
              }
            </div>
            <ResponsiveContainer
              width="100%"
              aspect={3 / 1}
              height="fit-content"
              maxHeight={500}
              //aspect or height={300}
            >
              <AreaChart data={filledData} margin={{
                top: 0,
                right: 20,
                left: 20,
                bottom: 0
              }}>
                <defs>
                  <linearGradient id="Color0" x1="1" y1="0.5" x2="0" y2="0.5">
                    <stop offset="0%" stopColor="#76b1ff" stopOpacity={0.65}/>
                    <stop offset="100%" stopColor="#7676ff" stopOpacity={0.65}/>
                  </linearGradient>
                  <linearGradient id="Color0Stroke" x1="1" y1="0.5" x2="0" y2="0.5">
                    <stop offset="0%" stopColor="#76b1ff"/>
                    <stop offset="100%" stopColor="#7676ff"/>
                  </linearGradient>
                  <linearGradient id="Color1" x1="1" y1="0.5" x2="0" y2="0.5">
                    <stop offset="5%" stopColor="#fa4fdf" stopOpacity={0.65}/>
                    <stop offset="95%" stopColor="#fa994f" stopOpacity={0.65}/>
                  </linearGradient>
                  <linearGradient id="Color1Stroke" x1="1" y1="0.5" x2="0" y2="0.5">
                    <stop offset="5%" stopColor="#fa4fdf"/>
                    <stop offset="95%" stopColor="#fa994f"/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
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
                  dy={10}
                />
                {
                  keys.map((key, index) => {
                    return (
                      <YAxis
                        yAxisId={key}
                        key={index}
                        dataKey={key}
                        type="number"
                        domain={domainY}
                        stroke="#6b7280"
                        orientation={index === 0 ? 'left' : 'right'}
                        axisLine={false}
                        tickLine={false}
                        label={{
                          value: key,
                          angle: index === 0 ? -90 : 90,
                          position: index === 0 ? 'insideLeft' : 'insideRight',
                          fill: '#e2e8f0',
                          offset: index === 0 ? -10 : -10
                        }}
                        dx={index === 0 ? -10 : 10}
                        tickFormatter={tickYFormatter}
                      />
                    );
                  })
                }
                {
                  keys.map((key, index) => (
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
                  ))
                }
                <Tooltip content={<CustomTooltip/>}/>
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex overflow-x-auto justify-between  md:justify-start">
              {
                currentDataFiltered?.map((item, index) => (
                  <div className="px-4 py-2 xl:px-8 xl:py-4 flex flex-col gap-1.5" key={index}>
                    <h1 className="text-white text-xs lg:text-sm whitespace-nowrap">{item.text}</h1>
                    <p className="text-gray-500 text-xs">{item.secondaryText}</p>
                    <h1
                      className="text-xl md:text-2xl xl:text-4xl text-transparent capitalize bg-gradient-to-r from-indigo-400 to-indigo-500 bg-clip-text font-bold">{item.count}</h1>
                  </div>
                ))
              }
            </div>
          </>
      }
    </div>
  );
});
