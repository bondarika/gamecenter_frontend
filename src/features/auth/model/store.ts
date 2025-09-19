import { createStore, createEffect, createEvent } from 'effector';

import { getMe } from '../../../entities/user';
import { post, setAuthToken, removeAuthToken } from '../../../shared/lib';

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
      const { access, refresh } = (await post('/token/', payload)) as {
        access: string;
        refresh: string;
      };

      if (!access || !refresh) {
        throw Error('Invalid token response');
      }

      setAuthToken(access, refresh);
      setAuthState({ isAuthenticated: true });

      await getMe();
    } catch (e) {
      setError();
      throw e;
    }
  }
);

export const verifyToken = createEffect(async () => {
  try {
    await post('/token/verify/');
    return true;
  } catch (e) {
    removeAuthToken();
    setAuthState({ isAuthenticated: false });
    return false;
  }
});

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
