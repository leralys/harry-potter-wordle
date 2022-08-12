import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ICharacterName } from '../../utilities/types/apiResponseTypes';
import { AutocompleteProps } from '../gamePlay/gamePlay.props';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import COLORS from '../../utilities/colors';

const InputAutocomplete = ({ value, setValue }: AutocompleteProps) => {
  const characters = useAppSelector((state) => state.game.characters);

  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: ICharacterName | null) => {
        setValue(newValue);
      }}
      disablePortal
      options={characters}
      getOptionLabel={(option: any) => option.name}
      renderInput={(params) => (
        <TextField {...params} placeholder='Type here you guess' />
      )}
      sx={{ width: '75%', background: COLORS.white, borderRadius: '0.5rem' }}
    />
  );
};
export default InputAutocomplete;
