'use client';
import { useAppSelector } from '@/store/store';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import Navigation from '@/components/Navigation/Navigation';
import Bar from '@/components/Bar/Bar';
import style from './page.module.css';

export default function FavoritePage() {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <main className={style.main}>
          <Navigation />
          <Centerblock
            tracks={favoriteTracks}
            loading={false}
            error=""
            title="Избранные треки"
          />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
