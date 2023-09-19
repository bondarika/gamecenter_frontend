import { createStore } from 'effector';

import { getMe } from './api';
import type { Me } from './typings';

export const $userStore = createStore<{
    loading: boolean;
    me: Me | null;
}>({
    loading: true,
    me: null,
});

$userStore.on(getMe.pending, (state) => {
    state.loading = true;
});

$userStore.on(getMe.doneData, (_, me) => ({ me, loading: false }));
