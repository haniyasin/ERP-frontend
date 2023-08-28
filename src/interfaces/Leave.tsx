import { User } from "./User";

export interface Leave {
  id: number;
  startDate: Date;
  endDate: Date;
  type: string;
  document: any;
  user: User;
}

export enum LeaveType {
  SICK = "Sick",
  PAID = "Paid",
  UNPAID = "Unpaid",
  PARENTAL = "Parental",
  OTHER = "Other"
}

export const leaves: LeaveType[] = [
  LeaveType.SICK,
  LeaveType.PAID,
  LeaveType.UNPAID,
  LeaveType.PARENTAL,
  LeaveType.OTHER
];
