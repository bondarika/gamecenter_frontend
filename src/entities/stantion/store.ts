import { createStore } from 'effector';

import { getStantions } from './api';
import type { Stantion, StantionsOrder } from './typings';

export const $stantionsStore = createStore<{
    loading: boolean;
    stantions: Record<Stantion['id'], Stantion> | null;
    stantionsOrder: StantionsOrder[] | null;
}>({
    loading: true,
    stantions: null,
    stantionsOrder: null,
});

$stantionsStore.on(getStantions.doneData, (_, payload) => ({ loading: false, ...payload }));
