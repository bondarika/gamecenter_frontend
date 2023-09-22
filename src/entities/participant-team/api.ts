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

export const saveScore = createEffect(async ({ team, score }: { team: ParticipantTeam; score: number }) => {
    // обновляем результат и переводимся на новую станцию
    return (await post(`/playerteam/${team.id}/add_score/`, {
        ...team,
        score,
    })) as ParticipantTeam;
});
