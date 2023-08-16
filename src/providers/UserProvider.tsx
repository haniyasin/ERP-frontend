import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { User } from "../interfaces/User";
import { toast } from "react-toastify";

interface DeleteInformationProps {
  email: string, reason: string, document: Buffer | null
}

export type UserContextType = {
  userExists: boolean | null;
  isLoading: boolean,
  openedEmployee: User | null,
  handleEmployeeDashboardOpen: (employee: User) => void,
  handleEmployeeDashboardClose: () => void,
  employees: User[],
  getEmployees: () => void,
  getEmployeeById: (id: number) => Promise<User>,
  deleteEmployee: (deleteInformation: DeleteInformationProps) => Promise<User | null>,
  editEmployee: (employee: User) => Promise<User | null>,
  changeUserPicture: (data: Buffer) => Promise<User | null>,
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

const UserProvider = ({ children }: UserProviderProps) => {
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openedEmployee, setOpenedEmployee] = useState<User | null>(null);
  const [employees, setEmployees] = useState<User[]>([]);

  const { get, put } = useHttp();
  const navigate = useNavigate();

  const handleEmployeeDashboardOpen = (employee: User) => {
    setOpenedEmployee(employee);
    navigate(`/employee-dashboard/${employee.id}`);
  }

  const handleEmployeeDashboardClose = () => {
    setOpenedEmployee(null);
    navigate("/hr");
  }

  const getEmployees = async () => {
    get("/users")
    .then(res => {
      if(res) {
        const employeeList = res.data
            .sort((a: User, b: User) => a.id - b.id);
            setEmployees(employeeList);
      }
    })
  }

  const getEmployeeById = async (id: number) => {
    return await get(`users/userById/${id}`)
            .then(res => {
              if(res.data !== "")
                setOpenedEmployee(res.data);
              return res;
            })
  }

  const deleteEmployee = async (deleteInformation: DeleteInformationProps) => {
    if(!openedEmployee) return null;
    return await put("/users", deleteInformation, 'multipart/form-data')
      .then(res => {
        if(res) {
          handleEmployeeDashboardClose();
          return res;
        }
      })
  }

  const editEmployee = async (inputData: User) => {
    if(!openedEmployee) return null;
    return await put(`users/${openedEmployee.id}`, inputData)
    .then(res => {
      if(res) {
        getEmployees();
        toast.success("Successfully edited Employee!");
        return res;
      }
    })
  }

  const changeUserPicture = async (data: any) => {
    if(!openedEmployee) return null;
    return await put(`users/picture/${openedEmployee.id}`, data, 'multipart/form-data')
      .then(res => {
        if(res) {
          getEmployees();
          toast.success("Successfully edited Employee!");
          return res;
        }
      })
  }

  useEffect(() => {
    get("/users/isDBEmpty")
      .then(res => {
        if(res && res.data === true) {
          setUserExists(false);
          navigate('/register');
        } else {
          setUserExists(true);
        };
      })
      .catch(err => {
        if(err.response?.data) {
          alert(`Error code: ${err.response.data.statusCode} - ${err.response.data.message}`)
          navigate("/error");
        }
      })
      .finally(() => {
          setIsLoading(false);
      });
      // eslint-disable-next-line
  }, []);

  const value = {
    userExists,
    isLoading,
    openedEmployee,
    handleEmployeeDashboardOpen,
    handleEmployeeDashboardClose,
    employees,
    getEmployees,
    getEmployeeById,
    deleteEmployee,
    editEmployee,
    changeUserPicture,
  };

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
