import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../utilities/hooks/useLocalStorage';
import { getPlayerFromLocalStorage } from '../../utilities/localStorageHandler';
import { notifyError } from '../../utilities/notifyError';
import { register, login } from '../../services/authService';
import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { HomeProps, HomeRoutesEnum } from '../../pages/homePage/home.props';
import { IPlayer, FormValuesEnum } from './loginRegister.props';
import { ILoginRespose } from '../../utilities/types/apiResponseTypes';
import {
  TextFieldStyled,
  FormContentContainer,
  StyledFormHeader,
} from './styles';
import COLORS from '../../utilities/colors';
import { KEY } from '../../utilities/localStorageHandler';

const Form = ({ title }: HomeProps) => {
  const [values, setValues] = useState<IPlayer>({
    password: '',
    userName: '',
  });
  // Similar to useState but first arg is key to the value in local storage.
  const [player, setPlayer] = useLocalStorage<ILoginRespose | null>(KEY, null);
  const navigate = useNavigate();

  const handleChange =
    (prop: FormValuesEnum.password | FormValuesEnum.userName) =>
    (event: any) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  useEffect(() => {
    const player = getPlayerFromLocalStorage();
    if (player) navigate('/game');
  }, [navigate]);

  const handleFormAction = async (action: HomeRoutesEnum) => {
    if (action === HomeRoutesEnum.Register) {
      try {
        await register(values);
        toast('🪄 Registration successful!');
        navigate('/login');
      } catch (err) {
        console.log(err);
        notifyError();
      }
    } else {
      try {
        const response = await login(values);
        setPlayer(response);
        navigate('/game');
      } catch (err) {
        notifyError();
        console.log(err);
      }
    }
  };
  return (
    <Box component='form' autoComplete='off' noValidate>
      <StyledFormHeader variant='h6' sx={{ mt: 4 }}>
        {title === HomeRoutesEnum.Register
          ? HomeRoutesEnum.Register
          : `${HomeRoutesEnum.SignIn} to play :)`}
      </StyledFormHeader>
      <FormContentContainer>
        <TextFieldStyled
          required
          id={FormValuesEnum.userName}
          label='Username'
          type='text'
          value={values.userName}
          onChange={handleChange(FormValuesEnum.userName)}
        />
        <TextFieldStyled
          id={FormValuesEnum.password}
          label='Password'
          type={FormValuesEnum.password}
          autoComplete='current-password'
          onChange={handleChange(FormValuesEnum.password)}
        />
        <Button variant='contained' onClick={() => handleFormAction(title)}>
          {title === HomeRoutesEnum.Register
            ? HomeRoutesEnum.Register
            : HomeRoutesEnum.SignIn}
        </Button>
        <Link to={title === HomeRoutesEnum.Register ? '/login' : '/register'}>
          <Typography
            variant='body2'
            sx={{
              color: COLORS.darkBlue,
              borderBottom: `1px solid ${COLORS.darkBlue}`,
            }}
          >
            {title === HomeRoutesEnum.Register
              ? 'I have an account'
              : "I don't have an account"}
          </Typography>
        </Link>
      </FormContentContainer>
    </Box>
  );
};

export default Form;
