import { useState, useEffect } from "react";
import { useInvoice } from "./contextHooks";

const useReport = () => {
  const [earliestCreateDate, setEarliestCreateDate] = useState<Date | null>(
    null
  );
  const [latestCreateDate, setLatestCreateDate] = useState<Date | null>(null);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  const { filteredInvoices, filters } = useInvoice();

  useEffect(() => {
    setEarliestCreateDate(null);
    setLatestCreateDate(null);
    setTotalRevenue(0);
    setTotalExpenses(0);

    let defaultEarliestCreateDate = new Date();
    let defaultLatestCreateDate = new Date();

    for (const invoice of filteredInvoices) {
      const createDate = new Date(invoice.createdAt);

      if (createDate < defaultEarliestCreateDate)
        defaultEarliestCreateDate = createDate;

      if (createDate > defaultLatestCreateDate)
        defaultLatestCreateDate = createDate;

      if (invoice.paymentType === "Payable") {
        setTotalExpenses((prevTotal) => prevTotal + invoice.amountWithVat);
      } else if (invoice.paymentType === "Receivable") {
        setTotalRevenue((prevTotal) => prevTotal + invoice.amountWithVat);
      }
    }

    setEarliestCreateDate(defaultEarliestCreateDate);
    setLatestCreateDate(defaultLatestCreateDate);
  }, [filteredInvoices]);

  return {
    startDate: filters?.startDate || earliestCreateDate,
    endDate: filters?.endDate || latestCreateDate,
    totalRevenue,
    totalExpenses,
    totalProfit: totalRevenue - totalExpenses
  };
};

export { useReport };
