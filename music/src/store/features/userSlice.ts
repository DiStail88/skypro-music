import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  email: string;
  username: string;
  _id: number;
};

type Tokens = {
  access: string;
  refresh: string;
};

type UserState = {
  user: User | null;
  tokens: Tokens | null;
};

const initialState: UserState = {
  user: null,
  tokens: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setTokens(state, action: PayloadAction<Tokens>) {
      state.tokens = action.payload;
      localStorage.setItem('tokens', JSON.stringify(action.payload));
    },
    setAccessToken(state, action: PayloadAction<string>) {
      if (state.tokens) {
        state.tokens.access = action.payload;
        localStorage.setItem('tokens', JSON.stringify(state.tokens));
      }
    },
    clearUser(state) {
      state.user = null;
      state.tokens = null;
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
    },
  },
});

export const { setUser, setTokens, setAccessToken, clearUser } =
  userSlice.actions;
export const userSliceReducer = userSlice.reducer;
