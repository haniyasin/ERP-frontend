import { User } from "./User";

export interface Salary {
  id?: number;
  net: number;
  gross: number;
  startDate: Date;
  document: any;
  user?: User;
}
