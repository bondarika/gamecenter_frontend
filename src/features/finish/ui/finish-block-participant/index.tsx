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

    const title = isFullyFinished ? 'Квест завершён!' : 'Время вышло!';
    const subtitle = isFullyFinished ? 'Поздравляем!' : 'Благодарим за прохождение квеста!';

    const finishPlate = isFullyFinished
        ? 'Сейчас Вы можете быть свободны, отправляйтесь отдыхать! Все результаты будут в официальной группе Организационного комитета в ВК, а награждение пройдёт в ближайшие дни на Большевиков, 22. Следите за обновлениями!'
        : 'Сейчас Вы можете быть свободны, отправляйтесь отдыхать! Все результаты будут в официальной группе Организационного комитета в ВК. Следите за обновлениями!';

    const pointsPlate = isFullyFinished
        ? 'Ваша команда успешно справилась с квестом и прошла все станции, заработав:'
        : 'К сожалению, Ваша команда не успела пройти все станции, но заработала:';

    const timePlate = !isTimeEnded
        ? 'Вы справились быстрее предполагаемого времени, в запасе у Вас осталось:'
        : 'Многие люди на планете не прошли ни одной станции, а вы справились с:';

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

            <BriefArticle title="Что дальше?" markdown={finishPlate} color="gray" />
        </>
    );
};
