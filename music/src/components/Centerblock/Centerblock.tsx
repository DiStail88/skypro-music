import classnames from 'classnames';
import style from './centerblock.module.css';
import Search from '../Search/Search';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import { useState, useMemo } from 'react';

type CenterblockProps = {
  tracks: TrackType[];
  loading: boolean;
  error: string;
  title?: string;
};

type Filters = {
  author: string;
  genre: string;
  year: string;
};

export default function Centerblock({
  tracks,
  loading,
  error,
  title = 'Треки',
}: CenterblockProps) {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    author: '',
    genre: '',
    year: '',
  });

  const filteredTracks = useMemo(() => {
    let result = [...tracks];

    if (selectedFilters.author) {
      result = result.filter(
        (track) => track.author === selectedFilters.author,
      );
    }

    if (selectedFilters.genre) {
      result = result.filter((track) =>
        track.genre.includes(selectedFilters.genre),
      );
    }

    if (selectedFilters.year === 'Сначала новые') {
      result.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    } else if (selectedFilters.year === 'Сначала старые') {
      result.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
    }

    return result;
  }, [tracks, selectedFilters]);

  return (
    <div className={style.centerblock}>
      <Search />
      <Filter
        tracks={tracks}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <h2 className={style.centerblock__h2}>{title}</h2>
      <div className={style.centerblock__content}>
        <div className={style.content__title}>
          <div className={classnames(style.playlistTitle__col, style.col01)}>
            Трек
          </div>
          <div className={classnames(style.playlistTitle__col, style.col02)}>
            Исполнитель
          </div>
          <div className={classnames(style.playlistTitle__col, style.col03)}>
            Альбом
          </div>
          <div className={classnames(style.playlistTitle__col, style.col04)}>
            <svg className={style.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={style.content__playlist}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading ? (
            <p style={{ color: 'white' }}>Загрузка треков...</p>
          ) : (
            filteredTracks.map((track) => (
              <Track key={track._id} track={track} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
