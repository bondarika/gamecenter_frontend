import { createStore } from 'effector';

import { getCurator } from './api';
import type { Curator } from './typings';

export const $curatorStore = createStore<{
  curator: Curator | null;
  loading: boolean;
}>({
  curator: null,
  loading: true,
});

$curatorStore.on(getCurator.doneData, (_, curator) => {
  console.log('Curator store updated with:', curator);
  return { curator, loading: false };
});

$curatorStore.on(getCurator.failData, (state, error) => {
  console.error('getCurator failed:', error);
  return { ...state, loading: false };
});
