import React from 'react';
import cx from 'classnames';

import './index.scss';

interface Props {
    mix?: string;
}

export const SupportPlate = ({ mix }: Props) => {
    return (
        <div className={cx('support-plate', mix)}>
            Плашка снизу страницы, ведущая по кнопке на страницу Димы <br />
        </div>
    );
}
