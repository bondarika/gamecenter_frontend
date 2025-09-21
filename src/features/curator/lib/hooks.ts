import { useMemo } from 'react';
import { useUnit } from 'effector-react';

import { $stantionsStore, StantionsOrder } from '../../../entities/stantion';
import {
  $teamsStore,
  ParticipantTeam,
} from '../../../entities/participant-team';

// не уверен что правильно делаю, хочется что-то типа селекторов в effector
export const useMapTeamIdToStantionsOrder = () => {
  const { allTeams } = useUnit($teamsStore);
  const { stantionsOrder } = useUnit($stantionsStore);

  console.log('useMapTeamIdToStantionsOrder - raw data:', {
    allTeams: allTeams?.slice(0, 3), // показываем только первые 3 команды
    stantionsOrder,
  });

  const mapStantionsOrderByTeamId: Record<
    ParticipantTeam['id'],
    StantionsOrder
  > = useMemo(() => {
    const x: Record<ParticipantTeam['id'], StantionsOrder> = {};

    allTeams?.forEach(({ id, stations }) => {
      const foundOrder = stantionsOrder?.find((order) => order.id === stations);
      x[id] = foundOrder!;
      console.log(
        `Team ${id} stations field: ${stations}, found order:`,
        foundOrder
      );
    });

    console.log('Final mapStantionsOrderByTeamId:', x);
    return x;
  }, [allTeams, stantionsOrder]);

  return mapStantionsOrderByTeamId;
};

export const useMapTeamIdToStatus = (stantionId?: number) => {
  const { allTeams } = useUnit($teamsStore);

  const mapStantionsOrderByTeamId = useMapTeamIdToStantionsOrder();

  // какой по порядку у каждой команды идет станция stantionId
  const teamIdToStatus: Record<
    ParticipantTeam['id'],
    'accepted' | 'not-accepted' | 'on-prev-stantions'
  > = {};

  if (!allTeams) {
    console.log('useMapTeamIdToStatus: no allTeams');
    return {};
  }

  console.log('useMapTeamIdToStatus Debug:', {
    stantionId,
    allTeamsCount: allTeams.length,
    mapStantionsOrderByTeamId,
  });

  allTeams.forEach((team) => {
    teamIdToStatus[team.id] = 'on-prev-stantions';

    console.log(`Team ${team.teamname} (ID: ${team.id}):`, {
      current_station: team.current_station,
      stationsOrder: mapStantionsOrderByTeamId[team.id]?.order,
      stantionId,
    });

    for (let i = 1; i < team.current_station; i++) {
      if (mapStantionsOrderByTeamId[team.id].order[i - 1] === stantionId) {
        teamIdToStatus[team.id] = 'accepted';
        console.log(
          `  -> Team ${team.teamname} status: accepted (station ${stantionId} at position ${i - 1})`
        );
        break;
      }
    }

    if (
      mapStantionsOrderByTeamId[team.id].order[team.current_station - 1] ===
      stantionId
    ) {
      teamIdToStatus[team.id] = 'not-accepted';
      console.log(
        `  -> Team ${team.teamname} status: not-accepted (current station)`
      );
    }

    console.log(
      `  -> Final status for ${team.teamname}: ${teamIdToStatus[team.id]}`
    );
  });

  console.log('Final teamIdToStatus:', teamIdToStatus);
  return teamIdToStatus;
};

// для плашки статуса shared/status-plate/__teams
// что по сути пиздец нарушает структуру и идею feature slice design, но как временное решение
// upd 2024: ну, тут оказалось на проекте вообще плохо с этим нашим FSD))
export const useAcceptedTeamsCount = (stantionId?: number) => {
  const { allTeams } = useUnit($teamsStore);

  const mapStantionsOrderByTeamId = useMapTeamIdToStantionsOrder();

  if (typeof stantionId !== 'number' || !allTeams) {
    return { count: 0, teamsCount: 0 };
  }

  const count = allTeams.reduce((prev, { id, current_station }) => {
    for (let i = 1; i < current_station; i++) {
      if (mapStantionsOrderByTeamId[id].order[i - 1] === stantionId) {
        return prev + 1;
      }
    }

    return prev;
  }, 0);

  return { count, teamsCount: allTeams.length };
};
