import { Context, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { RoleContext } from "../providers/RoleProvider";
import { AuthContext } from "../providers/AuthProvider";
import { DepartmentContext } from "../providers/DepartmentProvider";
import { InvoiceContext } from "../providers/InvoiceProvider";
import { PositionContext } from "../providers/PositionProvider";
import { CandidateContext } from "../providers/CandidateProvider";
import { CompanyContext } from "../providers/CompanyProvider";
import { ProjectContext } from "../providers/ProjectProvider";
import { ClientContext } from "../providers/ClientProvider";

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

export const usePosition = () => {
  const context = useCustomContext(
    PositionContext,
    "usePosition must be used within an PositionProvider"
  );
  return context;
};

export const useCandidate = () => {
  const context = useCustomContext(
    CandidateContext,
    "useCandidate must be used within an CandidateProvider"
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

export const useCompany = () => {
  const context = useCustomContext(
    CompanyContext,
    "useCompany must be used within an CompanyProvider"
  );
  return context;
};

export const useProject = () => {
  const context = useCustomContext(
    ProjectContext,
    "useProject must be used within an ProjectProvider"
  );
  return context;
};

export const useInvoice = () => {
  const context = useCustomContext(
    InvoiceContext,
    "useInvoice must be used within an InvoiceProvider"
  );
  return context;
};

export const useClient = () => {
  const context = useCustomContext(
    ClientContext,
    "useClient must be used within an ClientProvider"
  );
  return context;
};
