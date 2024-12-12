import {useArtistChart} from '../../../hooks/useArtistChart';
import {memo, useCallback, useEffect, useRef, useState} from 'react';
import get from 'lodash.get';
import set from 'lodash.set';
import {Text, TouchableOpacity, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {DateTime} from 'luxon';
import {LinearGradient, Stop} from 'react-native-svg';
import humanNumber from 'human-number';
import {useWindowDimensions} from 'react-native';

enum Zoom {
  '1m' = '1m',
  '3m' = '3m',
  '6m' = '6m',
  'ytd' = 'YTD',
  '1y' = '1y',
  'all' = 'All'
}

type TabsZoomProps = {
  zoom: Zoom
  setZoom: React.Dispatch<React.SetStateAction<Zoom>>
}

const TabsZoom = memo<TabsZoomProps>(({zoom, setZoom}) => {
  const tabsParentRef = useRef<View>(null);
  const tabMarkerRef = useRef<View>(null);
  const [activateAnimation, setActivateAnimation] = useState(false);
  const selectedIndex = Object.values(Zoom).indexOf(zoom);

  return (
    <View className="flex w-full flex-row justify-end items-center select-none gap-8">
      <Text className="text-slate-200 text-[11px] h-8 leading-9">Zoom</Text>
      <View
        className="relative flex flex-row xl:gap-4 h-10 items-center"
        ref={tabsParentRef}
      >
        {
          Object.values(Zoom).map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setZoom(value);
              }}
              className={'relative z-20 items-center gap-2 w-auto h-10  cursor-pointer transition-all'}>
              <Text className='text-sm p-2 font-medium  whitespace-nowrap text-white'>{value}</Text>
              {
                index === selectedIndex
                  ? <View className="w-full h-[2px] bg-indigo-500 "/>
                  : null
              }
            </TouchableOpacity>

          ))
        }
        <View
          className={`absolute left-0 w-0 z-10 h-full duration-300 ease-out ${activateAnimation ? 'duration-300' : 'duration-0'}`}
          ref={tabMarkerRef}
        >
        </View>
      </View>
    </View>
  );
});
type DataType = ({ time: number } & { [k: string]: unknown })[]

const LineFirstStartColor = '#7676ff';
const LineFirstEndColor = '#76b1ff';
const LineSecondStartColor = '#fa994f';
const LineSecondEndColor = '#fa4fdf';
const ChartComponent = () => {
  let linerGradientCounter = 0;
  const {data: chartData} = useArtistChart();
  const chartDataGraph: DataType = (() => {
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
  })();
  const keys = (() => {
    return chartData?.chart.seriesData.filter(({data}) => data.length).map(item => item.name) || [];
  })();
  // console.log('keys', keys)
  const {maxValue, linesData} = (() => {
    return keys.reduce((prev, key, index) => {
      set(prev.linesData, index, chartDataGraph.map(item => {
        const time = DateTime.fromMillis(item.time);
        const keyValue = Number(item[key]);
        if (prev.maxValue < keyValue) {
          prev.maxValue = keyValue;
        }
        return {
          value: keyValue,
          time: item.time,
          date: `${time.day} ${time.monthShort} ${time.year}`
        };
      }));
      return prev;
    }, {
      maxValue: 0,
      linesData: []
    });
  })();

  const arraysOfValue = linesData.map((item) => item.map(item2 => item2['value']));
  const maxValues = arraysOfValue.map(item => Math.max.apply(null, item));

  const [zoom, setZoom] = useState<Zoom>(Zoom['1m']);

  const startDate = (() => {
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
        return DateTime.fromMillis(get(chartDataGraph.at(0), 'time', Date.now())).toMillis();
      }
    }
  })();
  const endDate = (() => {
    return DateTime.fromMillis(get(chartDataGraph.at(-1), 'time', Date.now())).toMillis();
  })();
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
  const ticks = (() => {
    return getTicks(startDate, endDate, 10);
  })();

  const tickYFormatter = useCallback((value: any) => {
    return value >= 1000 ? humanNumber(value, n => n.toFixed(1)) : value;
  }, []);
  const dateFormatter = useCallback((timestamp: any) => {
    const date = DateTime.fromMillis(timestamp);
    return `${date.toFormat('MMM')} '${date.toFormat('yy')}`;
  }, []);
  const formattedXTicks = ticks.map(item => dateFormatter(item)).reduce((acc, curr) => {
    if (!acc.includes(curr))
      acc.push(curr)
    return acc
  }, [])
  console.log('linesData', linesData[0]);
  return (
    <View className="mt-6">
      <TabsZoom zoom={zoom} setZoom={setZoom}/>
      <LineChart
        width={290}
        areaChart
        curved
        data={linesData[1]}
        maxValue={maxValues[1]}
        noOfSections={7}
        spacing={44}
        initialSpacing={4}
        endSpacing={4}
        hideDataPoints
        hideRules
        lineGradient
        lineGradientId="lineGradient"
        lineGradientComponent={() => {
          linerGradientCounter++;
          return (
            <LinearGradient
              id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={
                linerGradientCounter % 2 == 0
                  ? LineSecondStartColor
                  : LineFirstStartColor
              }/>
              <Stop offset="1" stopColor={
                linerGradientCounter % 2 == 0
                  ? LineSecondEndColor
                  : LineFirstEndColor
              }/>
            </LinearGradient>
          );
        }}
        gradientDirection="horizontal"
        startFillColor={LineFirstStartColor}
        endFillColor={LineFirstEndColor}
        startOpacity={0.65}
        endOpacity={0.65}
        yAxisColor="transparent"
        yAxisIndicesWidth={10}
        yAxisTextStyle={{
          color: '#6b7280',
          fontSize: 10
        }}
        secondaryData={linesData[0]}
        secondaryLineConfig={{
          startFillColor: LineSecondStartColor,
          endFillColor: LineSecondEndColor
        }}
        secondaryYAxis={{
          maxValue: maxValues[0],
          // noOfSections: 4,
          showFractionalValues: true,
          roundToDigits: 3,
          formatYLabel: tickYFormatter
        }}
        xAxisLabelTextStyle={{width: 80, marginLeft: -36, color: '#6b7280', fontSize: 10}}
        xAxisIndicesHeight={10}
        xAxisIndicesWidth={2}
        xAxisColor="transparent"
        xAxisLabelTexts={formattedXTicks}
        isAnimated={true}
        animateOnDataChange={true}
        formatYLabel={tickYFormatter}

      />
    </View>
  );
};
export default ChartComponent;
