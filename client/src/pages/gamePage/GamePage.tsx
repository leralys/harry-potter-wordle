import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { getPlayerFromLocalStorage } from '../../utilities/localStorageHandler';
import NavBar from '../../components/navBar/NavBar';
import GameNewStart from '../../components/gameNewStart/GameNewStart';
import GamePlay from '../../components/gamePlay/GamePlay';
import {
  StyledPageContainer,
  MainContentContainer,
} from '../../styles/sharedStyles';
import { gameActions } from '../../store/slices/gameSlice';

const GamePage = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const isGame = useAppSelector((state) => state.game.isGame);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // if the user is not loged id he can not play
  useEffect(() => {
    const player = getPlayerFromLocalStorage();
    if (!player) {
      setRedirect(true);
      navigate('/login');
    } else {
      dispatch(gameActions.setIsGame(player.isGame));
    }
  }, [navigate, dispatch]);
  return (
    <>
      {!redirect && (
        <StyledPageContainer>
          <MainContentContainer>
            <NavBar />
            {!isGame && <GameNewStart />}
            {isGame && <GamePlay />}
          </MainContentContainer>
        </StyledPageContainer>
      )}
    </>
  );
};
export default GamePage;
