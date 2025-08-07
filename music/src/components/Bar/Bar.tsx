import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import style from './bar.module.css';

export default function Bar() {
  return (
    <div className={style.bar}>
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
              <div className={classnames(style.player__btnPlay, style.btn)}>
                <svg className={style.player__btnPlaySvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
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
                    Ты та...
                  </Link>
                </div>
                <div className={style.trackPlay__album}>
                  <Link className={style.trackPlay__albumLink} href="">
                    Баста
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
