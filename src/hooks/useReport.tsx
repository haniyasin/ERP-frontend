import { useState, useEffect } from "react";
import { useInvoice } from "./contextHooks";

const useReport = () => {
  const [earliestCreateDate, setEarliestCreateDate] = useState<Date | null>(
    null
  );
  const [latestCreateDate, setLatestCreateDate] = useState<Date | null>(null);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  const { invoices, filters } = useInvoice();

  useEffect(() => {
    setEarliestCreateDate(null);
    setLatestCreateDate(null);
    setTotalRevenue(0);
    setTotalExpenses(0);

    let defaultEarliestCreateDate = new Date();
    let defaultLatestCreateDate = new Date();

    for (const invoice of invoices) {
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
  }, [invoices]);

  return {
    startDate: !filters?.startDate ? earliestCreateDate : filters?.startDate,
    endDate: !filters?.endDate ? latestCreateDate : filters?.endDate,
    totalRevenue,
    totalExpenses,
    totalProfit: totalRevenue - totalExpenses
  };
};

export { useReport };
