import { createEffect } from 'effector';

import { get, post } from '../../shared/lib';

import type { ParticipantTeam } from './typings';

export const getTeam = createEffect(async (userId: number) => {
    const teams = await getTeams();

    return teams.find(({ user }) => user === userId)!;
});

export const getTeams = createEffect(async () => {
    return (await get('/playerteam/')) as ParticipantTeam[];
});

export const saveScore = createEffect(async (team: ParticipantTeam, score: number) => {
    // обновляем результат
    const updatedTeam = (await post(`/playerteam/${team.id}/add_score/`, { ...team, score })) as ParticipantTeam;

    // обновляет текущую станцию (тк сохраняем результат только при переходах на новую станцию)
    return (await post(`/playerteam/${team.id}/set_current_station/`, {
        ...updatedTeam,
        current_station: updatedTeam.current_station + 1,
    })) as ParticipantTeam;
});
