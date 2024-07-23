type allLinks = {
  alpha: any
  id: number
  deepLink: string
  imageUrl: string
  link: string
  name: string
  source: string
}

type Links = {
  alpha: any
  id: number
  deepLink: string
  imageUrl: string
  link: string
  name: string
  source: string
}

export type ArtistProfileType = {
  account: {
    allLinks: allLinks[]
    baseUrl: string
    bio: string
    canExport: boolean
    hasManagement: boolean
    hidden: any
    country: string
    id: number
    idUnique: string
    name: string
    type: string
    imageUrl: string
    links: Links[]
    managementType: any
    nonlinks: any
    searchSimilarityScore: any
    subbedAt: any
    tier: number
  },
  message: string,
  result: string
}


type TrackData = {
  listData: {
    buttons: {
      buttonId: string
      title: string
      tooltip: string
    }[]
    descriptions: []
    headerText: string
    items: [
      {
        arrow: any
        artistName: string
        baseUrl: string
        externalUrl: any
        hasInternalLink: any
        id: number
        idUnique: string
        imageUrl: string
        popupIdUnique: string
        popupStyle: any
        popupType: any
        primaryText: string
        primaryValue: number
        secondaryText: string
        secondaryValue: any
        trackName: string
        uniqueBaseUrl: string
      }[]
    ]
  }[]
  relatedTracks: {
    headerText: string
    relatedTracks: {
      artistName: string
      baseUrl: string
      id: number
      idUnique: string
      imageUrl: string
      primaryData: []
      secondaryData: []
      trackName: string
      uniqueBaseUrl: string
    }[]
  }[]
}
export type TrackDataType = {
  accountIdUnique: string
  message: string
  result: string
  sourceId: string
  trackData: TrackData
}
export type ChartDataType = {
  accountIdUnique: string
  chart: {
    customRange: any
    hasIconData: boolean
    hasSeriesData: boolean
    iconData: {
      count: number
      isTop: number
      secondaryText: string
      text: string
      tooltip: string
    }[]
    name: string
    seriesData: {
      color: string
      data: [][]
      dataGrouping: {}
      fillColor: {
        linearGradient: {}
        stops: {}
      }
      name: string
      yAxis: number
    }[]
    source: string
    tableData: []
    uObject: null
    yAxisTitleData1: {
      title: {
        text: string
      }
    }
    yAxisTitleData2: {
      title: {
        text: string
      }
    }
  }
  message: string
  result: string
  sourceId: string
}

export interface ResponseAudienceMapStats {
  result: string
  message: string
  hasPremiumAccess: boolean
  sourceId: string
  accountIdUnique: string
  mapStats: MapStat[]
}

export interface MapStat {
  name: string
  id: string
  data: Data
}

export interface Data {
  columns: Column[]
  rows: Row[]
  sortedById: string
}

export interface Column {
  id: string
  name: string
  width?: string
  isLowFirst?: boolean
  isSortable: boolean
  isAppHidden?: boolean
  isDefaultSort?: boolean
  color?: string
  showInMap?: boolean
}

export interface Row {
  countryCode: string
  locationName: string
  lng: number
  lat: number
  countryAvatar: string
  countryRow: CountryRow[]
}

export interface CountryRow {
  displayText: any
  avatar?: string
  order: any
  hasInternalLink?: boolean
  popupType?: string
  popupIdUnique?: string
  popupStyle?: string
}


export interface ResponseAudienceSummery {
  result: string
  message: string
  hasPremiumAccess: boolean
  sourceId: string
  accountIdUnique: string
  summaryStats: SummaryStat[]
  backstageStats: any
}

export interface SummaryStat {
  titleText: string
  subtitleText: string
  primaryValue: number
  deltaText: string
  isPositiveDelta: boolean
  tooltip: string
}
