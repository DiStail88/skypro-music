import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import style from './sidebar.module.css';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { clearUser } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return (
    <div className={style.main__sidebar}>
      <div className={style.sidebar__personal}>
        <p className={style.sidebar__personalName}>
          {user ? user.username : 'Гость'}
        </p>
        <div className={style.sidebar__icon} onClick={handleLogout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={style.sidebar__block}>
        <div className={style.sidebar__list}>
          <div className={style.sidebar__item}>
            <Link className={style.sidebar__link} href="/melody/category/2">
              <Image
                className={style.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={style.sidebar__item}>
            <Link className={style.sidebar__link} href="/melody/category/3">
              <Image
                className={style.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={style.sidebar__item}>
            <Link className={style.sidebar__link} href="/melody/category/4">
              <Image
                className={style.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
