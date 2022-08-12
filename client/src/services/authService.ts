import axios from '../axios/config';
import { IPlayer } from '../components/loginRegisterForm/loginRegister.props';

export const register = async (player: IPlayer) => {
  const res = await axios.post('/players/register', player);
  if (res.status === 200) return res.data;
  else throw new Error('registration failed');
};

export const login = async (player: IPlayer) => {
  const res = await axios.post('/players/login', player);
  if (res.status === 200) return res.data.data;
  else throw new Error('could not log in');
};
