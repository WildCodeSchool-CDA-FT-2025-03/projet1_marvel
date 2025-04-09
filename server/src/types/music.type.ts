export type TrackData = {
  title: string;
  duration: string;
};

export type MusicData = {
  title: string;
  artists: string[];
  producers: string[];
  label: string;
  release_date: string;
  ISBN_EAN_UPC?: string;
  format: string | string[];
  duration: number;
  category: string;
  summary: string;
  keywords: string[];
  targeted_audience: string;
  original_language: string;
  series: boolean;
  awards?: string[];
  tracklist?: TrackData[];
  composers?: string[];
  composer?: string[];
  lyricists?: string[];
  lyricist?: string[];
  recording_studio: string;
  certifications: string[];
};
