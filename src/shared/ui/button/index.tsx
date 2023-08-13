import React from 'react';
import cx from 'classnames';

import './index.scss';

interface Props extends React.PropsWithChildren {
    disabled?: boolean;
    mix?: string;
    onClick: () => void;
    color?: 'blue' | 'orange';
}

export const Button = ({ disabled, mix, onClick, color = 'blue', children }: Props) => {
    return (
        <button className={cx('button', `button_${color}`, mix)} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
