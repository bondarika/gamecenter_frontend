import type { StantionsOrder, Stantion } from '../stantion';

export interface ParticipantTeam {
    id: number;
    teamname: string;
    start_time: string;
    score: number;
    user: number;
    stations: StantionsOrder['id']; // id обьекта с порядком станций
    current_station: Stantion['id'];
}
