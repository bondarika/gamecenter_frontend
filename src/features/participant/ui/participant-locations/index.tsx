import React from 'react';
import cx from 'classnames';

import { bem } from '../../../../shared/lib/bem';
import { PopupPlate } from '../../../../shared/ui/popup-plate';
import { BriefArticle } from '../../../../shared/ui/brief-article';

import type { Location } from '../../model/typings';

import './index.scss';

export const b = bem('participant-locations');

interface Props {
    mix?: string;
}

export const ParticipantLocations = ({ mix }: Props) => {
    const locations: Location[] = [
        { id: 1, title: 'лока 1', status: 'finished', contentText: '', contentImage: '', questionText: '' },
        { id: 2, title: 'лока 2', status: 'finished', contentText: '', contentImage: '', questionText: '' },
        { id: 3, title: 'лока 3', status: 'finished', contentText: '', contentImage: '', questionText: '' },
        {
            id: 4,
            title: 'Дома Зингера',
            status: 'active',
            contentText:
                'Дом был построен в 1902—1904 годах для компании «Зингер». Вплоть до революции в здании была штаб-квартира российского представительства «Зингер» и различные конторы-арендаторы. \n\n Название «Дом книги» закрепилось в речи горожан по магазину, работавшему в здании с 1938 года.',
            contentImage:
                'https://avatars.dzeninfra.ru/get-zen_brief/5414198/pub_62437b368a3c037bd9034d42_6243fc0a77573d7505790005/scale_1200',
            questionText:
                'Ворваться в здание и сфоткаться с гендиректором ВК. Фотографию презентовать куратору (можно и гендиректору тоже)',
        },
        { id: 5, title: 'лока 5', status: 'active', contentText: '', contentImage: '', questionText: '' },
    ];

    return (
        <div className={cx(b(), mix)}>
            {locations.map(({ id, title, status, contentText, contentImage, questionText }, index) => {
                index += 1;

                if (status !== 'active') {
                    return (
                        <PopupPlate
                            mix={b('content-wrapper')}
                            title={title}
                            status={status}
                            numberic={index}
                            key={id}
                            color="white"
                        />
                    );
                }

                return (
                    <PopupPlate
                        mix={b('content-wrapper')}
                        title={title}
                        status={index === locations.length ? 'finish-stantion' : 'active'}
                        numberic={index}
                        key={id}
                        defaultExpanded={true}
                        color="white"
                    >
                        <BriefArticle
                            title="Историческая справка"
                            color="gray"
                            markdown={contentText}
                            image={contentImage}
                        />
                        <BriefArticle title="Задание" markdown={questionText} color="gray" mix={b('question')} />
                    </PopupPlate>
                );
            })}
        </div>
    );
};
