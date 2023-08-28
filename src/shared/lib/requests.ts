const defaultHeaders = {
    'Content-Type': 'application/json;charset=utf-8',
};

const API_URL = 'http://127.0.0.1:8000/api/backend';

export const get = async (path: string) => {
    const response = await fetch(API_URL + path, { method: 'GET', headers: defaultHeaders });

    return response.json();
};

export const post = async (path: string, body: string | object) => {
    const response = await fetch(API_URL + path, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(body),
    });

    return response.json();
};
