import { Box } from "@mui/material";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from "recharts";
import { useInvoice } from "../../../../hooks/contextHooks";
import { Invoice } from "../../../../interfaces/Invoice";

const RevenueChart = () => {
  const { invoices } = useInvoice();

  const expenseInvoices = invoices.filter(
    (invoice: Invoice) => invoice.paymentType === "Receivable"
  );

  const chartData = expenseInvoices
    .map((invoice: Invoice) => {
      return {
        date: invoice.createdAt,
        revenue: invoice.amountWithVat
      };
    })
    .sort(
      (
        a: { date: string | number | Date },
        b: { date: string | number | Date }
      ) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <LineChart
        width={700}
        height={350}
        data={chartData}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis>
          <Label value="Revenue (BGN)" angle={-89} position="insideLeft" />
        </YAxis>
        <Tooltip formatter={(value) => `BGN ${value}`} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" label="BGN" />
      </LineChart>
    </Box>
  );
};

export default RevenueChart;
