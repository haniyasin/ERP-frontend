import { Candidate } from "./Candidate";
import { Company } from "./Company";
import { Project } from "./Project";

export interface Position {
  id: number;
  name?: string;
  project?: Project;
  description?: string;
  company: Company;
  candidate?: any;
}
