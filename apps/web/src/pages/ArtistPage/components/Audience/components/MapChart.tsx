import {
	color,
	useTheme,
	percent,
	ease,
	Circle,
	create,
} from "@amcharts/amcharts4/core.js";
import {
	MapChart,
	projections,
	MapPolygonSeries,
	MapImageSeries,
} from "@amcharts/amcharts4/maps.js";
import type { MapPolygon } from "@amcharts/amcharts4/maps.js";
import geoDataWorldLow from "@amcharts/amcharts4-geodata/worldLow.js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated.js";
import React, {
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import get from "lodash.get";
import set from "lodash.set";
import sample from "lodash.sample";
import { useArtistAudienceMap } from "../../../hooks/useArtistAudienceMap.js";
import { findClosest } from "../../../../../utils/findClosest.js";
import "./styles.css";
import { useSizes } from "../../../../../hooks/useSizes.js";
import { CountriesTable } from "./CountriesTable.js";
import LockIcon from "../../../../../assets/LockIcon.js";
import SecondaryButton from "../../../../../components/SecondaryButton.js";
import { useSubscriptions } from "../../../../../hooks/useSubscriptions.js";
import { useAccount } from "../../../../../components/Header/hooks/useAccount.js";
import { useArtistProfile } from "../../../hooks/useArtistProfile.js";
import { useManageTable } from "../hooks/useManageTable.js";

enum MAP_TYPE {
	map = "Map",
	globe = "Globe",
}

const colors = {
	background: color("#ffffff"),
	country: color("#484848"),
	countryStroke: color("#000000"),
	countryHover: color("#272727"),
	countryActive: color("#0f0f0f"),
	tooltipBackground: color("#0f0f0f"),
	tooltipStroke: color("#070707"),
};

export default memo(({ data }: { data: any }) => {
	const { mapTabSelected, mapButtonSelected } = useArtistAudienceMap();
	const { isMobile, isTablet, isLaptop } = useSizes();
	const { mapType, setMapType } = useManageTable();
	const mapRef = useRef<HTMLDivElement>(null);
	const mapChartRef = useRef<MapChart>(null);
	const polygonSeriesRef = useRef<MapPolygonSeries>(null);
	const bubbleSeriesRef = useRef<MapImageSeries>(null);
	const currentPolygonRef = useRef<MapPolygon>(undefined);
	const { elementRange } = useSizes();
	const mapHeight = elementRange(320, 480);
	const containerHeight = elementRange(360, 580);
	// const {data: dataSummery, loading: dataSummeryLoading} = useArtistAudienceSummery();
	const { isSubscribed } = useSubscriptions();
	const { profile } = useAccount();
	const { data: artistProfile } = useArtistProfile();
	// const [mapType, setMapType] = useState(MAP_TYPE.map);

	const id = useMemo(() => {
		return data?.mapStats?.[mapTabSelected]?.data.columns.filter(
			({ showInMap }) => showInMap,
		)[mapButtonSelected]?.id;
	}, [data, mapTabSelected, mapButtonSelected]);

	const dataMap = useMemo<Record<string, unknown>[]>(() => {
		const colors = [
			{
				lng: -180,
				// color: '#a367dc'
				color: "#1ED760",
			},
			{
				lng: -90,
				// color: '#8067dc'
				color: "#1ED760",
			},
			{
				lng: 0,
				// color: '#6771dc'
				color: "#1ED760",
			},
			{
				lng: 90,
				// color: '#6794dc'
				color: "#1ED760",
			},
			{
				lng: 180,
				// color: '#67b7dc'
				color: "#1ED760",
			},
		];
		const result = data?.mapStats?.reduce(
			(result, { data: { columns, rows } }, i) => {
				columns.forEach(({ id, showInMap }, index) => {
					if (!showInMap) {
						return;
					}
					rows.forEach(({ countryCode, countryRow }) => {
						set(result, `${countryCode}.${id}`, countryRow[index].displayText);
					});
				});
				return i + 1 === data?.mapStats.length
					? Object.entries<Record<string, unknown>>(result).map(
							([id, values]) => {
								return {
									id,
									color:
										findClosest(
											colors,
											"lng",
											rows.find(({ countryCode }) => countryCode === id)?.lng,
										)?.color || sample(colors)?.color,
									...values,
								};
							},
						)
					: result;
			},
			{},
		);
		return Array.isArray(result) ? result : [];
	}, [data]);

	const maxValues = useMemo(() => {
		return dataMap.reduce<Record<string, number>>((prev, next) => {
			Object.entries(next).forEach(([id, value]) => {
				const prevVal = get(prev, id, 0);
				if (Number(value) > Number(prevVal)) {
					set(prev, id, value);
				}
			});
			return prev;
		}, {});
	}, [dataMap]);

	const minValues = useMemo(() => {
		return dataMap.reduce<Record<string, number>>((prev, next) => {
			Object.entries(next).forEach(([id, value]) => {
				if (Number(value) < Number(get(prev, id, Number.POSITIVE_INFINITY))) {
					set(prev, id, value);
				}
			});
			return prev;
		}, {});
	}, [dataMap]);

	const resetHover = useCallback(() => {
		polygonSeriesRef.current.mapPolygons.each((polygon: MapPolygon) => {
			polygon.isHover = false;
		});

		bubbleSeriesRef.current.mapImages.each((image) => {
			image.isHover = false;
		});
	}, []);

	// calculate zoom level (default is too close)
	const getZoomLevel = useCallback((mapPolygon: MapPolygon) => {
		const w = mapPolygon.polygon.bbox.width;
		const h = mapPolygon.polygon.bbox.width;
		// change 2 to smaller value for a more close zoom
		return Math.min(
			mapChartRef.current.seriesWidth / (w * 2),
			mapChartRef.current.seriesHeight / (h * 2),
		);
	}, []);

	// rotate and zoom
	const rotateAndZoom = useCallback((mapPolygon: MapPolygon) => {
		polygonSeriesRef.current.hideTooltip();
		const animation = mapChartRef.current.animate(
			[
				{
					property: "deltaLongitude",
					to: -mapPolygon.visualLongitude,
				},
				{
					property: "deltaLatitude",
					to: -mapPolygon.visualLatitude,
				},
			],
			1000,
		);
		animation.events.on("animationended", () => {
			mapChartRef.current.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
		});
	}, []);

	// show world data
	const showWorld = useCallback(() => {
		currentPolygonRef.current = undefined;
		resetHover();

		// make all inactive
		polygonSeriesRef.current.mapPolygons.each((polygon: MapPolygon) => {
			polygon.isActive = false;
		});

		mapChartRef.current.goHome();
	}, []);

	// select a country
	const selectCountry = useCallback(
		(mapPolygon: MapPolygon) => {
			if (mapType === MAP_TYPE.globe) {
				return;
			}
			resetHover();
			polygonSeriesRef.current.hideTooltip();

			// if the same country is clicked show world
			if (currentPolygonRef.current === mapPolygon) {
				currentPolygonRef.current.isActive = false;
				currentPolygonRef.current = undefined;
				return showWorld();
			}
			// save current polygon
			currentPolygonRef.current = mapPolygon;

			// make others inactive
			polygonSeriesRef.current.mapPolygons.each((polygon) => {
				polygon.isActive = false;
			});

			mapPolygon.isActive = true;

			// if (mapType === MAP_TYPE.globe) {
			//   animate deltas (results the map to be rotated to the selected country)
			// if (mapChartRef.current.zoomLevel != 1) {
			//   mapChartRef.current.goHome();
			// }
			// rotateAndZoom(mapPolygon);
			// } else {
			// if it's not a globe, simply zoom to the country
			mapChartRef.current.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
			// }
		},
		[mapType],
	);

	// what happens when a country is rolled-over
	const rollOverCountry = useCallback(
		(mapPolygon: MapPolygon) => {
			if (mapType === MAP_TYPE.globe) {
				return;
			}
			resetHover();
			if (mapPolygon) {
				mapPolygon.isHover = true;
				// make bubble hovered too
				const image = bubbleSeriesRef.current.getImageById(
					mapPolygon.dataItem.id,
				);
				if (image) {
					// image.dataItem.dataContext.name = mapPolygon.dataItem.dataContext.name;
					image.isHover = true;
				}
			}
		},
		[mapType],
	);

	// what happens when a country is rolled-out
	const rollOutCountry = useCallback(
		(mapPolygon: MapPolygon) => {
			if (mapType === MAP_TYPE.globe) {
				return;
			}
			const image = bubbleSeriesRef.current.getImageById(
				mapPolygon.dataItem.id,
			);

			resetHover();
			if (image) {
				image.isHover = false;
			}
		},
		[mapType],
	);

	useEffect(() => {
		if (
			!bubbleSeriesRef.current ||
			!polygonSeriesRef.current ||
			!dataMap.length
		) {
			return;
		}
		bubbleSeriesRef.current.data = [...dataMap];
		polygonSeriesRef.current.data = [...dataMap];
		bubbleSeriesRef.current.dataFields.value = id;
		polygonSeriesRef.current.dataFields.value = id;
	}, [dataMap]);

	useEffect(() => {
		if (
			!bubbleSeriesRef.current ||
			!polygonSeriesRef.current ||
			bubbleSeriesRef.current.dataFields.value === id ||
			polygonSeriesRef.current.dataFields.value === id ||
			!Object.keys(minValues).length ||
			!Object.keys(maxValues).length
		) {
			return;
		}

		bubbleSeriesRef.current.dataFields.value = id;
		polygonSeriesRef.current.dataFields.value = id;

		bubbleSeriesRef.current.dataItems.each((dataItem) => {
			dataItem.setValue("value", dataItem.dataContext[id]);
		});

		polygonSeriesRef.current.dataItems.each((dataItem) => {
			dataItem.setValue("value", dataItem.dataContext[id]);
			dataItem.mapPolygon.defaultState.properties.fill = undefined;
		});

		// update heat rule's minValue & maxValue

		const heatRules = bubbleSeriesRef.current.heatRules.getIndex(0);
		heatRules.minValue = (heatRules.minValue + minValues[id]) / 2;
		heatRules.maxValue = (heatRules.maxValue + maxValues[id]) / 2;
	}, [maxValues, minValues, id]);

	useLayoutEffect(() => {
		if (!mapRef.current) {
			return;
		}

		// reset previous use;
		currentPolygonRef.current = undefined;
		mapChartRef.current?.dispose();

		useTheme(am4themes_animated as any);

		mapChartRef.current = create(mapRef.current, MapChart);

		mapChartRef.current.logo.disabled = true;

		mapChartRef.current.width = percent(100);
		mapChartRef.current.height = isMobile ? 300 : 380;

		mapChartRef.current.tooltip.background.fill = colors.tooltipBackground;
		mapChartRef.current.tooltip.background.stroke = colors.tooltipStroke;
		mapChartRef.current.tooltip.fontSize = "0.9em";
		mapChartRef.current.tooltip.getFillFromObject = false;
		mapChartRef.current.tooltip.getStrokeFromObject = false;

		mapChartRef.current.chartContainer.wheelable = false;
		mapChartRef.current.homeZoomLevel =
			!isMobile && !isTablet && !isLaptop ? 1.2 : 0.8;
		mapChartRef.current.homeGeoPoint =
			mapType === MAP_TYPE.globe
				? {
						longitude: 10,
						latitude: 25,
					}
				: {
						longitude: 2,
						latitude: 45,
					};

		//not drugguble if not subscribed
		/* mapChartRef.current.seriesContainer.draggable = isSubscribed;
     mapChartRef.current.seriesContainer.resizable = isSubscribed;*/

		// clicking on a "sea" will also result a full zoom-out
		mapChartRef.current.seriesContainer.background.events.on("hit", showWorld);
		mapChartRef.current.seriesContainer.background.events.on(
			"over",
			resetHover,
		);
		mapChartRef.current.seriesContainer.background.fillOpacity = 0;
		mapChartRef.current.zoomEasing = ease.sinOut;

		mapChartRef.current.geodata = geoDataWorldLow;

		mapChartRef.current.projection =
			mapType === MAP_TYPE.globe
				? new projections.Orthographic()
				: new projections.Miller();
		mapChartRef.current.panBehavior =
			mapType === MAP_TYPE.globe ? "rotateLongLat" : "move";

		// when map is globe, background is made visible
		mapChartRef.current.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
		mapChartRef.current.backgroundSeries.mapPolygons.template.polygon.fill =
			colors.background;
		mapChartRef.current.backgroundSeries.hidden = mapType !== MAP_TYPE.globe;

		// Map polygon series (defines how country areas look and behave)
		polygonSeriesRef.current = mapChartRef.current.series.push(
			new MapPolygonSeries(),
		);

		polygonSeriesRef.current.dataFields.id = "id";
		polygonSeriesRef.current.dataFields.value = id;
		polygonSeriesRef.current.interpolationDuration = 0;

		polygonSeriesRef.current.useGeodata = true;
		polygonSeriesRef.current.nonScalingStroke = true;
		polygonSeriesRef.current.strokeWidth = 0.5;
		// this helps to place bubbles in the visual middle of the area
		polygonSeriesRef.current.calculateVisualCenter = true;
		polygonSeriesRef.current.data = [...dataMap];

		// Antarctica is excluded in non-globe projection
		polygonSeriesRef.current.exclude = mapType === MAP_TYPE.globe ? [] : ["AQ"];

		const polygonTemplate = polygonSeriesRef.current.mapPolygons.template;
		polygonTemplate.fill = colors.country;
		polygonTemplate.fillOpacity = 1;
		polygonTemplate.stroke = colors.countryStroke;
		polygonTemplate.strokeOpacity = 0.15;
		polygonTemplate.setStateOnChildren = true;
		polygonTemplate.tooltipPosition = "fixed";

		polygonTemplate.events.on("hit", ({ target }) => selectCountry(target));
		polygonTemplate.events.on("over", ({ target }) => rollOverCountry(target));
		polygonTemplate.events.on("out", ({ target }) => rollOutCountry(target));

		polygonSeriesRef.current.heatRules.push({
			target: polygonTemplate,
			property: "fill",
			min: colors.country,
			max: colors.country,
			dataField: "value",
		});

		// you can have pacific - centered map if you set this to -154.8
		mapChartRef.current.deltaLongitude = -10;

		// polygon states
		const polygonHoverState = polygonTemplate.states.create("hover");
		polygonHoverState.transitionDuration = 1400;
		polygonHoverState.properties.fill = colors.countryHover;

		const polygonActiveState = polygonTemplate.states.create("active");
		polygonActiveState.properties.fill = colors.countryActive;

		// Bubble series
		bubbleSeriesRef.current = mapChartRef.current.series.push(
			new MapImageSeries(),
		);
		bubbleSeriesRef.current.data = [...dataMap];

		bubbleSeriesRef.current.dataFields.value = id;
		bubbleSeriesRef.current.dataFields.id = "id";

		// adjust tooltip
		bubbleSeriesRef.current.tooltip.animationDuration = 0;
		bubbleSeriesRef.current.tooltip.showInViewport = false;
		bubbleSeriesRef.current.tooltip.getStrokeFromObject = true;
		bubbleSeriesRef.current.tooltip.getFillFromObject = false;
		bubbleSeriesRef.current.tooltip.background.fillOpacity = 0.25;
		bubbleSeriesRef.current.tooltip.background.fill = colors.tooltipBackground;
		bubbleSeriesRef.current.tooltip.background.cornerRadius = 5;
		bubbleSeriesRef.current.tooltip.fontFamily = "'Geist', sans-serif";
		bubbleSeriesRef.current.tooltip.fontSize = 12;
		bubbleSeriesRef.current.hiddenState.properties.scale = 1;
		bubbleSeriesRef.current.hiddenState.transitionDuration = 2000;
		bubbleSeriesRef.current.defaultState.transitionDuration = 2000;

		const imageTemplate = bubbleSeriesRef.current.mapImages.template;
		// if you want bubbles to become bigger when zoomed, set this to false
		imageTemplate.nonScaling = true;
		imageTemplate.strokeOpacity = 0;
		imageTemplate.fillOpacity = 0.55;
		imageTemplate.tooltipText = "{name}: [bold]{value}[/]";
		imageTemplate.applyOnClones = true;
		imageTemplate.propertyFields.latitude = "latitude"; // <- CHECK THIS
		imageTemplate.propertyFields.longitude = "longitude"; // <- CHECK THIS

		imageTemplate.events.on("over", ({ target }) => {
			rollOverCountry(
				polygonSeriesRef.current.getPolygonById(target.dataItem.id),
			);
		});
		imageTemplate.events.on("out", ({ target }) => {
			rollOutCountry(
				polygonSeriesRef.current.getPolygonById(target.dataItem.id),
			);
		});
		imageTemplate.events.on("hit", ({ target }) => {
			selectCountry(
				polygonSeriesRef.current.getPolygonById(target.dataItem.id),
			);
		});

		// this is needed for the tooltip to point to the top of the circle instead of the middle
		imageTemplate.adapter.add("tooltipY", (_, { children }) => {
			return -children.getIndex(0).radius;
		});

		// When hovered, circles become non-opaque
		imageTemplate.states.create("hover").properties.fillOpacity = 1;

		// add circle inside the image
		const circle = imageTemplate.createChild(Circle);
		circle.fillOpacity = 0.7; // <- CHECK THIS
		circle.propertyFields.fill = "color";
		circle.tooltipText = "{name}: [bold]{value}[/]";
		// this makes the circle to pulsate a bit when showing it
		circle.hiddenState.properties.scale = 0.0001;
		circle.hiddenState.transitionDuration = 2000;
		circle.defaultState.transitionDuration = 2000;

		circle.defaultState.transitionEasing = ease.elasticOut;

		// circle.applyOnClones = true; // <- CHECK THIS

		// heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
		bubbleSeriesRef.current.heatRules.push({
			target: circle,
			property: "radius",
			min: 4,
			max: 18, // 30
			dataField: "value",
		});

		// when data items validated, hide 0 value bubbles (because min size is set)
		bubbleSeriesRef.current.events.on("dataitemsvalidated", () => {
			bubbleSeriesRef.current.dataItems.each((dataItem) => {
				const mapImage = dataItem.mapImage;
				const circle = mapImage.children.getIndex(0);
				if (mapImage.dataItem.value === 0) {
					circle.hide(0);
				} else if (circle.isHidden || circle.isHiding) {
					circle.show();
				}
			});
		});

		// this places bubbles at the visual center of a country
		imageTemplate.adapter.add("latitude", (latitude, target) => {
			const polygon = polygonSeriesRef.current.getPolygonById(
				target.dataItem.id,
			);
			if (polygon) {
				target.disabled = false;
				return polygon.visualLatitude;
			}
			target.disabled = true;
			return latitude;
		});

		imageTemplate.adapter.add("longitude", (longitude, target) => {
			const polygon = polygonSeriesRef.current.getPolygonById(
				target.dataItem.id,
			);
			if (polygon) {
				target.disabled = false;
				return polygon.visualLongitude;
			}
			target.disabled = true;
			return longitude;
		});
	}, [mapType, isMobile, isTablet, isLaptop, isSubscribed]);

	const enabled = mapType === MAP_TYPE.globe;
	return (
		<div
			className=" overflow-hidden overflow-y-scroll relative "
			style={{
				maxHeight: `${mapHeight}px`,
			}}
		>
			{!isSubscribed && (
				<div
					className={`absolute w-full z-50 px-0 md:px-8 -top-6  ${mapType === "table" ? "md:top-20" : "md:top-6"}`}
				>
					<div className="w-full flex flex-col justify-center items-center gap-6 py-6 px-4 lg:p-8 mt-6  md:py-6 md:my-6 rounded-xl border border-secondary_dark_gray backdrop-blur-md bg-[#0C0C0C80]">
						<div className=" flex flex-col justify-center items-center gap-4">
							<div className="flex flex-col md:flex-row items-center gap-4">
								<LockIcon className="stroke-yellow min-w-8" />
								<h1 className="text-t1Mobile md:text-t1Regular text-light_grey">
									Просмотр аудитории ограничен
								</h1>
							</div>
							{!profile ? (
								<p className="text-t2Regular text-medium_grey text-center">
									Войдите или зарегистрируйтесь, чтобы получить доступ к
									подписке.
								</p>
							) : (
								!isSubscribed && (
									<p className="text-t2Regular text-medium_grey text-center">
										Подпишись на артиста, чтобы получить всю информацию об
										аудитории!
									</p>
								)
							)}
						</div>
						{!profile ? (
							<SecondaryButton
								title="Войти"
								className="border-none bg-primary_blue text-white w-full md:w-fit"
							/>
						) : !isSubscribed ? (
							<SecondaryButton
								title={`Подпишись
                              на ${artistProfile?.account.name}`}
								className="border-none bg-primary_blue text-white w-full md:w-fit  "
							/>
						) : null}
					</div>
				</div>
			)}
			<div className={"flex w-full h-full flex-col relative  min-h-[25rem]"}>
				{mapType === "map" ? (
					<div
						className={"map-container w-full h-full  "}
						ref={mapRef}
						style={{
							height: `${mapHeight}px`,
						}}
					/>
				) : (
					<CountriesTable />
				)}
			</div>
		</div>
	);
});
