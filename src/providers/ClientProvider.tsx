import React, { ReactNode, createContext, useContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Client } from "../interfaces/Client";

interface ClientContextType {
  clients: Client[];
  isLoading: boolean;
  getClients: () => void;
}

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientContext = createContext<ClientContextType>(
  {} as ClientContextType
);

const ClientProvider = ({ children }: ClientProviderProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { get } = useHttp();

  const getClients = () => {
    setIsLoading(true);
    get("/clients")
      .then((res) => {
        if (res) {
          setClients(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.error(`Error: ${err}`);
        setIsLoading(false);
      });
  };

  const value = {
    clients,
    isLoading,
    getClients
  };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

const useClient = useContext(ClientContext);

export { useClient };

export default ClientProvider;
