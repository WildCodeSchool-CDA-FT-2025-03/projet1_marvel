import { Resolver, Query, Arg, Mutation, Int, ObjectType, Field } from 'type-graphql';
import { Music } from '../entities/music.entity';
import { MusicInput } from '../entities/music.entity';
import { Tracklist } from '../entities/tracklist.entity';
import { SearchInput } from '../types/searchInput';
import { FilterInput } from '../types/filterInput';
import { ILike } from 'typeorm';

@ObjectType()
class PaginatedMusic {
  @Field(() => [Music])
  items: Music[];

  @Field()
  total: number;
}

@Resolver(Music)
export class MusicResolver {
  // return all musics and tracks
  @Query(() => PaginatedMusic)
  async getMusic(
    @Arg('search', { nullable: true }) search?: SearchInput,
    @Arg('filter', { nullable: true }) filter?: FilterInput,
  ): Promise<PaginatedMusic> {
    if (filter?.category && filter.category !== 'music' && filter.category !== 'all') {
      return { items: [], total: 0 };
    }

    let musics: Music[] = [];

    if (!search?.searchTerm) {
      musics = await Music.find({ relations: { tracklist: true } });
    } else {
      const searchTerm = search.searchTerm.toLowerCase();
      musics = await Music.find({
        relations: { tracklist: true },
        where: [
          { title: ILike(`%${searchTerm}%`) },
          { artists: ILike(`%${searchTerm}%`) },
          { format: ILike(`%${searchTerm}%`) },
        ],
      });
    }

    if (filter?.sortOrder) {
      musics.sort((a, b) => {
        if (filter.sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }

    const total = musics.length;

    const page = filter?.page || 1;
    const limit = filter?.limit || 12;
    const startIndex = (page - 1) * limit;
    const paginatedMusic = musics.slice(startIndex, startIndex + limit);

    return {
      items: paginatedMusic,
      total,
    };
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
