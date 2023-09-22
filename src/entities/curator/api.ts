import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import type { Curator } from './typings';

export const getCurator = createEffect(async (userId: number) => {
    const curators = (await get(`/curator/`)) as Curator[];

    return curators.find(({ user }) => user === userId)!;
});
