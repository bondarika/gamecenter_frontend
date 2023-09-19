import { createStore } from 'effector';

import { getTeam, getTeams, saveScore } from './api';
import type { ParticipantTeam } from './typings';

export const $teamsStore = createStore<{
    loading: boolean;
    team: ParticipantTeam | null;
    allTeams: ParticipantTeam[] | null;
}>({ loading: true, team: null, allTeams: null });

$teamsStore.on(getTeam.doneData, (state, myTeam) => {
    state.loading = false;
    state.team = myTeam;
});

$teamsStore.on(getTeams.doneData, (state, teams) => {
    state.loading = false;
    state.allTeams = teams;
});

$teamsStore.on(saveScore.doneData, (state, updatedTeam) => {
    const stateTeam = state.allTeams?.find((stateTeam) => stateTeam.id === updatedTeam.id);

    if (stateTeam) {
        stateTeam.score = updatedTeam.score;
        stateTeam.current_station = updatedTeam.current_station;
    }
});
