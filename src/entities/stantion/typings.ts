export interface Stantion {
  id: number;
  time: number;
  points: number;
  name: string;
  description: string;

  /** url в сервер со статикой */
  image: string;

  /** основное задание */
  assignment: string;
}

export interface StantionsOrder {
  id: number;
  order: Stantion['id'][];
}

export interface RawStantionsOrder {
  id: number;
  first: Stantion['id'];
  second: Stantion['id'];
  third: Stantion['id'];
  fourth: Stantion['id'];
  fifth: Stantion['id'];
  sixth: Stantion['id'];
  seventh: Stantion['id'];
  eighth: Stantion['id'];
  ninth: Stantion['id'];
  tenth: Stantion['id'];
}
