import { Game } from '../entities/game.entity';

export const getGames = async () => {
  const games = await Game.find();
  return games;
};

export const getGameById = async (id: number) => {
  const game = await Game.findOne({ where: { id } });
  return game;
};
