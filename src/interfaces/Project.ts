import { Company } from "./Company";

export interface Project {
  id: number;
  openPositions: number;
  name: string;
  description: string;
  company: Company;
}
