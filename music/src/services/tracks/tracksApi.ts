import axios from 'axios';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(
    'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/',
  ).then((res) => {
    return res.data.data;
  });
};

export const addLike = (token: string, id: number) => {
  return axios.post(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const removeLike = (token: string, id: number) => {
  return axios.delete(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const getFavoriteTracks = (token: string): Promise<TrackType[]> => {
  return axios
    .get(
      'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    .then((res) => res.data.data);
};
