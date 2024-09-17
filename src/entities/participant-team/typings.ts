import type { StantionsOrder, Stantion } from '../stantion';

export interface ParticipantTeam {
    id: number;
    teamname: string;
    start_time: string;
    score: number;
    user: number;

    /** id обьекта с порядком станций */
    stations: StantionsOrder['id'];
    current_station: Stantion['id'];
}
