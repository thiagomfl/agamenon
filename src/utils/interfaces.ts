export interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: Date;
  thumbnail: string;
  description: string;
  file: File;
}

export interface File {
  url: string;
  type: string;
  duration: number;
}
