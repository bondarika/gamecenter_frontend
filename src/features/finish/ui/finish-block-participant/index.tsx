import { useUnit } from 'effector-react';
import React from 'react';

import { $teamsStore } from '../../../../entities/participant-team';

import { b } from '../finish-page/';
import { BriefArticle } from '../../../../shared/ui/brief-article';
import { StatusPlatePointsRaw } from '../../../../shared/ui/status-plate';
import { StatusPlateLocations } from '../../../../shared/ui/status-plate/__locations';
import { StatusPlateTime } from '../../../../shared/ui/status-plate/__time';

const hours = Number(process.env.REACT_APP_TIME_ON_QUEST || 5);

export const FinishBlockParticipant = () => {
    const { team } = useUnit($teamsStore);

    const isFullyFinished = team?.current_station === 11;

    const endTime = new Date(team?.start_time || 0).getTime() / 1000 + hours * 3600;
    const isTimeEnded = endTime - new Date().getTime() / 1000 <= 0;

    const { title, subtitle, pointsPlate, timePlate, whatsNext } = getText(isFullyFinished, isTimeEnded);

    return (
        <>
            <div className={b('titles')}>
                <span className={b('title')}>{title}</span>
                <span className={b('subtitle')}>{subtitle}</span>
            </div>
            <div className={b('plates')}>
                <div className={b('plate')}>
                    <span>{pointsPlate}</span>
                    <StatusPlatePointsRaw score={team?.score} />
                </div>
                <div className={b('plate')}>
                    <span>{timePlate}</span>
                    {isTimeEnded ? <StatusPlateLocations /> : <StatusPlateTime />}
                </div>
            </div>

            {!isFullyFinished && <BriefArticle title="Что дальше?" markdown={whatsNext} color="gray" />}
        </>
    );
};

const getText = (isFullyFinished: boolean, isTimeEnded: boolean) => {
    const title = isFullyFinished ? 'квест завершён!' : 'ваше время вышло!';
    const subtitle = isFullyFinished ? 'поздравляем!' : 'спасибо, что были с нами!';

    const pointsPlate = isFullyFinished
        ? 'Ваша команда прошла все станции и заработала:'
        : 'К сожалению, ваша команда не успела завершить квест, но заработала:';

    const timePlate = !isTimeEnded
        ? 'А некоторые ребята ещё проходят квест и у них есть ещё:'
        : 'Многие люди на планете не прошли ни одной станции, а вы справились с:';

    const whatsNext = 'Отправляйтесь на Мойку, 61, там будет официальное закрытие квеста';

    return { title, subtitle, pointsPlate, timePlate, whatsNext };
};
