import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReauth';
import { useState } from 'react';
import { addLikedTrack, removeLikedTrack } from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { addLike, removeLike } from '@/services/tracks/tracksApi';

export const useLikeTrack = (track: TrackType | null) => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { tokens } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!tokens?.access) {
      return setErrorMsg('Нет авторизации');
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTrack : addLikedTrack;

    setIsLoading(true);
    setErrorMsg(null);

    if (track) {
      withReauth(
        (newToken) => actionApi(newToken || tokens.access, track._id),
        tokens.refresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMsg(error.response.data.message);
            } else if (error.request) {
              setErrorMsg('Произошла ошибка. Попробуйте позже');
            } else {
              setErrorMsg('Неизвестная ошибка');
            }
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return { isLoading, errorMsg, toggleLike, isLike };
};
