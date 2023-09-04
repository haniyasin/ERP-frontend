import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useCallback } from "react";
import { useCompany } from "../../hooks/contextHooks";
import { Company } from "../../interfaces/Company";
import { formatHeaders } from "../../utils/formatHeaders";
import { CenteredTableCell } from "../../styles/styled components/CenteredTableCell";
import { theme } from "../../styles/Theme";

const CompanyList = () => {
  const { companies, handleCompanyDashboardOpen } = useCompany();

  const getColumnHeaders = useCallback(() => {
    if (companies.length === 0) return null;

    const company = companies[0];
    const formattedHeaders = formatHeaders(Object.keys(company));

    return formattedHeaders.map((key) => {
      if (key === "Positions") return null;
      if (key !== "Id" && key !== "Deleted At")
        return <CenteredTableCell key={key}>{key}</CenteredTableCell>;
    });
  }, [companies]);

  const getTableCells = useCallback((company: Company) => {
    return Object.entries(company).map(([key, value], index) => {
      if (key === "positions") return null;
      if (key === "projects" || key === "positions")
        return (
          <CenteredTableCell key={index}>{value.length}</CenteredTableCell>
        );

      if (key !== "id" && key !== "deletedAt")
        return <CenteredTableCell key={index}>{value}</CenteredTableCell>;
    });
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ margin: "0 auto", marginBottom: 10, width: "80%" }}
    >
      <Table>
        <TableHead>
          <TableRow
            style={{
              cursor: "pointer",
              backgroundColor: theme.palette.primary.light
            }}
          >
            {getColumnHeaders()}
          </TableRow>
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
