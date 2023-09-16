import React, { ReactNode, createContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Company } from "../interfaces/Company";
import { useNavigate } from "react-router-dom";

export type CompanyContextType = {
  isLoading: boolean;
  clickedCompany: Company | null;
  handleCompanyDashboardOpen: (company: Company) => void;
  handleCompanyDashboardClose: () => void;
  companies: Company[];
  getCompanies: () => void;
  getCompanyById: (id: number) => Promise<void>;
  deleteCompany: (id: number) => Promise<boolean>;
  addCompany: (data: Company) => Promise<boolean>;
  editCompany: (inputData: Company) => Promise<boolean>;
};

interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyContext = createContext<CompanyContextType>(
  {} as CompanyContextType
);

const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clickedCompany, setClickedCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  const { get, del, post, put } = useHttp();
  const navigate = useNavigate();

  const handleCompanyDashboardOpen = (company: Company) => {
    setClickedCompany(company);
    navigate(`/company/${company?.id}`);
  };

  const handleCompanyDashboardClose = () => {
    setClickedCompany(null);
    navigate("/bdm/companies");
  };

  const deleteCompany = async (id: number) => {
    let isSuccessful = false;
    if (!clickedCompany) return isSuccessful;
    await del(`/companies/:${id}`).then((res) => {
      if (res) {
        isSuccessful = true;
        handleCompanyDashboardClose();
        toast.success("Company deleted Successfully!");
      }
    });
    return isSuccessful;
  };

  const getCompanies = () => {
    get("/companies").then((res) => {
      if (res) {
        setCompanies(res.data);
        setIsLoading(false);
      }
    });
  };

  const getCompanyById = async (id: number) => {
    await get(`companies/${id}`).then((res) => {
      if (res) setClickedCompany(res.data);
    });
  };

  const addCompany = async (data: Company): Promise<boolean> => {
    let isSuccessful = false;

    await post("/companies", data).then((res) => {
      if (res) {
        isSuccessful = true;
        toast.success("Company created Successfully!");
        getCompanies();
      }
    });
    return isSuccessful;
  };

  const editCompany = async (inputData: Company): Promise<boolean> => {
    let isSuccessful = false;
    if (!clickedCompany) return isSuccessful;
    await put(`/companies/${clickedCompany.id}`, inputData).then((res) => {
      if (res) {
        isSuccessful = true;
        getCompanies();
        toast.success("Company edited Successfully!");
      }
    });
    return isSuccessful;
  };

  const value = {
    isLoading,
    clickedCompany,
    handleCompanyDashboardOpen,
    handleCompanyDashboardClose,
    companies,
    getCompanies,
    getCompanyById,
    deleteCompany,
    addCompany,
    editCompany
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};

export default CompanyProvider;
