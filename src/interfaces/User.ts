import { Project } from "./Project";
import { Salary } from "./Salary";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  title?: string;
  departments?: number[];
  salary?: Salary;
  currentSalary?: Salary;
  isContractor?: boolean;
  role?: string;
  roleName?: string;
  picture?: any;
  net?: number;
  projects?: Project[];
  currentProject?: Project;
  gross?: number;
  leaveDaysLeft?: number;
  startDate: Date;
  document?: any;
  [key: string]:
    | string
    | boolean
    | string[]
    | Buffer
    | number[]
    | number
    | undefined
    | any;
}

export interface EmployeeDocument {
  id?: number;
  name?: string;
  dateOfUpload?: Date;
  documentType?: string;
  document: any;
  user?: User;
}
