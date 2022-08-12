import axios from '../axios/config';
import { ICharacterName } from '../utilities/types/apiResponseTypes';

export const getAllNames = async () => {
  const res = await axios.get('/characters/names');
  if (res.status === 200) return res.data;
  else throw new Error('could not fetch names');
};

export const startNewGame = async (id: string) => {
  const res = await axios.get(`/game/new/${id}`);
  if (res.status === 200) return res.data;
  else throw new Error('could not start new game');
};

export const getResultOfGuess = async (
  character: ICharacterName,
  id: string
) => {
  const res = await axios.post(`/game/${id}`, {
    characterId: character._id,
    characterName: character.name,
  });
  if (res.status === 200) return res.data;
  else throw new Error('could not continue the game');
};
