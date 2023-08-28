import { createEffect, createStore } from 'effector';

import { get, post } from '../../shared/lib';

import { ParticipantTeam } from './typings';

export const $teamsStore = createStore<{ loading: boolean; teams: ParticipantTeam[] }>({ loading: true, teams: [] });

export const getTeams = createEffect(async () => {
    return (await get('/playerteam/')) as ParticipantTeam[];
});

$teamsStore.on(getTeams.pending, (state) => {
    state.loading = true;
});

$teamsStore.on(getTeams.doneData, (_, teams) => ({ loading: false, teams }));

export const addScore = createEffect(async (team: ParticipantTeam, score: number) => {
    return (await post(`/playerteam/${team.id}/add_score/`, { ...team, score })) as ParticipantTeam;
});

$teamsStore.on(addScore.doneData, (state, team) => {
    const stateTeam = state.teams.find((stateTeam) => stateTeam.id === team.id);

    if (stateTeam) {
        stateTeam.score = team.score;
    }
});
