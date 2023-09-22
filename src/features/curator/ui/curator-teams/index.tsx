import cx from 'classnames';
import { useUnit } from 'effector-react';
import React from 'react';

import { $curatorStore } from '../../../../entities/curator';
import { $stantionsStore } from '../../../../entities/stantion';

import { bem } from '../../../../shared/lib';
import { PopupPlate } from '../../../../shared/ui/popup-plate';
import { $teamsStore } from '../../../../entities/participant-team';

import { useMapTeamIdToStatus } from '../../lib/hooks';

import { CuratorTeam } from '../curator-team';

import './index.scss';

interface Props {
    mix?: string;
}

export const b = bem('curator-teams');

export const CuratorTeams = ({ mix }: Props) => {
    const { curator } = useUnit($curatorStore);
    const { allTeams } = useUnit($teamsStore);
    const { stantions } = useUnit($stantionsStore);

    const stantion = stantions?.[curator?.station || 0];

    const teamIdToStatus = useMapTeamIdToStatus(curator?.station);

    return (
        <div className={cx(b(), mix)}>
            {allTeams?.map((team, index) => {
                index += 1;

                const { teamname, id } = team;

                if (teamIdToStatus[team.id] === 'accepted') {
                    return (
                        <PopupPlate
                            mix={b('content-wrapper')}
                            title={teamname}
                            status="finished"
                            key={id}
                            color="gray"
                        />
                    );
                } else if (teamIdToStatus[team.id] === 'on-prev-stantions') {
                    return (
                        <PopupPlate
                            mix={b('content-wrapper')}
                            title={teamname}
                            status="locked"
                            key={id}
                            color="gray"
                        />
                    );
                }

                return (
                    <PopupPlate
                        mix={b('content-wrapper')}
                        title={teamname}
                        status="active"
                        numberic={index}
                        key={id}
                        color="gray"
                    >
                        <CuratorTeam team={team} stantion={stantion!} />
                    </PopupPlate>
                );
            })}
        </div>
    );
};
