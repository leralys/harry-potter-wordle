export interface ICharacterToGuess {
  _id: string;
  name: string;
  species: string;
  gender: string;
  wizard: boolean;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
}

export interface IPlayerAttempToGuess {
  _id: string;
  name: boolean;
  wizard: boolean;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  species: boolean;
  gender: boolean;
  attemptedName: string;
}

export interface IRegisterRespose {
  status: string;
  data: {
    userName: string;
    playerId: string;
  };
}

export interface ILoginRespose {
  characterToGuess: ICharacterToGuess;
  _id: string;
  userName: string;
  isGame: boolean;
  gamesPlayed: number;
  averageAmountTries: number;
  bestResult: number;
  attempts: IPlayerAttempToGuess[];
  __v?: number;
}

export interface IAPIError {
  status: string;
  message: string;
}

export interface ICharacterName {
  _id: string;
  name: string;
}

export interface ICharactersNameRespose {
  status: string;
  data: ICharacterName[];
}
