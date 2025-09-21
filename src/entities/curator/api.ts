import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import type { Curator } from './typings';

export const getCurator = createEffect(async (userId: number) => {

  try {
    const curators = (await get(`/curator`)) as Curator[];

    const foundCurator = curators.find(
      (curator) => curator.user === userId || curator.user_id === userId
    );

    return foundCurator!;
  } catch (error) {
    throw error;
  }
});
