'use client';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth/authApi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/features/userSlice';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !username.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }
    if (password !== repeatPassword) {
      return setErrorMessage('Пароли не совпадают');
    }

    setIsLoading(true);

    registerUser({ email, password, username })
      .then((res) => {
        dispatch(setUser(res.data.result));
        router.push('/melody/home');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage('Ошибка сети');
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>

      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="email"
        placeholder="Почта"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <input
        className={styles.modal__input}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <input
        className={styles.modal__input}
        type="password"
        name="repeatPassword"
        placeholder="Повторите пароль"
        value={repeatPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRepeatPassword(e.target.value)
        }
      />

      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
