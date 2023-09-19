import React from 'react';
import cx from 'classnames';

import { bem } from '../../../../shared/lib';
import { PopupPlate } from '../../../../shared/ui/popup-plate';
import { ParticipantTeam } from '../../../../entities/participant-team';
import { CuratorTeam } from '../curator-team';

import './index.scss';

interface Props {
    mix?: string;
}

export const b = bem('curator-teams');

// fixme
const finished = 2;

export const CuratorTeams = ({ mix }: Props) => {
    // const teams: ParticipantTeam[] = [
    //     { id: 1, score: 100, teamname: 'боб', password: '123' },
    //     { id: 2, score: 100, teamname: 'вол', password: '123' },
    //     { id: 3, score: 100, teamname: 'док', password: '123' },
    //     { id: 4, score: 100, teamname: 'ром', password: '123' },
    // ];

    return (
        <div className={cx(b(), mix)}>
            {/* {teams.map((team, index) => {
                const { teamname, id } = team;

                if (index < finished) {
                    return (
                        <PopupPlate
                            mix={b('content-wrapper')}
                            title={teamname}
                            status="finished"
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
                        <CuratorTeam team={team} stantionTime={20 * 60 * 1000} />
                    </PopupPlate>
                );
            })} */}
        </div>
    );
};
