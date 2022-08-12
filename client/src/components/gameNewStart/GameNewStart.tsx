import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { gameActions } from '../../store/slices/gameSlice';
import { startNewGame } from '../../services/gameService';
import { notifyError } from '../../utilities/notifyError';
import { Button, Typography } from '@mui/material';
import {
  getPlayerFromLocalStorage,
  updateLocalStorage,
} from '../../utilities/localStorageHandler';
import {
  ContentContainerColumn,
  CenteredTypography,
} from '../../styles/sharedStyles';
import { GoldTextBox } from './styles';
import { fetchCharactersNames } from '../../store/slices/gameSlice';

const GameNewStart = () => {
  const isFirstMount = useAppSelector((state) => state.game.isFirstMount);
  const isWinner = useAppSelector((state) => state.game.isWinner);
  const playerId = useAppSelector((state) => state.game.playerId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // load characters on the first mount of the game
  useEffect(() => {
    if (isFirstMount) {
      dispatch(fetchCharactersNames());
      dispatch(gameActions.setNotIsFirstMount());
    }
  }, [dispatch, isFirstMount]);

  useEffect(() => {
    const player = getPlayerFromLocalStorage();
    if (!player) {
      navigate('/login');
    } else {
      dispatch(gameActions.setPlayerId(player._id));
    }
  }, [dispatch, navigate]);

  const handleStartNewGame = async () => {
    if (playerId === '') {
      navigate('/login');
    } else {
      try {
        const res = await startNewGame(playerId);
        if (Object.keys(res.data.characterToGuess).length > 0) {
          updateLocalStorage(res.data);
          dispatch(gameActions.setIsGame(true));
          dispatch(gameActions.setIsWinner(false));
        } else {
          navigate('/game');
        }
      } catch (err) {
        notifyError();
        console.log(err);
      }
    }
  };

  return (
    <ContentContainerColumn>
      <>
        {!isWinner && (
          <>
            <CenteredTypography variant='h6' sx={{ mb: 3 }}>
              Welcome to
              <GoldTextBox>Harry Potter Characters</GoldTextBox>
              Wordle Game!
            </CenteredTypography>
            <Typography variant='body1'>
              In order to start the game please press the button below. Then
              choose your guess - and the game will show you the hints that will
              guide you. The hints are color-coded. Green means your guess and
              the mystery character have the same characteristics, red - they do
              not.
            </Typography>
            <CenteredTypography variant='body1' sx={{ mt: 3 }}>
              Good Luck!
            </CenteredTypography>
          </>
        )}
      </>
      {isWinner && (
        <>
          <CenteredTypography variant='h6' sx={{ mb: 3 }}>
            <GoldTextBox>GOOD JOOOB!</GoldTextBox>
          </CenteredTypography>
          <Confetti />
        </>
      )}
      <Button
        variant='contained'
        sx={{ mt: 3, width: '75%', alignSelf: 'center' }}
        onClick={handleStartNewGame}
      >
        Start New Game
      </Button>
    </ContentContainerColumn>
  );
};
export default GameNewStart;
