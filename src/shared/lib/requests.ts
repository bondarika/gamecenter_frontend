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
  console.log('[setAuthToken] access:', accessToken);
  localStorage.setItem('access_token', accessToken);
};

export const removeAuthToken = () => {
  console.log('[removeAuthToken] removing access token');
  localStorage.removeItem('access_token');
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
    try {
      // Try to refresh token using the HTTP-only cookie
      const { access } = (await post('/token/refresh/', null)) as {
        access: string;
      };
      setAuthToken(access);

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
    credentials: 'include'
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
