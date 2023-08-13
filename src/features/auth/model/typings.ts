export interface AuthData {
    type: 'participant' | 'curator';
}

export interface AuthStore {
    data?: AuthData;
    error?: boolean;
}
