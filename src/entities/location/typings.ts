import { Task } from '../task';

export interface Location {
    id: number;
    name: string;
    description: string;
    image: string;
    task: Task;
}
