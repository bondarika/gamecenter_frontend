import React from 'react';
import cx from 'classnames';

import { SupportPlate } from '../support-plate';

import './index.scss';

interface Props {
    mix?: string;
    children: React.ReactNode; // children передаются всегда, если в компонент вложить что-то: <Page><span>что-то</span></Page>
}

export const Page = ({children, mix}: Props) => {
    return (
        <div className={cx('page', mix)}>
            <div className='page__content'>
                {children}

                <SupportPlate mix="page__support-plate" />
            </div>
        </div>
    );
}
