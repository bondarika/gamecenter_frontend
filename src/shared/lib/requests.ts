const API_URL =
  (import.meta as any).env?.VITE_API_URL || 'http://играцентр.рф:8000/api';

// POST-запрос без body и Content-Type (только Authorization)
export const postNoBody = async (path: string) => {
  const token = localStorage.getItem('access_token');
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(API_URL + path, {
    method: 'POST',
    headers,
    credentials: 'include', // Needed for sending cookies
  });

  return handleResponse(response, { method: 'POST' });
};

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const setAuthToken = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};

export const removeAuthToken = () => {
  localStorage.removeItem('access_token');
};

const getHeaders = () => {
  const accessToken = localStorage.getItem('access_token');
  return {
    ...defaultHeaders,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
};

// Переменная для предотвращения одновременного обновления токенов
let refreshPromise: Promise<string> | null = null;

async function handleResponse(
  response: Response,
  requestInfo?: { method: string; body?: any }
) {
  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    try {
      // Если уже идет обновление токена, ждем его завершения
      if (refreshPromise) {
        await refreshPromise;

        // Повторяем запрос с обновленным токеном
        const newResponse = await fetch(response.url, {
          method: requestInfo?.method || 'GET',
          headers: getHeaders(),
          body:
            requestInfo?.method !== 'GET'
              ? JSON.stringify(requestInfo?.body)
              : undefined,
          credentials: 'include',
        });
        return handleResponse(newResponse);
      }

      // Создаем промис для обновления токена
      refreshPromise = postNoBody('/token/refresh').then((data: any) => {
        const { access } = data;
        setAuthToken(access);
        refreshPromise = null; // Сбрасываем промис после завершения
        return access;
      });

      await refreshPromise;

      // Retry original request with new token
      const newResponse = await fetch(response.url, {
        method: requestInfo?.method || 'GET',
        headers: getHeaders(),
        body:
          requestInfo?.method !== 'GET'
            ? JSON.stringify(requestInfo?.body)
            : undefined,
        credentials: 'include', // Include cookies
      });
      return handleResponse(newResponse);
    } catch (e) {
      console.error('Token refresh failed:', e);
      refreshPromise = null; // Сбрасываем промис при ошибке
      // If refresh failed, remove access token and reject
      removeAuthToken();
      return Promise.reject(new Error('Unauthorized'));
    }
  }

  return Promise.reject(response);
}

export const get = async (path: string) => {
  const response = await fetch(API_URL + path, {
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include', // Include cookies
  });

  return handleResponse(response, { method: 'GET' });
};

export const post = async (path: string, body?: any) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    ...defaultHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(API_URL + path, {
    method: 'POST',
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  return handleResponse(response, { method: 'POST', body });
};

export const postWithQuery = async (
  path: string,
  queryParams: Record<string, string>
) => {
  const url = new URL(API_URL + path);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include', // Include cookies
  });

  return handleResponse(response, { method: 'POST' });
};
