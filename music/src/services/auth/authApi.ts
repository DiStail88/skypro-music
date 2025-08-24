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

export const authUser = (
  data: authUserProps,
): Promise<AxiosResponse<AuthUser>> => {
  return axios.post(
    'https://webdev-music-003b5b991590.herokuapp.com/user/login',
    data,
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

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
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};
