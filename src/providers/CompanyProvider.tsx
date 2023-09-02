import { ReactNode, createContext, useState } from "react";
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
  deleteCompany: (name: string) => void;
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
    navigate(`/company-dashboard/${company?.id}`);
  };

  const handleCompanyDashboardClose = () => {
    setClickedCompany(null);
    navigate("/bdm");
  };

  const deleteCompany = async (name: string) => {
    let isSuccessful = false;
    if (!clickedCompany) return isSuccessful;
    await del("/companies", { data: { name } }).then((res) => {
      if (res) {
        isSuccessful = true;
        handleCompanyDashboardClose();
      }
    });
  };

  const getCompanies = () => {
    get("/companies").then((res) => {
      if (res) {
        setCompanies(res.data);
        setIsLoading(false);
      }
    });
  };

  const addCompany = async (data: Company): Promise<boolean> => {
    let isSuccessful = false;

    await post("/companies/addCompany", data).then((res) => {
      if (res) {
        isSuccessful = true;
        toast.success("Company created Successfully!");
        getCompanies();
      }
    });
    return isSuccessful;
  };

  const editCompany = async (inputData: Company): Promise<boolean> => {
    let isSuccessfull = false;
    if (!clickedCompany) return isSuccessfull;
    await put(`companies/${clickedCompany.name}`, inputData).then((res) => {
      if (res) {
        isSuccessfull = true;
        getCompanies();
        toast.success("Successfully edited Company!");
      }
    });
    return isSuccessfull;
  };

  const value = {
    isLoading,
    clickedCompany,
    handleCompanyDashboardOpen,
    handleCompanyDashboardClose,
    companies,
    getCompanies,
    deleteCompany,
    addCompany,
    editCompany
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
};

export default CompanyProvider;
