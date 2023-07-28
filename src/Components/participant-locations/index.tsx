import React from 'react';

import { bem } from '../../utils/bem';
import { PopupPlate } from '../popup-plate';

import './index.scss';

export const b = bem('participant-locations');

interface Location {
    id: number;
    title: string;
    status: 'finished' | 'locked' | 'active';
    contentText: string;
    contentImage: string;
}

export const ParticipantLocations = ({ mix }: { mix?: string }) => {
    const locations: Location[] = [
        { id: 1, title: 'лока 1', status: 'finished', contentText: '', contentImage: '' },
        { id: 2, title: 'лока 2', status: 'finished', contentText: '', contentImage: '' },
        { id: 3, title: 'лока 3', status: 'finished', contentText: '', contentImage: '' },
        {
            id: 4,
            title: 'Дома Зингера',
            status: 'active',
            contentText:
                'Дом был построен в 1902—1904 годах для компании «Зингер». Вплоть до революции в здании была штаб-квартира российского представительства «Зингер» и различные конторы-арендаторы. Название «Дом книги» закрепилось в речи горожан по магазину, работавшему в здании с 1938 года.',
            contentImage:
                'https://avatars.dzeninfra.ru/get-zen_brief/5414198/pub_62437b368a3c037bd9034d42_6243fc0a77573d7505790005/scale_1200',
        },
        { id: 5, title: 'лока 5', status: 'locked', contentText: '', contentImage: '' },
    ];

    return (
        <div className={b() + ' ' + mix}>
            {locations.map(({ id, title, status, contentText, contentImage }, index) => {
                if (status !== 'active') {
                    return <PopupPlate mix={b('content-wrapper')} title={title} status={status} numberic={index} key={id} />;
                }

                return (
                    <PopupPlate mix={b('content-wrapper')} title={title} status={status} numberic={index} key={id} defaultExpanded={true}>
                        <div className={b('content')}>
                            <h3 className={b('content-title')}>Историческая справка</h3>

                            <span className={b('content-text')}>{contentText}</span>
                            <img className={b('content-image')} src={contentImage} />
                        </div>
                    </PopupPlate>
                );
            })}
        </div>
    );
};
