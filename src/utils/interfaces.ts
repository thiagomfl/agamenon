export interface Episode {
  id: string
  url: string
  title: string
  members: string
  duration: number
  thumbnail: string
  description: string
  publishedAt: string
  durationAsString: string
}

export interface EpisodeResponse {
  id: string
  file: File
  title: string
  members: string
  thumbnail: string
  description: string
  published_at: string
}

export interface File {
  url: string
  type: string
  duration: number
}
