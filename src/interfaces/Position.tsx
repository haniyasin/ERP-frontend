import { Candidate } from "./Candidate";

export interface Position {
  id: number;
  name?: string;
  project?: string;
  description?: string;
  candidate?: any;
}
