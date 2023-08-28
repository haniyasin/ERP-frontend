import React, { ReactNode, createContext, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { toast } from "react-toastify";
import { Department } from "../interfaces/Department";

interface Departments {
  departments: Department[];
  isDepartmentLoading: boolean;
  getDepartments: () => void;
}

interface DepartmentProviderProps {
  children: ReactNode;
}

export const DepartmentContext = createContext<Departments>({} as Departments);

const DepartmentProvider = ({ children }: DepartmentProviderProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDepartmentLoading, setIsDepartmentLoading] = useState<boolean>(true);

  const { get } = useHttp();

  const getDepartments = () => {
    setIsDepartmentLoading(true);
    get("/departments")
      .then((res) => {
        if (res) {
          setDepartments(res.data);
          setIsDepartmentLoading(false);
        }
      })
      .catch((err) => {
        toast.error(`Error: ${err}`);
        setIsDepartmentLoading(false);
      });
  };

  const value = {
    departments,
    isDepartmentLoading,
    getDepartments
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentProvider;
