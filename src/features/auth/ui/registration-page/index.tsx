import React from 'react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { $userStore, getMe } from '../../../../entities/user';
import { Page } from '../../../../shared/ui/page';

import { RegistrationForm } from '../registration-form';

export const RegistrationPage = () => {
    const { me } = useUnit($userStore);

    const redirect = useNavigate();

    // хук срабатывает когда изменяется информация об авторизации
    React.useEffect(() => {
        if (me && !localStorage.getItem('agreed')) {
            redirect('/welcome');
        } else if (me?.is_player) {
            redirect('/participant');
        } else if (me?.is_curator) {
            redirect('/curator');
        }
    }, [me]);

    return (
        <Page>
            <RegistrationForm />
        </Page>
    );
};
