import { readFileSync } from 'fs';

import resetAutoIncrement from '../resetAutoIncrement';

import { MusicData } from '../../../types/music.type';
import { Tracklist } from '../../../entities/tracklist.entity';
import { Music } from '../../../entities/music.entity';

export default async function importMusicsData(jsonPath: string): Promise<void> {
  const jsonData = readFileSync(jsonPath, 'utf8');
  const musics: MusicData[] = JSON.parse(jsonData);

  console.info(`🎵 ${musics.length} musics found in JSON file`);

  await Tracklist.clear();
  await Music.clear();
  console.info('🧹 Musics table cleared');

  await resetAutoIncrement('tracklist');
  await resetAutoIncrement('music');

  const musicEntities = [];

  for (const music of musics) {
    const musicEntity = new Music();

    musicEntity.title = music.title;
    musicEntity.artists = music.artists;
    musicEntity.producers = music.producers;
    musicEntity.label = music.label;
    musicEntity.release_date = music.release_date;
    musicEntity.isbn_ean_upc = music.ISBN_EAN_UPC || '';
    musicEntity.format = typeof music.format === 'string' ? [music.format] : music.format;
    musicEntity.duration = music.duration;
    musicEntity.category = music.category;
    musicEntity.summary = music.summary;
    musicEntity.keywords = music.keywords;
    musicEntity.targeted_audience = music.targeted_audience;
    musicEntity.original_language = music.original_language;
    musicEntity.series = music.series;
    musicEntity.awards = music.awards || [];
    musicEntity.composers = music.composers || music.composer || [''];
    musicEntity.lyricists = music.lyricists || music.lyricist || [''];
    musicEntity.recording_studio = music.recording_studio;
    musicEntity.certifications = music.certifications;

    const savedMusicEntity = await musicEntity.save();

    if (music.tracklist && Array.isArray(music.tracklist)) {
      const tracklistEntities = music.tracklist.map((track) => {
        const trackEntity = new Tracklist();
        trackEntity.title = track.title;
        trackEntity.duration = track.duration;
        trackEntity.music = savedMusicEntity;
        return trackEntity;
      });

      await Tracklist.save(tracklistEntities);
    }

    musicEntities.push(savedMusicEntity);
  }

  console.info(`✅ ${musicEntities.length} musics successfully imported`);
}
