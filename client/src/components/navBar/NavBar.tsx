// StyledNav
import React from 'react';
import { Typography } from '@mui/material';
import { StyledNav } from './styles';

const NavBar = () => {
  return (
    <StyledNav>
      <Typography variant='h6' component='h2'>
        HP Characters Wordle
      </Typography>
    </StyledNav>
  );
};
export default NavBar;
