const API_URL =
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api';

// POST-запрос без body и Content-Type (только Authorization)
export const postNoBody = async (
  path: string,
  options?: { useRefreshToken?: boolean }
) => {
  const token = options?.useRefreshToken
    ? localStorage.getItem('refresh_token')
    : localStorage.getItem('access_token');

  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(API_URL + path, {
    method: 'POST',
    headers,
  });

  return handleResponse(response, { method: 'POST' });
};

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const setAuthToken = (accessToken: string, refreshToken?: string) => {
  console.log('[setAuthToken] access:', accessToken, 'refresh:', refreshToken);
  localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
};

export const removeAuthToken = () => {
  console.log('[removeAuthToken] removing tokens');
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
        const { access } = (await post('/token/refresh/', null, {
          useRefreshToken: true,
        })) as { access: string };
        setAuthToken(access, refreshToken); // Retry original request with new token
        const newResponse = await fetch(response.url, {
          method: requestInfo?.method || 'GET',
          headers: getHeaders(),
          body:
            requestInfo?.method !== 'GET'
              ? JSON.stringify(requestInfo?.body)
              : undefined,
        });
        return handleResponse(newResponse);
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

export const post = async (
  path: string,
  body?: any,
  options?: { useRefreshToken?: boolean }
) => {
  const token = options?.useRefreshToken
    ? localStorage.getItem('refresh_token')
    : localStorage.getItem('access_token');

  const headers = {
    ...defaultHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(API_URL + path, {
    method: 'POST',
    headers,
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
