import jwtDecode, { JwtPayload } from "jwt-decode";

export const checkTokenExpiration = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) return false;

    return true;
  } catch {
    return false;
  }
};
