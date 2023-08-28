import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import { Location } from './typings';

export const getLocations = createEffect(async () => {
    return (await get('/station/')) as Location[];
});
