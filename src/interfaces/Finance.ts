import { Client } from "./Client";

export interface Finance {
  id: number;
  invoiceNumber: number;
  createdAt: string;
  paymentType: string;
  category: string;
  subcategory: string;
  client: string;
  notes: string;
  currency: string;
  amountWithVat: number;
  amountWithoutVat: number;
  vat: number;
  dueDate: string;
  paymentMadeOn: string;
  paymentMethod: string;
}

export interface FinanceSummary {
  id: number;
  invoiceNumber: number;
  paymentType: string;
  client: Client;
  amountWithVat: number;
  dueDate: string;
}
