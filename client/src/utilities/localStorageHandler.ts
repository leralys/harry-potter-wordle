import { ILoginRespose } from './types/apiResponseTypes';
export const KEY = 'player';

export const getPlayerFromLocalStorage = () => {
  const player = localStorage.getItem(KEY);
  return player ? JSON.parse(player) : undefined;
};

export const updateLocalStorage = (playerData: ILoginRespose) => {
  localStorage.setItem(KEY, JSON.stringify(playerData));
};
