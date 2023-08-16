import { Leave } from "../interfaces/Leave";

export const getLeaveDaysCount = (leave: Leave) => {
  const startDate = +new Date(leave.startDate);
  const endDate = +new Date(leave.endDate);
  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
}