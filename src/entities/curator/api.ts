import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import type { Curator } from './typings';

export const getCurator = createEffect(async (id: number) => {
    return (await get(`/playerteam/${id}/`)) as Curator;
});
