export interface TrackDataType {
	result: string;
	message: string;
	links: Link[];
	trackInfo: TrackInfo;
	accountIdUnique: any;
}

interface Link {
	url: string;
	deepLink: string;
	source: string;
}

interface TrackInfo {
	id: number;
	idUnique: string;
	entityIdUnique: string;
	avatar: string;
	largeImageUrl: string;
	trackName: string;
	artistName: string;
	artistname: string;
	artistLinks: ArtistLink[];
	label: string;
	labelLinks: any[];
	baseUrl: string;
	previewUrl: string;
	canvasUrl: any;
	isRestricted: boolean;
	hasAccess: any;
}

interface ArtistLink {
	text: string;
	to: string;
	idUnique: string;
}

export interface ChartTrackDataType {
	result: string;
	message: string;
	chart: Chart;
	trackInfo: TrackInfo;
	sourceId: string;
	accountIdUnique: any;
}

export interface Chart {
	source: string;
	seriesData: SeriesDaum[];
	hasSeriesData: boolean;
	iconData: IconDaum[];
	hasIconData: boolean;
	yAxisTitleData1: YAxisTitleData1;
	yAxisTitleData2: YAxisTitleData2;
	customRange: any;
	name: string;
	tableData: any[];
	uObject: any;
	isRestricted: boolean;
	hasAccess: boolean;
}

export interface SeriesDaum {
	name: string;
	color: string;
	yAxis: number;
	data: number[][];
	dataGrouping: DataGrouping;
	fillColor: FillColor;
}

export interface DataGrouping {
	enabled: boolean;
}

export interface FillColor {
	linearGradient: LinearGradient;
	stops: [number, string][];
}

export interface LinearGradient {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export interface IconDaum {
	text: string;
	secondaryText: string;
	count: any;
	isTop?: number;
	tooltip: string;
	rank?: number;
	graphPopupData?: GraphPopupData;
}

export interface GraphPopupData {
	graphDataId: string;
	source: string;
}

export interface YAxisTitleData1 {
	title: Title;
}

export interface Title {
	text: string;
}

export interface YAxisTitleData2 {
	title: Title2;
}

export interface Title2 {
	text: string;
}
