import React from 'react';

import { bem } from '../../lib';

import './index.scss';

interface Props extends React.PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Определяет цвет кнопки */
    view?: 'primary' | 'secondary' | 'error';
    size?: 's' | 'm';
    mix?: string;
}

const b = bem('button');

export const Button = ({ disabled, mix, onClick, view = 'primary', children, size = 'm' }: Props) => {
    return (
        <button className={b(null, { view, size }, mix)} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
