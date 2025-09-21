import { createEffect } from 'effector';

import { get } from '../../shared/lib';

import { getCurator } from '../curator';
import { getTeam } from '../participant-team';

import type { Me } from './typings';

export const getMe = createEffect(async () => {
  try {
    const me = (await get('/user/get_user')) as Me;
    console.log('getMe response:', me);

    if (me.is_player) {
      console.log('User is player, loading team data');
      await getTeam(me.user_id);
    } else if (me.is_curator) {
      console.log(
        'User is curator, loading curator data for user_id:',
        me.user_id
      );
      await getCurator(me.user_id);
    }

    return me;
  } catch (e) {
    console.error('[getMe] Error:', e);
    throw new Error('Ошибка получения me');
  }
});
