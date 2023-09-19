export interface Stantion {
    id: number;
    time: string;
    points: number;
    name: string;
    description: string;
    image: string; // url в сервер со статикой
    assignment: string; // основное задание
    // task: Task['id']; // доп задание от куратора, после правок не используется
}

export interface StantionsOrder {
    id: number;
    order: Stantion['id'][]
}

export interface RawStantionsOrder {
    id: number;
    first: Stantion['id'];
    second: Stantion['id'];
    third: Stantion['id'];
    forth: Stantion['id'];
    fifth: Stantion['id'];
    sixth: Stantion['id'];
    seventh: Stantion['id'];
    eighth: Stantion['id'];
    ninth: Stantion['id'];
    tenth: Stantion['id'];
}