import React from 'react';
import cx from 'classnames';
import { useStore } from 'effector-react';

import { Logo } from '../logo';
import { $authStore, postCheckAuth } from './store';

import './index.scss';

interface Props {
    mix: string;
}

export const RegistrationForm = ({ mix }: Props) => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [pending, setPending] = React.useState(false);

    const { error } = useStore($authStore);

    const handleSubmit = async () => {
        setPending(true);

        await postCheckAuth({ login, password });

        setPending(false);
    }

    // Если тестить с компа то есть прикол, что автозаполненные браузером поля
    // не считываются сразу же и кнопка остается disabled
    // С мобилы не должно быть такого, через ngrok можно потестить в теории
    return (
        <div className={cx('registration-form', mix)}>
            <Logo mix="registration-form__logo" />
            <span className="registration-form__subtitle">играцентр — 2023</span>
            <span className="registration-form__title">авторизация</span>

            <div className="registration-form__controls">
                {/* чтобы браузер сохранил логин оказывается нужно положить name="login" */}
                {/* иначе сохраняется только поле с паролем */}
                <input className="registration-form__input" placeholder="логин" value={login} onChange={e => setLogin(e.target.value)} type="text" name="login" />
                <input className="registration-form__input" placeholder="пароль" value={password} onChange={e => setPassword(e.target.value)} type="password" />

                <button className="registration-form__submit" onClick={handleSubmit} disabled={pending || !login || !password}>ГОТОВО</button>
            </div>

            {/* сократил текст из макета, иначе получается очень мелко */}
            {error && <div className="registration-form__error">неверный логин или пароль</div>}
        </div>
    );
}
