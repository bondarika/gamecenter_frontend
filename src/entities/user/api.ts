import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import type { Me } from './typings';

export const getMe = createEffect(async () => {
    return (await get(`/user/get_user/`)) as Me;
});
