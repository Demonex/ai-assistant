import React, { useState } from "react";
import type { SearchResultsContextType, SearchResultsData } from "./types.js";

export const SearchResultsContext =
	React.createContext<SearchResultsContextType>({} as any);
export const SearchResultsContextProvider = ({ children }) => {
	const [data, setData] = useState<SearchResultsData>([]);
	return (
		<SearchResultsContext.Provider value={{ data, setData }}>
			{children}
		</SearchResultsContext.Provider>
	);
};
