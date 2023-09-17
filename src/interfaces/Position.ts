import { Company } from "./Company";
import { Project } from "./Project";

export interface Position {
  id: number;
  name?: string;
  project?: Project;
  description?: string;
  isVacant: boolean;
  company: Company;
  candidate?: any;
}
