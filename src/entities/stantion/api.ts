import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import type { Stantion, StantionsOrder, RawStantionsOrder } from './typings';

export const getStantions = createEffect(async () => {
  const [rawStantions, rawStantionsOrder] = await Promise.all([
    get('/station/'),
    get('/stationorder/'),
  ]);

  const stantions: Record<Stantion['id'], Stantion> = {};
  rawStantions.forEach((stantion: Stantion) => {
    stantions[stantion.id] = stantion;
  });

  const stantionsOrder: StantionsOrder[] = rawStantionsOrder.map(
    (rawOrder: any) => {
      return {
        id: rawOrder.id,
        order: [
          rawOrder.first_id,
          rawOrder.second_id,
          rawOrder.third_id,
          rawOrder.fourth_id,
          rawOrder.fifth_id,
          rawOrder.sixth_id,
          rawOrder.seventh_id,
          rawOrder.eighth_id,
          rawOrder.ninth_id,
          rawOrder.tenth_id,
        ],
      };
    }
  );

  return { stantions, stantionsOrder };
});
