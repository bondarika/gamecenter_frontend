import React from 'react';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { Page } from '../../Components/page';
import { RegistrationForm } from '../../Components/registration-form';

import { $authStore } from '../../Components/registration-form/store';

import './index.scss';

export const Registration = () => {
    // хук от effector, дает доступ к состоянию приложения
    const { data } = useStore($authStore);

    const redirect = useNavigate();

    // хук срабатывает когда изменяется data
    React.useEffect(() => {
        if (data?.type === 'participant') {
            redirect('/participant');
        } else if (data?.type === 'curator') {
            redirect('/curator');
        }
    }, [data]);

    return (
        <Page>
            <RegistrationForm mix="registration__form" />
        </Page>
    );
}
