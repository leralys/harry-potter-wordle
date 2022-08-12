export enum HomeRoutesEnum {
  Register = 'Register',
  SignIn = 'Sign In',
}

export interface HomeProps {
  title: HomeRoutesEnum.Register | HomeRoutesEnum.SignIn;
}
