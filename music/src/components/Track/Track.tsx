'use client';

import Link from 'next/link';
import style from './track.module.css';
import { formatTime } from '@/utils/helper';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';

type TrackProps = {
  track: TrackType;
};

export default function Track({ track }: TrackProps) {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlay } = useAppSelector((state) => state.tracks);

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
  };

  const isCurrent = currentTrack?._id === track._id;

  return (
    <div
      key={track._id}
      className={style.playlist__item}
      onClick={onClickTrack}
    >
      <div className={style.playlist__track}>
        <div className={style.track__title}>
          <div
            className={style.track__titleImage}
            style={{ position: 'relative' }}
          >
            <svg className={style.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>

            {/* Точка */}
            {isCurrent && (
              <span
                className={`${style.track__playingDot} ${
                  isPlay ? style.pulsing : ''
                }`}
              ></span>
            )}
          </div>

          <div className="track__title-text">
            <Link className={style.track__titleLink} href="">
              {track.name}
              <span className={style.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={style.track__author}>
          <Link className={style.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={style.track__album}>
          <Link className={style.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          <svg className={style.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={style.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
