import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

import { SupportPlate } from '../support-plate';

import './index.scss';

interface Props extends PropsWithChildren {
    mix?: string;
}

export const Page = ({ children, mix }: Props) => (
    <div className={cx('page', mix)}>
        <div className="page__content">
            {children}

            <SupportPlate mix="page__support-plate" />
        </div>
    </div>
);
