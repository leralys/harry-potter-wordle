import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit';
import {
  ICharacterName,
  ICharactersNameRespose,
} from '../../utilities/types/apiResponseTypes';
import { getAllNames } from '../../services/gameService';

interface ICharactersState {
  characters: ICharacterName[];
  status: string;
  isFirstMount: boolean;
  playerId: string;
  isGame: boolean;
  isWinner: boolean;
}

const initialState: ICharactersState = {
  characters: [],
  status: '',
  isFirstMount: true,
  playerId: '',
  isGame: false,
  isWinner: false,
};

export const fetchCharactersNames: AsyncThunk<any, void, any> =
  createAsyncThunk('characters/fetchNames', async (_, { rejectWithValue }) => {
    try {
      const response = await getAllNames();
      return response;
    } catch (err) {
      return rejectWithValue(JSON.stringify(err));
    }
  });

export const gameSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setNotIsFirstMount(state) {
      const isFirstMount = { ...state, isFirstMount: false };
      return isFirstMount;
    },
    setIsGame(state, action: PayloadAction<boolean>) {
      const isGame = { ...state, isGame: action.payload };
      return isGame;
    },
    setIsWinner(state, action: PayloadAction<boolean>) {
      const isWinner = { ...state, isWinner: action.payload };
      return isWinner;
    },
    setPlayerId(state, action: PayloadAction<string>) {
      state.playerId = action.payload;
    },
  },
  extraReducers: {
    [fetchCharactersNames.fulfilled.type]: (
      state,
      action: PayloadAction<ICharactersNameRespose>
    ) => {
      state.status = action.payload.status;
      state.characters = action.payload.data;
    },
    [fetchCharactersNames.rejected.type]: (state) => {
      state.status = 'fail';
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
