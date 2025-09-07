import axios from 'axios';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(
    'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/',
  ).then((res) => {
    return res.data.data;
  });
};
