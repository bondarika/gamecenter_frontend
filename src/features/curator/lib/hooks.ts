import { useMemo } from 'react';
import { useUnit } from 'effector-react';

import { $stantionsStore, StantionsOrder } from '../../../entities/stantion';
import { $teamsStore, ParticipantTeam } from '../../../entities/participant-team';

// не уверен что правильно делаю, хочется что-то типа селекторов в effector
export const useMapTeamIdToStantionsOrder = () => {
    const { allTeams } = useUnit($teamsStore);
    const { stantionsOrder } = useUnit($stantionsStore);

    const mapStantionsOrderByTeamId: Record<ParticipantTeam['id'], StantionsOrder> = useMemo(() => {
        const x: Record<ParticipantTeam['id'], StantionsOrder> = {};

        allTeams?.forEach(({ id, stations }) => {
            x[id] = stantionsOrder?.find((order) => order.id === stations)!;
        });

        return x;
    }, [allTeams, stantionsOrder]);

    return mapStantionsOrderByTeamId;
};

export const useMapTeamIdToStatus = (stantionId?: number) => {
    const { allTeams } = useUnit($teamsStore);

    const mapStantionsOrderByTeamId = useMapTeamIdToStantionsOrder();

    // какой по порядку у каждой команды идет станция stantionId
    const teamIdToStatus: Record<ParticipantTeam['id'], 'accepted' | 'not-accepted' | 'on-prev-stantions'> = {};

    if (!allTeams) {
        return {};
    }

    allTeams.forEach((team) => {
        teamIdToStatus[team.id] = 'on-prev-stantions';

        for (let i = 1; i < team.current_station; i++) {
            if (mapStantionsOrderByTeamId[team.id].order[i - 1] === stantionId) {
                teamIdToStatus[team.id] = 'accepted';
                break;
            }
        }

        if (mapStantionsOrderByTeamId[team.id].order[team.current_station - 1] === stantionId) {
            teamIdToStatus[team.id] = 'not-accepted';
        }
    });

    return teamIdToStatus;
};

// для плашки статуса shared/status-plate/__teams
// что по сути пиздец нарушает структуру и идею feature slice design, но как временное решение
export const useAcceptedTeamsCount = (stantionId?: number) => {
    const { allTeams } = useUnit($teamsStore);

    const mapStantionsOrderByTeamId = useMapTeamIdToStantionsOrder();

    if (!stantionId || !allTeams) {
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
