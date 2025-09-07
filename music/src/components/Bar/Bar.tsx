'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import style from './bar.module.css';
import { useAppSelector, useAppDispatch } from '@/store/store';
import {
  setIsPlay,
  togglePlay,
  nextTrack,
  prevTrack,
  setTracks,
  setCurrentTrack,
} from '@/store/features/trackSlice';

export default function Bar() {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlay, tracks } = useAppSelector(
    (state) => state.tracks,
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Управление воспроизведением
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlay) {
      audioRef.current
        .play()
        .catch((err) => console.warn('Автовоспроизведение заблокировано', err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlay]);

  // Установка duration после загрузки трека
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const handleLoaded = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
      setCurrentTime(0);
      if (isPlay) audio.play().catch(console.warn);
    };

    audio.addEventListener('loadedmetadata', handleLoaded);
    return () => audio.removeEventListener('loadedmetadata', handleLoaded);
  }, [currentTrack, isPlay]);

  // Обновление текущего времени
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let frame: number;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      frame = requestAnimationFrame(updateTime);
    };

    if (isPlay) frame = requestAnimationFrame(updateTime);

    return () => cancelAnimationFrame(frame);
  }, [isPlay]);

  // Конец трека
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isLoop) {
        audio.currentTime = 0;
        audio.play().catch(console.warn);
        return;
      }

      if (tracks.length > 1) dispatch(nextTrack({ shuffle: isShuffle }));
      else dispatch(setIsPlay(false));
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [dispatch, isLoop, tracks.length, isShuffle, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlay) {
      audio.play().catch(console.warn);
    }
  }, [currentTrack, isPlay]);

  const handlePlayPause = () => {
    if (!currentTrack && tracks.length > 0)
      dispatch(setCurrentTrack(tracks[0]));
    dispatch(togglePlay());
  };

  const handleNextTrack = () => dispatch(nextTrack({ shuffle: isShuffle }));
  const handlePrevTrack = () => dispatch(prevTrack({ shuffle: isShuffle }));

  const onToggleLoop = () => setIsLoop((prev) => !prev);
  const onToggleShuffle = () => setIsShuffle((prev) => !prev);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentTrack) return null;

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={style.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        hidden
        loop={isLoop}
      />

      <div className={style.bar__content}>
        <div className={style.bar__timeInfo}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          step={0.1}
          onChange={handleProgressChange}
          className={style.bar__progress}
          style={
            { '--progress': `${progressPercentage}%` } as React.CSSProperties
          }
        />

        <div className={style.bar__playerBlock}>
          <div className={style.bar__player}>
            <div className={style.player__controls}>
              <div className={style.player__btnPrev} onClick={handlePrevTrack}>
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

              <div className={style.player__btnNext} onClick={handleNextTrack}>
                <svg className={style.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                className={classnames(style.player__btnRepeat, style.btnIcon, {
                  [style.player__btnRepeatActive]: isLoop,
                })}
                onClick={onToggleLoop}
              >
                <svg className={style.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                className={classnames(style.player__btnShuffle, style.btnIcon, {
                  [style.player__btnRepeatActive]: isShuffle,
                })}
                onClick={onToggleShuffle}
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
                  <Link className={style.trackPlay__authorLink} href="#">
                    {currentTrack.name}
                  </Link>
                </div>

                <div className={style.trackPlay__album}>
                  <Link className={style.trackPlay__albumLink} href="#">
                    {currentTrack.author}
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
                  value={volume}
                  onChange={handleVolumeChange}
                  style={
                    { '--volume': `${volume * 100}%` } as React.CSSProperties
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
