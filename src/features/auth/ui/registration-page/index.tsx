import React from 'react';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { Page } from '../../../../shared/ui/page';

import { RegistrationForm } from '../registration-form';
import { $authStore } from '../../model/store';

export const RegistrationPage = () => {
    // хук от effector, дает доступ к состоянию приложения
    const { data } = useStore($authStore);
    const redirect = useNavigate();

    // хук срабатывает когда изменяется информация об авторизации
    React.useEffect(() => {
        if (data?.type && !localStorage.getItem('agreed')) {
            redirect('/welcome')
        } else if (data?.type === 'participant') {
            redirect('/participant');
        } else if (data?.type === 'curator') {
            redirect('/curator');
        }
    }, [data]);

    return (
        <Page>
            <RegistrationForm />
        </Page>
    );
}
