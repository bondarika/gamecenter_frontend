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
            Бест практис показывают, что идеально,
                когда компонент влияет только на то, что внутри него,
                а на странице его расположит вышестоящий компонент с помощью mix класса
        </div>
    );
}
