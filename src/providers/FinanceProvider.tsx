import React, { ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Finance } from "../interfaces/Finance";

export type FinanceContextType = {
  //   financeExist: boolean | null;
  isLoading: boolean;
  clickedFinance: Finance | null;
  handleFinanceModalOpen: (finance: Finance) => void;
  handleFinanceModalClose: () => void;
  finances: Finance[];
  getFinances: () => void;
  createInvoice: (invoice: Finance) => Promise<boolean>;
  deleteFinance: (invoiceNumber: number) => Promise<void>;
};

interface FinanceProviderProps {
  children: ReactNode;
}

// const defaultContext = { userExists: null, isLoading: true}

export const FinanceContext = createContext<FinanceContextType>(
  {} as FinanceContextType
);

const FinanceProvider = ({ children }: FinanceProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clickedFinance, setClickedFinance] = useState<Finance | null>(null);
  const [finances, setFinances] = useState<Finance[]>([]);

  const { get, del, post, put } = useHttp();
  const navigate = useNavigate();

  const handleFinanceModalOpen = (finance: Finance) => {
    setClickedFinance(finance);
  };

  const handleFinanceModalClose = () => {
    setClickedFinance(null);
  };

  const deleteFinance = async (invoiceNumber: number) => {
    await del("/invoices/deleteInvoice", invoiceNumber).then((res) => {
      if (res) {
        toast.success(res?.data);
        getFinances();
        handleFinanceModalClose();
      }
    });
  };
  const getFinances = () => {
    get("/invoices").then((res) => {
      if (res) {
        setFinances(res.data);
      }
    });
  };

  const createInvoice = async (data: Finance): Promise<boolean> => {
    return post("/invoices/createInvoice", data).then((res) => {
      if (res) {
        toast.success("Succesfully created invoice");
        getFinances();
        handleFinanceModalClose();
        return true;
      } else {
        return false;
      }
    });
  };

  const updateInvoice = async (id: number, data: Finance): Promise<boolean> => {
    return put(`/invoices/updateInvoice/${id}`, data);
  };

  const value = {
    isLoading,
    clickedFinance,
    handleFinanceModalOpen,
    handleFinanceModalClose,
    finances,
    getFinances,
    deleteFinance,
    createInvoice
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export default FinanceProvider;
