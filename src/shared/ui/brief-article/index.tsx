import React from 'react';
import cx from 'classnames';

import { bem, markdown2html } from '../../lib';

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
    const text = markdown2html(markdown);

    return (
        <div className={cx(b(null, { color }), mix)}>
            <h3 className={b('title')}>{title}</h3>
            <div className={b('content')} dangerouslySetInnerHTML={{ __html: text }} />
            {image && <img className={b('image')} src={image} />}
        </div>
    );
};
