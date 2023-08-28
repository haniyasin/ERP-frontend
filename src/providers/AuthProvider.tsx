import React, { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import { useHttp } from "../hooks/useHttp";
import { getLoginToken, setLoginToken } from "../utils/authToken";

export interface UserAuth {
  isAuthenticated: boolean;
  login: (data: User) => void;
  logout: () => void;
  registerUser: (data: User) => Promise<User>;
  registerAndLogin: (data: User) => void;
}

interface UserAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<UserAuth>({} as UserAuth);

const AuthProvider = ({ children }: UserAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();
  const { post } = useHttp();

  useEffect(() => {
    const token = getLoginToken();
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLoginResponse = (res: any) => {
    if (res) {
      const token = res.data.access_token;
      if (token) {
        setIsAuthenticated(true);
        setLoginToken(token);
        navigate("/");
      }
    }
  };

  const registerAndLogin = (data: User) => {
    post("/auth/register", data).then((res) => {
      handleLoginResponse(res);
    });
  };

  const login = (data: User) => {
    if (isAuthenticated) return toast.error("You are already logged in!");

    post("/auth/login", data).then((res) => {
      handleLoginResponse(res);
    });
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const registerUser = async (data: User) => {
    return await post("/users/createUser", data, "multipart/form-data").then(
      (res) => {
        if (res) {
          toast.success("User created Successfully!");
          return res;
        }
      }
    );
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    registerUser,
    registerAndLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
