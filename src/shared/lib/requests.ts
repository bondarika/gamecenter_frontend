const API_URL =
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const setAuthToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

export const removeAuthToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

const getHeaders = () => {
  const accessToken = localStorage.getItem('access_token');
  return {
    ...defaultHeaders,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
};

async function handleResponse(
  response: Response,
  requestInfo?: { method: string; body?: any }
) {
  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    // Try to refresh token
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(API_URL + '/token/refresh/', {
          method: 'POST',
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (refreshResponse.ok) {
          const { access } = await refreshResponse.json();
          localStorage.setItem('access_token', access);

          // Retry original request with new token
          const newResponse = await fetch(response.url, {
            method: requestInfo?.method || 'GET',
            headers: getHeaders(),
            body:
              requestInfo?.method !== 'GET'
                ? JSON.stringify(requestInfo?.body)
                : undefined,
          });

          return handleResponse(newResponse);
        }
      } catch (e) {
        console.error('Token refresh failed:', e);
      }
    }

    // If refresh failed or no refresh token, remove tokens and reject
    removeAuthToken();
    return Promise.reject(new Error('Unauthorized'));
  }

  return Promise.reject(response);
}

export const get = async (path: string) => {
  const response = await fetch(API_URL + path, {
    method: 'GET',
    headers: getHeaders(),
  });

  return handleResponse(response, { method: 'GET' });
};

export const post = async (path: string, body?: any) => {
  const response = await fetch(API_URL + path, {
    method: 'POST',
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : undefined,
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
  });

  return handleResponse(response, { method: 'POST' });
};
