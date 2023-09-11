import Bdm from "../pages/bdm/BdmDashboard";
import Departments from "../pages/DepartmentDashboard";
import Fin from "../pages/fin/InvoiceDashboard";
import HrEmployee from "../pages/hr/employees/HrEmployeesDashboard";
import HrPosition from "../pages/hr/positions/HrPositionsDashboard";
import NotFound from "../pages/NotFound";
import Profile from "../pages/profile/Profile";
import Unauthorized from "../pages/Unauthorized";
import Admin from "../pages/admin/AdminDashboard";
import EmployeeDashboard from "../pages/hr/employees/EmployeeDashboard";
import PositionDashboard from "../pages/hr/positions/PositionDashboard";
import CompanyDashboard from "../pages/bdm/CompanyDashboard";
import FinancialReport from "../pages/fin/reports/FinancialReport";

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
    path: "/hr/employees",
    Element: HrEmployee,
    allowedRoles: ["ADMIN", "HR"]
  },
  {
    path: "/hr/positions",
    Element: HrPosition,
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
    path: "/invoice-report",
    Element: FinancialReport,
    allowedRoles: ["ADMIN", "FIN"]
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
