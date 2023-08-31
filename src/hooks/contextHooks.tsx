import { Context, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { RoleContext } from "../providers/RoleProvider";
import { AuthContext } from "../providers/AuthProvider";
import { DepartmentContext } from "../providers/DepartmentProvider";
import { FinanceContext } from "../providers/FinanceProvider";

const useCustomContext = (Context: Context<any>, errorMessage: string) => {
  const context = useContext(Context);

  if (!context) throw new Error(errorMessage);

  return context;
};

export const useUser = () => {
  const context = useCustomContext(
    UserContext,
    "useUser must be used within a UserProvider"
  );
  return context;
};

export const useRole = () => {
  const context = useCustomContext(
    RoleContext,
    "useRole must be used within a RoleProvider"
  );
  return context;
};

export const useAuth = () => {
  const context = useCustomContext(
    AuthContext,
    "useAuth must be used within an AuthProvider"
  );
  return context;
};

export const useDepartment = () => {
  const context = useCustomContext(
    DepartmentContext,
    "useDepartment must be used within an DepartmentProvider"
  );
  return context;
};

export const useFinance = () => {
  const context = useCustomContext(
    FinanceContext,
    "useFinance must be used within an FinanceProvider"
  );
  return context;
};
