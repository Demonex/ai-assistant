import type {Artists} from "../types.js";
import type React from "react";

export type SearchResultsData = {
  title: string
  items: (Artists[number] & {
    selected?: boolean
  })[]
}[]

export interface SearchResultsContextType {
  data: SearchResultsData
  setData: React.Dispatch<React.SetStateAction<SearchResultsContextType['data']>>,
}
