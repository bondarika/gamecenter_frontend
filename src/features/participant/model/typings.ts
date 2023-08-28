export interface Location {
    id: number;
    title: string;
    status: 'finished' | 'locked' | 'active';
    contentText: string;
    contentImage: string;
    questionText: string;
}
