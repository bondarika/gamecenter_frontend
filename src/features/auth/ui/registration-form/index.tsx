import React from 'react';
import { useStore } from 'effector-react';

import { Button } from '../../../../shared/ui/button'
import { Logo } from '../../../../shared/ui/logo'

import { $authStore, postCheckAuth } from '../../model/store';

import './index.scss';

export const RegistrationForm = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [pending, setPending] = React.useState(false);

    const { error } = useStore($authStore);

    const handleSubmit = async () => {
        setPending(true);

        await postCheckAuth({ login, password });

        setPending(false);
    }

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
                <input className="registration-form__input" placeholder="логин" value={login} onChange={e => setLogin(e.target.value)} type="text" name="login" />
                <input className="registration-form__input" placeholder="пароль" value={password} onChange={e => setPassword(e.target.value)} type="password" />

                <Button onClick={handleSubmit} disabled={pending || !login || !password}>ГОТОВО</Button>
            </div>

            {/* сократил текст из макета, иначе получается очень мелко */}
            {error && <div className="registration-form__error">неверный логин или пароль</div>}
        </div>
    );
}
