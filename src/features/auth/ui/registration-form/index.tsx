import React from 'react';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { Logo } from '../../../../shared/ui/logo';

import { getMe } from '../../../../entities/user';
import { $authStore, postCheckAuth } from '../../model/store';

import './index.scss';

export const RegistrationForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { error } = useUnit($authStore);
    const postCheckAuthPending = useUnit(postCheckAuth.pending);
    const getMePending = useUnit(getMe.pending);
    const pending = postCheckAuthPending || getMePending;

    const handleSubmit = () => postCheckAuth({ username, password });

    // Есть прикол, что автозаполненные браузером поля не триггерят onChange
    // и кнопка submit остается disabled, пока пользователь не кликнет по полю
    return (
        <div className={'registration-form'}>
            <Logo mix="registration-form__logo" />
            <span className="registration-form__subtitle">играцентр — 2023</span>
            <span className="registration-form__title">авторизация</span>

            <div className="registration-form__controls">
                {/* чтобы браузер сохранил логин оказывается нужно положить name="login" */}
                {/* иначе сохраняется только поле с паролем */}
                <input
                    className="registration-form__input"
                    placeholder="логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="login"
                />
                <input
                    className="registration-form__input"
                    placeholder="пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />

                <Button onClick={handleSubmit} disabled={pending || !username || !password}>
                    ГОТОВО
                </Button>
            </div>

            {/* сократил текст из макета, иначе получается очень мелко */}
            {error && <div className="registration-form__error">неверный логин или пароль</div>}
        </div>
    );
};
