import Bdm from "../pages/bdm/BdmDashboard";
import Departments from "../pages/DepartmentDashboard";
import Finance from "../pages/fin/FinanceDashboard";
import Hr from "../pages/hr/HrDashboard";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Unauthorized from "../pages/Unauthorized";
import Admin from "../pages/admin/AdminDashboard";
import EmployeeDashboard from "../pages/hr/employees/EmployeeDashboard";
import PositionDashboard from "../pages/hr/PositionDashboard/PositionDashboard";
import CompanyDashboard from "../pages/bdm/CompanyDashboard";

export interface IRoute {
  path: string;
  Element: () => React.JSX.Element;
  allowedRoles: string[];
}

export const protectedRoutes: IRoute[] = [
  {
    path: "/",
    Element: Departments,
    allowedRoles: ["ADMIN", "EMPLOYEE", "HR", "FIN", "BDM"]
  },
  {
    path: "/admin",
    Element: Admin,
    allowedRoles: ["ADMIN"]
  },
  {
    path: "/hr",
    Element: Hr,
    allowedRoles: ["ADMIN", "HR"]
  },
  {
    path: "/fin",
    Element: Finance,
    allowedRoles: ["ADMIN", "FIN"]
  },
  {
    path: "/bdm",
    Element: Bdm,
    allowedRoles: ["ADMIN", "BDM"]
  },
  {
    path: "/position-dashboard/:positionId",
    Element: PositionDashboard,
    allowedRoles: ["ADMIN", "HR"]
  },
  {
    path: "/employee-dashboard/:employeeId",
    Element: EmployeeDashboard,
    allowedRoles: ["ADMIN", "HR"]
  },
  {
    path: "/company-dashboard/:companyId",
    Element: CompanyDashboard,
    allowedRoles: ["ADMIN", "BDM"]
  },
  {
    path: "/profile",
    Element: Profile,
    allowedRoles: ["ADMIN", "EMPLOYEE", "HR", "FIN", "BDM"]
  }
];

export const routes = [
  {
    path: "/unauthorized",
    Element: Unauthorized
  },
  {
    path: "*",
    Element: NotFound
  }
];
