import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setUser, setTokens } from '@/store/features/userSlice';
import { fetchFavoriteTracks } from '@/store/features/trackThunks';

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const tokens = localStorage.getItem('tokens');
      const user = localStorage.getItem('user');

      if (tokens) {
        const parsedTokens = JSON.parse(tokens);
        dispatch(setTokens(parsedTokens));

        // если есть токен — сразу загружаем избранное
        dispatch(fetchFavoriteTracks(parsedTokens.access));
      }

      if (user) {
        dispatch(setUser(JSON.parse(user)));
      }
    } catch (e) {
      console.error('Ошибка восстановления auth из localStorage:', e);
    }
  }, [dispatch]);
};
