'use client';
import style from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Centerblock from '@/components/Centerblock/Centerblock';
import Navigation from '@/components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/store';
import { setTracks } from '@/store/features/trackSlice';

export default function Home() {
  const [tracks, setLocalTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTracks()
      .then((res) => {
        setLocalTracks(res);
        dispatch(setTracks(res));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError('Пропал интернет...Попробуйте позже');
          } else {
            setError('Произошла неизвестная ошибка');
          }
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.main}>
          <Navigation />
          <Centerblock tracks={tracks} loading={loading} error={error} />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
