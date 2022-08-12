import { ICharacterName } from '../../utilities/types/apiResponseTypes';

export interface AutocompleteProps {
  value: ICharacterName | null;
  setValue: React.Dispatch<React.SetStateAction<ICharacterName | null>>;
}
