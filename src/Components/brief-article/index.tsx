import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

import { bem } from '../../utils/bem';

import './index.scss';

interface Props {
    mix?: string;
    color: 'gray' | 'white';
    title: string;
    markdown: string;
    image?: string;
}

const b = bem('brief-article');

export const BriefArticle = ({ mix, color, title, markdown, image }: Props) => {
    return (
        <div className={cx(b(null, { color }), mix)}>
            <h3 className={b('title')}>{title}</h3>
            <div className={b('content')}>{markdown}</div>
            {image && <img className={b('image')} src={image} />}
        </div>
    );
};
