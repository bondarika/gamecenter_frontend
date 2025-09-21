import cx from 'classnames';
import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';

import { $curatorStore } from '../../../../entities/curator';
import { $stantionsStore } from '../../../../entities/stantion';

import { bem } from '../../../../shared/lib';
import { PopupPlate } from '../../../../shared/ui/popup-plate';
import { $teamsStore } from '../../../../entities/participant-team';

import { useAcceptedTeamsCount, useMapTeamIdToStatus } from '../../lib/hooks';

import { CuratorTeam } from '../curator-team';

import './index.scss';
import { useNavigate } from 'react-router';

interface Props {
  mix?: string;
}

export const b = bem('curator-teams');

export const CuratorTeams = ({ mix }: Props) => {
  const { curator } = useUnit($curatorStore);
  const { allTeams } = useUnit($teamsStore);
  const { stantions } = useUnit($stantionsStore);

  const redirect = useNavigate();

  const curatorStationId = curator?.station || curator?.station_id;
  const { count, teamsCount } = useAcceptedTeamsCount(curatorStationId);
  useEffect(() => {
    // Проверяем, что все данные загружены и куратор привязан к станции перед редиректом
    if (
      curatorStationId && // у куратора есть привязанная станция
      allTeams &&
      allTeams.length > 0 && // команды загружены
      count === teamsCount && // все команды прошли станцию
      count > 0 // есть реальные команды для подсчета
    ) {
      redirect('/finisher');
    }
  }, [count, allTeams, curator, curatorStationId]);

  const stantion = stantions?.[curatorStationId || 0];

  const teamIdToStatus = useMapTeamIdToStatus(curatorStationId);

  // Дебаг информация
  console.log('CuratorTeams Debug:', {
    curator: curator,
    curatorStation: curator?.station,
    curatorStationId: curator?.station_id,
    finalStationId: curatorStationId,
    allTeamsCount: allTeams?.length,
    teamIdToStatus,
    allTeams: allTeams?.map((team) => ({
      id: team.id,
      name: team.teamname,
      current_station: team.current_station,
    })),
  });

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
