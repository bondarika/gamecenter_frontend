import { createStore, createEffect, createEvent } from 'effector';

import { getMe } from '../../../entities/user';
import { post, setAuthToken } from '../../../shared/lib';

export const $authStore = createStore<{
  error: boolean;
  postVerifyTokenError: boolean;
}>({
  error: false,
  postVerifyTokenError: false,
});

export const postCheckAuth = createEffect(
  async (payload: { username: string; password: string }) => {
    setNoError();

    try {
      const { access } = (await post('/token/', payload)) as {
        access: string;
        refresh: string;
      };
      if (!access) {
        throw Error();
      }

      setAuthToken(access);

      await getMe();
    } catch (e) {
      setError();
    }
  }
);

// немного тупая логика – нужно в месте вызова эффекта словить catch, чтобы редиректнуть на авторизацию
export const postVerifyToken = createEffect(
  async (payload: { token: string }) => {
    await post('/token/verify/', payload);
  }
);

export const setError = createEvent();

$authStore.on(setError, (store) => {
  store.error = true;
});

export const setNoError = createEvent();

$authStore.on(setNoError, (store) => {
  store.error = false;
});
