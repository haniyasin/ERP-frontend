import { Candidate } from "./Candidate";
import { Project } from "./Project";

export interface Position {
  id: number;
  name?: string;
  project?: Project;
  description?: string;
  candidate?: any;
}
