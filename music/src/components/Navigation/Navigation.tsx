'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import style from './navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={style.main__nav}>
      <div className={style.nav__logo}>
        <Image
          width={250}
          height={170}
          className={style.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
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
            <Link href="#" className={style.menu__link}>
              Главное
            </Link>
          </li>
          <li className={style.menu__item}>
            <Link href="#" className={style.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={style.menu__item}>
            <Link href="../signin.html" className={style.menu__link}>
              Войти
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
