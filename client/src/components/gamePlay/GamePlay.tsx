import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPlayerFromLocalStorage } from '../../utilities/localStorageHandler';
import { getResultOfGuess } from '../../services/gameService';
import { updateLocalStorage } from '../../utilities/localStorageHandler';
import {
  IPlayerAttempToGuess,
  ICharacterName,
} from '../../utilities/types/apiResponseTypes';
import { Button, Typography } from '@mui/material';
import InputAutocomplete from '../inputAutocomplete/InputAutocomplete';
import { notifyError } from '../../utilities/notifyError';
import { checkIfNameExists } from '../../utilities/checkIfNameExists';
import {
  ContentContainerRow,
  ContentContainerColumn,
} from '../../styles/sharedStyles';
import { Tag, StyledLi, TagsContainer } from './styles';
import { gameActions } from '../../store/slices/gameSlice';

const GamePlay = () => {
  const playerId = useAppSelector((state) => state.game.playerId);
  const characters = useAppSelector((state) => state.game.characters);
  const [value, setValue] = React.useState<ICharacterName | null>(null);
  const [attempts, setAttempts] = useState<IPlayerAttempToGuess[]>();
  const [countAttempts, setCountAttempts] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const player = getPlayerFromLocalStorage();
    if (!player) navigate('/login');
    else {
      const { attempts } = player;
      setAttempts(attempts);
    }
  }, [countAttempts, navigate]);

  const handleClick = async () => {
    if (value) {
      try {
        // check that the name is the list name
        if (checkIfNameExists(value.name, characters)) {
          const res = await getResultOfGuess(value, playerId);
          updateLocalStorage(res.data);
          setValue(null);
          if (res.status === 'won') {
            dispatch(gameActions.setIsGame(false));
            dispatch(gameActions.setIsWinner(true));
          } else {
            setCountAttempts((count) => count + 1);
          }
          // the name is not on the list
        } else {
          toast("🧌 Sorry, this character doesn't exist!");
        }
      } catch (err) {
        notifyError();
        console.log(err);
      }
    }
  };

  return (
    <>
      <ContentContainerRow>
        <InputAutocomplete value={value} setValue={setValue} />
        <Button
          onClick={handleClick}
          variant='contained'
          sx={{ width: '25%', ml: 1 }}
        >
          TRY
        </Button>
      </ContentContainerRow>
      <ContentContainerColumn>
        {attempts && (
          <>
            <Typography variant='overline' display='block' gutterBottom>
              Your attempts:
            </Typography>
            <ol id='attempts'>
              {attempts
                .slice(0)
                .reverse()
                .map((el: IPlayerAttempToGuess) => (
                  <StyledLi key={el._id}>
                    <Typography>{el.attemptedName}</Typography>
                    <TagsContainer>
                      <Tag isGuessed={el.wizard}>Wizard</Tag>
                      <Tag isGuessed={el.gender}>Gender</Tag>
                      <Tag isGuessed={el.species}>Species</Tag>
                      <Tag isGuessed={el.hogwartsStudent}>Hogwarts Student</Tag>
                    </TagsContainer>
                  </StyledLi>
                ))}
            </ol>
          </>
        )}
      </ContentContainerColumn>
    </>
  );
};
export default GamePlay;
