import { Resolver, Query, Arg } from 'type-graphql';
import { Music } from '../entities/music.entity';
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
}
