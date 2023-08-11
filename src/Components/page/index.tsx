import React from 'react';
import { useStore } from 'effector-react';
import { useNavigate, useLocation } from 'react-router-dom';
import cx from 'classnames';

import { SupportPlate } from '../support-plate';
import { $authStore } from '../registration-form/store';

import './index.scss';

interface Props {
    mix?: string;
    children: React.ReactNode; // children передаются всегда, если в компонент вложить что-то: <Page><span>что-то</span></Page>
}

export const Page = ({children, mix}: Props) => {
    const { data } = useStore($authStore);
    const redirect = useNavigate();
    const location = useLocation();

    const nonAuth = !data?.type && location.pathname !== '/';

    // если не авторизован 
    React.useEffect(() => {
        if (nonAuth) {
            redirect('/');
        }
    }, [data]);

    // Это могло бы быть костылем, ибо оно блочит только
    // рендер переданных компонент, но не их логику (напр запросы к бэку).
    // Но тк передаются pages, в которых особо нет логики, то мы ничего не теряем
    if (nonAuth) {
        return null;
    }

    return (
        <div className={cx('page', mix)}>
            <div className='page__content'>
                {children}

                <SupportPlate mix="page__support-plate" />
            </div>
        </div>
    );
}
