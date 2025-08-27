'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import style from './navigation.module.css';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { clearUser } from '@/store/features/userSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return (
    <nav className={style.main__nav}>
      <div className={style.nav__logo}>
        <Link href="/" className={style.logo__link}>
          <Image
            width={250}
            height={170}
            className={style.logo__image}
            src="/img/logo.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className={style.nav__burger} onClick={toggleMenu}>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
      </div>

      <div
        className={classnames(style.nav__menu, {
          [style.nav__menu_open]: isOpen,
        })}
      >
        <ul className={style.menu__list}>
          <li className={style.menu__item}>
            <Link href="/melody/home" className={style.menu__link}>
              Главное
            </Link>
          </li>
          <li className={style.menu__item}>
            <Link href="/melody/playlist" className={style.menu__link}>
              Мой плейлист
            </Link>
          </li>

          {!user ? (
            <li className={style.menu__item}>
              <Link href="/auth/signin" className={style.menu__link}>
                Войти
              </Link>
            </li>
          ) : (
            <li className={style.menu__item}>
              <button onClick={handleLogout} className={style.menu__button}>
                Выйти
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
