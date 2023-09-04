import { Client } from "./Client";

export interface Invoice {
  id: number;
  invoiceNumber: number;
  createdAt: string;
  paymentType: string;
  category: string;
  subcategory: string;
  client: Client;
  notes: string;
  currency: string;
  amountWithVat: number;
  amountWithoutVat: number;
  vat: number;
  dueDate: string;
  paymentMadeOn: string | null;
  paymentMethod: string;
}

export interface InvoiceSummary {
  id: number;
  invoiceNumber: number;
  paymentType: string;
  client: Client;
  amountWithVat: number;
  dueDate: string;
}
