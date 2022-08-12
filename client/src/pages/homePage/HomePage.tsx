import React from 'react';
import { HomeProps } from './home.props';
import NavBar from '../../components/navBar/NavBar';
import LoginRegisterForm from '../../components/loginRegisterForm/LoginRegisterForm';
import {
  StyledPageContainer,
  MainContentContainer,
} from '../../styles/sharedStyles';

const HomePage = ({ title }: HomeProps) => {
  return (
    <StyledPageContainer>
      <MainContentContainer>
        <NavBar />
        <LoginRegisterForm title={title} />
      </MainContentContainer>
    </StyledPageContainer>
  );
};
export default HomePage;
