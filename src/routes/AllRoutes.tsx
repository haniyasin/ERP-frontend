import Bdm from "../pages/BdmDashboard";
import Departments from "../pages/DepartmentDashboard";
import Finance from "../pages/FinanceDashboard";
import Hr from "../pages/hr/HrDashboard";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Unauthorized from "../pages/Unauthorized";
import Admin from "../pages/admin/AdminDashboard";
import EmployeeDashboard from "../pages/hr/EmployeeDashboard";

export interface IRoute {
  path: string,
  Element: () => React.JSX.Element,
  allowedRoles: string[],
}

export const protectedRoutes: IRoute[] = [
  {
      path: '/',
      Element: Departments,
      allowedRoles: ['ADMIN', 'EMPLOYEE', 'HR', 'FIN', 'BDM'],
  },
  {
      path: '/admin',
      Element: Admin,
      allowedRoles: ['ADMIN'],
  },
  {
      path: '/hr',
      Element: Hr,
      allowedRoles: ['ADMIN', 'HR'],
  },
  {
      path: '/fin',
      Element: Finance,
      allowedRoles: ['ADMIN', 'FIN'],
  },
  {
      path: '/bdm',
      Element: Bdm,
      allowedRoles: ['ADMIN', 'BDM'],
  },
  {
    path: '/employee-dashboard/:employeeId',
    Element: EmployeeDashboard,
    allowedRoles: ['ADMIN', 'HR'],
  },
  {
      path: '/profile',
      Element: Profile,
      allowedRoles: ['ADMIN','EMPLOYEE', 'HR', 'FIN', 'BDM'],
  },
];

export const routes = [
  {
      path: "/unauthorized",
      Element: Unauthorized,
  },
  {
      path: "*",
      Element: NotFound,
  },
];
