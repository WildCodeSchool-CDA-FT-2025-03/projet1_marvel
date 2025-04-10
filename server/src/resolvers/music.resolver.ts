import { Resolver, Query, Arg, Mutation, Int } from 'type-graphql';
import { Music } from '../entities/music.entity';
import { MusicInput } from '../entities/music.entity';
import { Tracklist } from '../entities/tracklist.entity';
import { SearchInput } from '../types/searchInput';
import { ILike } from 'typeorm';

@Resolver(Music)
export class MusicResolver {
  // return all musics and tracks
  @Query(() => [Music])
  async getMusic(@Arg('search', { nullable: true }) search?: SearchInput): Promise<Music[]> {
    if (!search?.searchTerm) {
      return await Music.find({ relations: { tracklist: true } });
    }

    const searchTerm = search.searchTerm.toLowerCase();
    return await Music.find({
      relations: { tracklist: true },
      where: [
        { title: ILike(`%${searchTerm}%`) },
        { artists: ILike(`%${searchTerm}%`) },
        { format: ILike(`%${searchTerm}%`) },
      ],
    });
  }

  // return one music and tracks by id
  // I use findOne instead of findOneById because I need to use "relations" with the "where" clause
  @Query(() => Music)
  async getOneMusicById(@Arg('id') id: number): Promise<Music> {
    if (!Number.isInteger(id)) {
      throw new Error("l'id attendu doit être un entier !");
    }

    return (await Music.findOneOrFail({
      where: { id: +id },
      relations: { tracklist: true },
    })) as Music;
  }

  @Mutation(() => Int)
  async createMusic(@Arg('music') music: MusicInput): Promise<number> {
    const { tracklist, ...rest } = music;

    // traiter la partie de l'entité tracklist
    const newTrackList = tracklist?.map((track) => {
      const myTrack = new Tracklist();
      myTrack.title = track.title;
      myTrack.duration = track.duration;

      return myTrack;
    }) as Tracklist[];

    const newMusic: Music = new Music();
    Object.assign(newMusic, rest);
    newMusic.tracklist = newTrackList;

    const result = await newMusic.save();

    return result.id;
  }
}
