import React, { ReactNode, createContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Invoice } from "../interfaces/Invoice";

export type InvoiceContextType = {
  //   invoiceExist: boolean | null;
  isLoading: boolean;
  clickedInvoice: Invoice | null;
  handleInvoiceModalOpen: (invoice: Invoice) => void;
  handleInvoiceModalClose: () => void;
  invoices: Invoice[];
  getInvoices: () => void;
  createInvoice: (invoice: Invoice) => Promise<boolean>;
  deleteInvoice: (invoiceNumber: number) => Promise<void>;
  editInvoice: (inputData: Invoice) => Promise<boolean>;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceContext = createContext<InvoiceContextType>(
  {} as InvoiceContextType
);

const InvoiceProvider = ({ children }: InvoiceProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clickedInvoice, setClickedInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const { get, del, post, put } = useHttp();

  const handleInvoiceModalOpen = (invoice: Invoice) => {
    setClickedInvoice(invoice);
  };

  const handleInvoiceModalClose = () => {
    setClickedInvoice(null);
  };

  const deleteInvoice = async (invoiceNumber: number) => {
    await del("/invoices", invoiceNumber).then((res) => {
      if (res) {
        toast.success(res?.data);
        getInvoices();
        handleInvoiceModalClose();
        toast.success("Successfully deleted invoice");
      }
    });
  };
  const getInvoices = () => {
    get("/invoices").then((res) => {
      if (res) {
        setInvoices(res.data);
        setIsLoading(false);
      }
    });
  };

  const createInvoice = async (data: Invoice): Promise<boolean> => {
    return post("/invoices", data).then((res) => {
      if (res) {
        getInvoices();
        handleInvoiceModalClose();
        toast.success("Successfully created invoice");
        return true;
      } else {
        return false;
      }
    });
  };

  const editInvoice = async (inputData: Invoice): Promise<boolean> => {
    let isSuccessful = false;
    if (!clickedInvoice) return isSuccessful;
    await put(`/invoices/${clickedInvoice.id}`, inputData).then((res) => {
      if (res) {
        isSuccessful = true;
        getInvoices();
        toast.success("Invoice edited Successfully!");
      }
    });
    return isSuccessful;
  };
  const value = {
    isLoading,
    clickedInvoice,
    handleInvoiceModalOpen,
    handleInvoiceModalClose,
    invoices,
    getInvoices,
    deleteInvoice,
    createInvoice,
    editInvoice
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
