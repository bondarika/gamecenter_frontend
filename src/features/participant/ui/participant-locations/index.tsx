import cx from 'classnames';
import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { $teamsStore } from '../../../../entities/participant-team';

import { plural, bem } from '../../../../shared/lib';
import { BriefArticle } from '../../../../shared/ui/brief-article';
import { PopupPlate } from '../../../../shared/ui/popup-plate';
import { StatusPlatePointsRaw, StatusPlateTimeRaw } from '../../../../shared/ui/status-plate/';

import { useOrderedStantionsById } from '../../lib/hooks';

import './index.scss';

export const b = bem('participant-locations');

interface Props {
    mix?: string;
}

export const ParticipantLocations = ({ mix }: Props) => {
    const { team } = useUnit($teamsStore);

    const redirect = useNavigate();
    const orderedStantions = useOrderedStantionsById(team?.stations);

    useEffect(() => {
        if (team?.current_station === 11) {
            redirect('/finisher');
        }
    }, [team?.current_station]);

    return (
        <div className={cx(b(), mix)}>
            {orderedStantions?.map((stantion, index) => {
                if (!stantion) {
                    return;
                }
                const { id, name, description, image, assignment } = stantion;

                index += 1;

                let status: 'active' | 'finished' | 'locked';
                if (index === team!.current_station) {
                    status = 'active';
                } else if (index < team!.current_station) {
                    status = 'finished';
                } else {
                    status = 'locked';
                }

                if (status !== 'active') {
                    return (
                        <PopupPlate
                            mix={b('content-wrapper')}
                            title={name}
                            status={status}
                            numberic={index}
                            key={id}
                            color="gray"
                        />
                    );
                }

                const imgSrc = `http://играцентр.рф/images/адмиралтейство.jpg`;

                return (
                    <PopupPlate
                        mix={b('content-wrapper')}
                        title={name}
                        status={team?.current_station === 10 ? 'finish-stantion' : 'active'}
                        numberic={index}
                        key={id}
                        defaultExpanded={true}
                        color="gray"
                    >
                        <BriefArticle title="Историческая справка" color="white" markdown={description} image={imgSrc} />
                        <BriefArticle
                            title="Задание"
                            markdown={assignment}
                            color="white"
                            mix={b('question')}
                            Footer={() => (
                                <div style={{ display: 'flex', marginTop: 12 }}>
                                    <StatusPlateTimeRaw
                                        time={`${stantion.points} ${plural(
                                            ['минута', 'минуты', 'минут'],
                                            stantion.points,
                                        )}`}
                                        mix={b('time-plate')}
                                    />
                                    <StatusPlatePointsRaw score={stantion.points} />
                                </div>
                            )}
                        />
                    </PopupPlate>
                );
            })}
        </div>
    );
};
