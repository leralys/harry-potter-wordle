import { ICharacterName } from './types/apiResponseTypes';

export const checkIfNameExists = (
  name: string,
  arrayOfObj: ICharacterName[]
) => {
  return arrayOfObj.some((item: ICharacterName) => item.name === name);
};
