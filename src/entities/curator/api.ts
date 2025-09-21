import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import type { Curator } from './typings';

export const getCurator = createEffect(async (userId: number) => {
  console.log('getCurator called with userId:', userId);

  try {
    const curators = (await get(`/curator`)) as Curator[];
    console.log('getCurator API response:', curators);

    const foundCurator = curators.find(
      (curator) => curator.user === userId || curator.user_id === userId
    );
    console.log('Found curator for user', userId, ':', foundCurator);

    return foundCurator!;
  } catch (error) {
    console.error('getCurator error:', error);
    throw error;
  }
});
