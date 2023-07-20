const defaultHeaders = {
    'Content-Type': 'application/json;charset=utf-8'
}

export const post = async (url: string, body: string | object) => {
    const response = await fetch(url, { method: 'POST', headers: defaultHeaders, body: JSON.stringify(body) });

    return response.json();
}
