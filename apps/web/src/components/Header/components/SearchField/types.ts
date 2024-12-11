export type Artists = {
	title: string;
	photo: string;
	description: string;
	id: string;
	secondaryText?: string;
}[];

export type SearchResultsResponse = {
	title: string;
	items: Artists;
}[];
