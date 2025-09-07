'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Centerblock from '@/components/Centerblock/Centerblock';
import Navigation from '@/components/Navigation/Navigation';
import { getTracks } from '@/services/tracks/tracksApi';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/store';
import { setTracks as setStoreTracks } from '@/store/features/trackSlice';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const categoryId = params.id;

  const [tracks, setLocalTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('Треки');

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Берем все треки
        const allTracks = await getTracks();

        // 2. Получаем данные категории
        const { data } = await axios.get(
          `https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${categoryId}`,
        );

        const items: number[] = data.data.items;
        setCategoryName(data.data.name);

        // 3. Фильтруем треки по id
        const filteredTracks = allTracks.filter((track: TrackType) =>
          items.includes(track._id),
        );

        setLocalTracks(filteredTracks);
        dispatch(setStoreTracks(filteredTracks));
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response) {
            setError(err.response.data);
          } else if (err.request) {
            setError('Пропал интернет... Попробуйте позже');
          } else {
            setError('Произошла неизвестная ошибка');
          }
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categoryId, dispatch]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.main}>
          <Navigation />
          <Centerblock
            tracks={tracks}
            loading={loading}
            error={error}
            title={categoryName}
          />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
