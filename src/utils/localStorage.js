const LOCAL_STORAGE_AUTH_KEY = "LOCAL_STORAGE_AUTH_STORY";

export const setToken = (token) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
};
export const getToken = () => {
    const jwtToken = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    return jwtToken || null;
};
export const removeToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};
