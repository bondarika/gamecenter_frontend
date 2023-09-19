import { createStore } from 'effector';

import { getCurator } from './api';
import type { Curator } from './typings';

export const $curatorStore = createStore<{ curator: Curator | null }>({ curator: null });

$curatorStore.on(getCurator.doneData, (_, curator) => ({ curator }));
