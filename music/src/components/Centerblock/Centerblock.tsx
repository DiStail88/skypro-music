import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import style from './centerblock.module.css';
import Search from '../Search/Search';
import { data } from '@/data';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
export default function Centerblock() {
  return (
    <div className={style.centerblock}>
      <Search />
      <Filter />
      <h2 className={style.centerblock__h2}>Треки</h2>
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
          {data.map((track) => (
            <Track key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
