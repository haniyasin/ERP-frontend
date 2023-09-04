import Bdm from "../pages/bdm/BdmDashboard";
import Departments from "../pages/DepartmentDashboard";
import Fin from "../pages/fin/InvoiceDashboard";
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
    Element: Fin,
    allowedRoles: ["ADMIN", "FIN"]
  },
  {
    path: "/bdm",
    Element: Bdm,
    allowedRoles: ["ADMIN", "BDM"]
  },
  {
    path: "/position/:positionId",
    Element: PositionDashboard,
    allowedRoles: ["ADMIN", "HR"]
  },
  {
    path: "/employee/:employeeId",
    Element: EmployeeDashboard,
    allowedRoles: ["ADMIN", "HR"]
  },
  {
    path: "/company/:companyId",
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
