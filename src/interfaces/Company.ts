import { Project } from "./Project";

export interface Company {
  id: number;
  name: string;
  description: string;
  contacts: string;
  projects: Project[];
  employeeSize: number;
  openPositions: number;
  relatedDocuments?: any;
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

export interface CompanyDocument {
  id?: number;
  name?: string;
  dateOfUpload?: string;
  document: any;
  Company?: Company;
}
