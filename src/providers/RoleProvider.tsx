import React, { ReactNode, createContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Role } from "../interfaces/Role";

interface Roles {
  roles: Role[];
  isLoading: boolean,
  getRoles: () => void,
}

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleContext = createContext<Roles>({} as Roles);

const RoleProvider = ({ children }: RoleProviderProps) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { get } = useHttp();

  const getRoles = () => {
    setIsLoading(true);
    get("/roles")
    .then(res => {
      if(res) {
        setRoles(res.data);
        setIsLoading(false);
      }
    })
    .catch(err => {
        toast.error(`Error: ${err}`);
        setIsLoading(false);
    })
  }

  const value = {
    roles,
    isLoading,
    getRoles,
  };

  return (
    <RoleContext.Provider value={value}>
      { children }
    </RoleContext.Provider>
  );
}

export default RoleProvider;
