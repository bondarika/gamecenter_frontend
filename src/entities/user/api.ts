import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import { getCurator } from '../curator';
import { getTeam } from '../participant-team';

import type { Me } from './typings';

export const getMe = createEffect(async () => {
  try {
    const me = (await get('/user/get_user')) as Me;

    if (me.is_player) {
      await getTeam(me.user_id);
    } else if (me.is_curator) {
      await getCurator(me.user_id);
    }

    return me;
  } catch (e) {
    throw new Error('Ошибка получения me');
  }
});
