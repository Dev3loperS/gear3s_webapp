import { User } from "src/types/user.type";

export const saveAccessTokenToLS = (accessToken: string) => {
    localStorage.setItem('access_token', accessToken);
}

export const clearLS = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
}

export const getAccessTokenToLS = () => localStorage.getItem('access_token') || '';

export const getProfile = () => {
    const result = localStorage.getItem('profile');
    return result ? JSON.parse(result) : null;
};

export const setProfile = (profile: User) => {
    localStorage.setItem('access_token', JSON.stringify(profile));
}

