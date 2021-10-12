export interface Episode {
  id: string
  url: string
  title: string
  duration: number
  thumbnail: string
  description: string
  publishedAt: string
  durationAsString: string
  shortDescription: string
}

export interface EpisodeResponse {
  id: string
  file: File
  title: string
  thumbnail: string
  description: string
  published_at: string
  shortDescription: string
}

export interface File {
  url: string
  type: string
  duration: number
}
