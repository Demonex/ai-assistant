
export type Artists = {
  title: string
  photo: string
  description: string
  id: string
}[]


export type SearchResultsResponse = {
  title: string
  items: Artists
}[]
