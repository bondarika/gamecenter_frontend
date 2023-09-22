import React from 'react';

import { BriefArticle } from '../../../../shared/ui/brief-article';

import { b } from '../finish-page';

export const FinishBlockCurator = () => {
    return (
        <>
            <div className={b('titles')}>
                <span className={b('title')}>Это была последняя команда!</span>
                <span className={b('subtitle')}>А значит, Добби свободен!</span>
            </div>

            <BriefArticle
                title="Спасибо за помощь!"
                markdown="Мы выражаем огромную благодарность за содействие в проведении такого масштабного мероприятия, без вас первый курс не увидел бы Петербург в таких ярких красках. Помните, что вы — чудесны!"
                color="gray"
            />

            <div style={{ marginTop: 12 }}>
                <BriefArticle
                    title="Что дальше?"
                    markdown="Сейчас Вы можете быть свободны, отправляйтесь отдыхать и набираться сил перед новыми интересными мероприятиями нашего университета!"
                    color="gray"
                />
            </div>
        </>
    );
};
