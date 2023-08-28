import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

interface DecodedToken {
  role: string;
  sub: number;
}

const getUserRoleFromToken = () => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    try {
      const decodedToken = jwt_decode(token) as DecodedToken;
      return decodedToken?.role;
    } catch (error) {
      toast.error(`Error decoding JWT token: ${error}`);
    }
  }

  return null;
};

const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    try {
      const decodedToken = jwt_decode(token) as DecodedToken;
      return decodedToken?.sub;
    } catch (error) {
      toast.error(`Error decoding JWT token: ${error}`);
    }
  }

  return null;
};

export { getUserRoleFromToken, getUserIdFromToken };
