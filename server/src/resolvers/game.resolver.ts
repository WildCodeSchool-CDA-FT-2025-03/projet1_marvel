import { Game } from '../entities/game.entity';

export const getGames = async () => {
  const games = await Game.find();
  return games;
};
