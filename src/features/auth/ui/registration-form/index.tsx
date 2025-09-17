import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';

import { Button } from '../../../../shared/ui/button';
import { Logo } from '../../../../shared/ui/logo';

import { getMe } from '../../../../entities/user';
import { $authStore, postCheckAuth } from '../../model/store';

import './index.scss';

/** Форма регистрации при входе на платформу */
export const RegistrationForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [wasEdited, setWasEdited] = React.useState(false);

    const postCheckAuthPending = useUnit(postCheckAuth.pending);
    const getMePending = useUnit(getMe.pending);
    const pending = postCheckAuthPending || getMePending;

    const { error } = useUnit($authStore);

    useEffect(() => {
        setWasEdited(true);
    }, [username, password]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setWasEdited(false);
        postCheckAuth({ username, password });
    };

    const shouldDisableSubmit = pending || !username || !password || (error && !wasEdited);

    // Есть прикол, что автозаполненные браузером поля не триггерят onChange
    // и кнопка submit остается disabled, пока пользователь не кликнет по полю
    return (
        <form className={'registration-form'} onSubmit={handleSubmit}>
            <Logo mix="registration-form__logo" />
            <span className="registration-form__subtitle">играцентр — 2025</span>
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

                <Button type="submit" disabled={shouldDisableSubmit}>
                    готово
                </Button>
            </div>

            {/* сократил текст из макета, иначе получается очень мелко */}
            {error && !wasEdited && <div className="registration-form__error">неверный логин или пароль</div>}
        </form>
    );
};
