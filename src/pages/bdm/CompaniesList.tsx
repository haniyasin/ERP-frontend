import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useCallback } from "react";
import { useCompany } from "../../hooks/contextHooks";
import { Company } from "../../interfaces/Company";
import { formatHeaders } from "../../utils/formatHeaders";

const CompanyList = () => {
  const { companies, handleCompanyDashboardOpen } = useCompany();

  const getColumnHeaders = useCallback(() => {
    if (companies.length === 0) return null;

    const company = companies[0];

    const formattedHeaders = formatHeaders(Object.keys(company));

    return formattedHeaders.map((key) => (
      <TableCell key={key}>{key}</TableCell>
    ));
  }, [companies]);

  const getTableCells = useCallback((company: Company) => {
    return Object.values(company).map((value, index) => (
      <TableCell key={index}>{value}</TableCell>
    ));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{getColumnHeaders()}</TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company: Company) => (
            <TableRow
              key={company.name}
              hover
              onClick={() => handleCompanyDashboardOpen(company)}
              style={{ cursor: "pointer" }}
            >
              {getTableCells(company)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyList;
