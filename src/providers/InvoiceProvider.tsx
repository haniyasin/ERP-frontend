import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Invoice } from "../interfaces/Invoice";

export interface Reports {
  document: File;
  name: string;
}

export type InvoiceContextType = {
  isLoading: boolean;
  clickedInvoice: Invoice | null;
  handleInvoiceModalOpen: (invoice: Invoice) => void;
  handleInvoiceModalClose: () => void;
  invoices: Invoice[];
  getInvoices: () => void;
  createInvoice: (invoice: Invoice) => Promise<boolean>;
  deleteInvoice: (invoiceNumber: number) => Promise<void>;
  editInvoice: (inputData: Invoice) => Promise<boolean>;
  saveReport: (data: Reports) => Promise<boolean>;
  applyFilters: (startDate: Date, endDate: Date) => void;
  handleChangeFilters: (filters: Filters) => void;
  clearFilters: () => void;
  filters: Filters | null;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

interface Filters {
  startDate: Date | null;
  endDate: Date | null;
}

export const InvoiceContext = createContext<InvoiceContextType>(
  {} as InvoiceContextType
);

const InvoiceProvider = ({ children }: InvoiceProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clickedInvoice, setClickedInvoice] = useState<Invoice | null>(null);
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filters, setFilters] = useState<Filters | null>(null);

  const { get, del, post, put } = useHttp();

  useEffect(() => {
    if (invoices.length === 0) {
      getInvoices();
    }
    if (!filters) {
      const filtersFromStorage = localStorage.getItem("filters");
      if (filtersFromStorage) {
        const parsedFilters = JSON.parse(filtersFromStorage);
        const newFilters = {
          startDate: new Date(parsedFilters.startDate),
          endDate: new Date(parsedFilters.endDate)
        };
        setFilters(newFilters);
      }
    }
  }, []);

  useEffect(() => {
    if (filters?.startDate && filters?.endDate)
      applyFilters(filters?.startDate, filters?.endDate);
  }, [filters]);

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
        setInvoices(res.data.data);
        setAllInvoices(res.data.data);
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

  const saveReport = async (data: Reports): Promise<boolean> => {
    return post("/reports", data).then((res) => {
      if (res) {
        toast.success("Successfully saved report");
        return true;
      } else {
        return false;
      }
    });
  };

  const applyFilters = async (startDate: Date, endDate: Date) => {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const filtered = allInvoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.createdAt);
      return invoiceDate >= parsedStartDate && invoiceDate <= parsedEndDate;
    });

    setInvoices(filtered);
  };

  const handleChangeFilters = (newFilters: Filters) => {
    localStorage.setItem(
      "filters",
      JSON.stringify({ ...filters, ...newFilters })
    );
    setFilters((prev) => {
      return { ...prev, ...newFilters };
    });
  };

  const clearFilters = () => {
    getInvoices();
    localStorage.removeItem("filters");
    setFilters(null);
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
    editInvoice,
    saveReport,
    applyFilters,
    handleChangeFilters,
    clearFilters,
    filters
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
