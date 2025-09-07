import axios, { AxiosResponse } from 'axios';

type authUserProps = {
  email: string;
  password: string;
};

export type AuthUser = {
  email: string;
  username: string;
  _id: number;
};

// Вход (только проверка логина/пароля)
export const authUser = (
  data: authUserProps,
): Promise<AxiosResponse<AuthUser>> => {
  return axios.post(
    'https://webdev-music-003b5b991590.herokuapp.com/user/login',
    data,
    {
      headers: { 'content-type': 'application/json' },
    },
  );
};

// Регистрация
type registerUserProps = {
  email: string;
  password: string;
  username: string;
};

type registerUserResponse = {
  message: string;
  result: AuthUser;
  success: boolean;
};

export const registerUser = (
  data: registerUserProps,
): Promise<AxiosResponse<registerUserResponse>> => {
  return axios.post(
    'https://webdev-music-003b5b991590.herokuapp.com/user/signup',
    data,
    {
      headers: { 'content-type': 'application/json' },
    },
  );
};

// ---------------- Токены ----------------
export type Tokens = {
  access: string;
  refresh: string;
};

// Получить access + refresh токены по email и паролю
export const getTokens = (data: authUserProps): Promise<Tokens> => {
  return axios
    .post('https://webdev-music-003b5b991590.herokuapp.com/user/token/', data, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => res.data);
};

// Обновить access токен по refresh
export const refreshToken = (refresh: string): Promise<{ access: string }> => {
  return axios
    .post(
      'https://webdev-music-003b5b991590.herokuapp.com/user/token/refresh/',
      { refresh },
      { headers: { 'content-type': 'application/json' } },
    )
    .then((res) => res.data);
};
