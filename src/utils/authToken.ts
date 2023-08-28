const STORAGE_KEY = "accessToken";
export const getLoginToken = () => localStorage.getItem(STORAGE_KEY);
export const setLoginToken = (jwt: string) =>
  localStorage.setItem(STORAGE_KEY, jwt);
