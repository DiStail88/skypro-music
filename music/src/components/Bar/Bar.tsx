'use client';
import Link from 'next/link';
import classnames from 'classnames';
import style from './bar.module.css';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { useRef, useEffect } from 'react';
import { setIsPlay, togglePlay } from '@/store/features/trackSlice';

export default function Bar() {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlay } = useAppSelector((state) => state.tracks);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlay) {
      audio
        .play()
        .catch((err) => console.warn('Автовоспроизведение заблокировано', err));
    } else {
      audio.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const handleLoaded = () => {
      if (isPlay) {
        audio
          .play()
          .catch((err) =>
            console.warn('Автовоспроизведение заблокировано', err),
          );
      }
    };

    audio.addEventListener('loadeddata', handleLoaded);
    return () => {
      audio.removeEventListener('loadeddata', handleLoaded);
    };
  }, [currentTrack, isPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(setIsPlay(false));
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch]);

  if (!currentTrack) return null;

  return (
    <div className={style.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file}
        style={{ display: 'none' }}
      ></audio>
      <div className={style.bar__content}>
        <div className={style.bar__playerProgress}></div>
        <div className={style.bar__playerBlock}>
          <div className={style.bar__player}>
            <div className={style.player__controls}>
              <div className={style.player__btnPrev}>
                <svg className={style.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(style.player__btnPlay, style.btn)}
                onClick={handlePlayPause}
              >
                <svg className={style.player__btnPlaySvg}>
                  <use
                    xlinkHref={`/img/icon/sprite.svg#${isPlay ? 'icon-pause' : 'icon-play'}`}
                  ></use>
                </svg>
              </div>
              <div className={style.player__btnNext}>
                <svg className={style.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classnames(style.player__btnRepeat, style.btnIcon)}
              >
                <svg className={style.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(style.player__btnShuffle, style.btnIcon)}
              >
                <svg className={style.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={style.player__trackPlay}>
              <div className={style.trackPlay__contain}>
                <div className={style.trackPlay__image}>
                  <svg className={style.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={style.trackPlay__author}>
                  <Link className={style.trackPlay__authorLink} href="">
                    {currentTrack?.name}
                  </Link>
                </div>
                <div className={style.trackPlay__album}>
                  <Link className={style.trackPlay__albumLink} href="">
                    {currentTrack?.author}
                  </Link>
                </div>
              </div>

              <div className={style.trackPlay__dislike}>
                <div
                  className={classnames(
                    style.player__btnShuffle,
                    style.btnIcon,
                  )}
                >
                  <svg className={style.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classnames(
                    style.trackPlay__dislike,
                    style.btnIcon,
                  )}
                >
                  <svg className={style.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={style.bar__volumeBlock}>
            <div className={style.volume__content}>
              <div className={style.volume__image}>
                <svg className={style.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(style.volume__progress, style.btn)}>
                <input
                  className={classnames(style.volume__progressLine, style.btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.volume = Number(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
