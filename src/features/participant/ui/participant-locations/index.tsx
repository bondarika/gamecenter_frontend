import cx from 'classnames';
import { useUnit } from 'effector-react';
import React, { useMemo } from 'react';

import { $stantionsStore } from '../../../../entities/stantion';
import { $teamsStore } from '../../../../entities/participant-team';

import { BriefArticle } from '../../../../shared/ui/brief-article';
import { PopupPlate } from '../../../../shared/ui/popup-plate';
import { bem } from '../../../../shared/lib/bem';

import './index.scss';

export const b = bem('participant-locations');

interface Props {
    mix?: string;
}

export const ParticipantLocations = ({ mix }: Props) => {
    const { stantionsOrder, stantions } = useUnit($stantionsStore);
    const { team } = useUnit($teamsStore);

    const teamStantionsOrder = useMemo(
        () => stantionsOrder?.find(({ id }) => id === team?.stations),
        [team, stantionsOrder],
    );
    const orderedStantions = useMemo(
        () => teamStantionsOrder?.order.map((stantionId) => stantions?.[stantionId]),
        [stantions, teamStantionsOrder],
    );

    // МОК
    if (team) {
        team.current_station = 6;
    }

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
                            color="white"
                        />
                    );
                }

                return (
                    <PopupPlate
                        mix={b('content-wrapper')}
                        title={name}
                        status={index === orderedStantions.length ? 'finish-stantion' : 'active'}
                        numberic={index}
                        key={id}
                        defaultExpanded={true}
                        color="white"
                    >
                        <BriefArticle title="Историческая справка" color="gray" markdown={description} image={image} />
                        <BriefArticle title="Задание" markdown={assignment} color="gray" mix={b('question')} />
                    </PopupPlate>
                );
            })}
        </div>
    );
};
