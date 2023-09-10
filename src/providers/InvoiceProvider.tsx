import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Invoice } from "../interfaces/Invoice";

export interface Reports {
  document: File;
  name: string;
}

export type InvoiceContextType = {
  //   invoiceExist: boolean | null;
  isLoading: boolean;
  clickedInvoice: Invoice | null;
  handleInvoiceModalOpen: (invoice: Invoice) => void;
  handleInvoiceModalClose: () => void;
  invoices: Invoice[];
  filteredInvoices: Invoice[];
  getInvoices: () => void;
  createInvoice: (invoice: Invoice) => Promise<boolean>;
  deleteInvoice: (invoiceNumber: number) => Promise<void>;
  editInvoice: (inputData: Invoice) => Promise<boolean>;
  saveReport: (data: Reports) => Promise<boolean>;
  applyFilters: (startDate: Date, endDate: Date) => void;
  handleChangeFilters: (filters: Filters) => void;
  clearFilters: () => void;
  filters: Filters;
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
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [filters, setFilters] = useState<Filters>({
    startDate: null,
    endDate: null
  });

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
        setInvoices(res.data.data);
        setIsLoading(false);
        setFilteredInvoices(res.data.data);
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

  // const filtersFromLocalStorage = JSON.parse(
  //   localStorage.getItem("filters") as string
  // );

  // console.log(filtersFromLocalStorage, "localStorage");
  // console.log(filters, "filters");
  // console.log(filteredInvoices, "filteredInvoices");
  // console.log(invoices, "invoices");

  useEffect(() => {
    if (filters?.startDate && filters?.endDate)
      applyFilters(filters?.startDate, filters?.endDate);
    if (filters === null) {
      const filtersFromLocalStorage = JSON.parse(
        localStorage.getItem("filters") as string
      );
      if (localStorage.getItem("filters") !== null) {
        setFilters({
          startDate: new Date(filtersFromLocalStorage?.startDate),
          endDate: new Date(filtersFromLocalStorage?.endDate)
        });
        applyFilters(
          new Date(filtersFromLocalStorage?.startDate),
          new Date(filtersFromLocalStorage?.startDate)
        );
      }
    }
  }, [filters]);

  const applyFilters = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) {
      setFilteredInvoices(invoices);
      return;
    }

    // console.log(startDate, "startDate");
    // console.log(endDate, "endDate");

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const filtered = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.createdAt);
      return invoiceDate >= parsedStartDate && invoiceDate <= parsedEndDate;
    });

    setFilteredInvoices(filtered);
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
    setFilteredInvoices(invoices);
    localStorage.removeItem("filters");
    setFilters({
      startDate: null,
      endDate: null
    });
  };

  const value = {
    isLoading,
    clickedInvoice,
    handleInvoiceModalOpen,
    handleInvoiceModalClose,
    invoices,
    filteredInvoices,
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
