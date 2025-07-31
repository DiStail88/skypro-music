import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';
import style from './navigation.module.css';
export default function Navigation() {
  return (
    <nav className={style.main__nav}>
      <div className={style.nav__logo}>
        {/*TODO: img –> Image*/}
        <Image
          width={250}
          height={170}
          className={style.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={style.nav__burger}>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
      </div>
      <div className={style.nav__menu}>
        <ul className={style.menu__list}>
          <li className={style.menu__item}>
            {/*TODO: a -> Link*/}
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
