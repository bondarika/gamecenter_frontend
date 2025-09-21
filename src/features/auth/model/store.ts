import { createStore, createEffect, createEvent } from 'effector';

import { getMe } from '../../../entities/user';
import {
  post,
  setAuthToken,
  removeAuthToken,
  postNoBody,
} from '../../../shared/lib';

interface AuthState {
  error: boolean;
  isAuthenticated: boolean;
}

export const setAuthState = createEvent<Partial<AuthState>>();

export const $authStore = createStore<AuthState>({
  error: false,
  isAuthenticated: !!localStorage.getItem('access_token'),
});

$authStore.on(setAuthState, (state, payload) => ({
  ...state,
  ...payload,
}));

export const postCheckAuth = createEffect(
  async (payload: { username: string; password: string }) => {
    setNoError();

    try {
      const { access } = (await post('/token', payload)) as {
        access: string;
      };

      if (!access) {
        throw Error('Invalid token response');
      }

      setAuthToken(access);
      setAuthState({ isAuthenticated: true });

      try {
        await getMe();
      } catch (getMeError) {
        // Не выбрасываем ошибку, если токен получен успешно
        // getMe может упасть из-за проблем с загрузкой дополнительных данных
        // но это не должно блокировать логин
      }
    } catch (e) {
      setError();
      throw e;
    }
  }
);

export const logout = createEffect(async () => {
  removeAuthToken();
  setAuthState({ isAuthenticated: false });
});

export const setError = createEvent();

$authStore.on(setError, (state) => ({
  ...state,
  error: true,
}));

export const setNoError = createEvent();

$authStore.on(setNoError, (state) => ({
  ...state,
  error: false,
}));
