import React, { useMemo } from "react";
import { useInvoice } from "../../hooks/contextHooks";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import { theme } from "../../styles/Theme";
import { CenteredTableCell } from "../../styles/styled components/CenteredTableCell";
import { useTable, useSortBy } from "react-table";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore
} from "@mui/icons-material";

const InvoiceList = () => {
  const {
    handleInvoiceModalOpen,
    filteredInvoices,
    clearFilters,
    filters,
    handleChangeFilters
  } = useInvoice();

  const columns = useMemo(
    () => [
      {
        Header: "Client",
        accessor: "client.name"
      },
      {
        Header: "Created On",
        accessor: "createdAt"
      },
      {
        Header: "Due Date",
        accessor: "dueDate"
      },
      {
        Header: "Amount",
        accessor: "amountWithVat"
      },
      {
        Header: "Payment Type",
        accessor: "paymentType"
      },
      {
        Header: "Paid On",
        accessor: "paymentMadeOn"
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: filteredInvoices
      },
      useSortBy
    );

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ margin: "0 auto", marginBottom: 3, width: "80%" }}
      >
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow
              {...headerGroups[0].getHeaderGroupProps()}
              style={{
                cursor: "pointer",
                backgroundColor: theme.palette.primary.light
              }}
            >
              {headerGroups[0].headers.map((column: any, index: number) => {
                return (
                  <CenteredTableCell
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <span>{column.render("Header")}</span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <KeyboardArrowDown fontSize="small" />
                        ) : (
                          <KeyboardArrowUp fontSize="small" />
                        )
                      ) : (
                        <UnfoldMore fontSize="small" />
                      )}
                    </Box>
                  </CenteredTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row: any, index: number) => {
              prepareRow(row);
              return (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleInvoiceModalOpen(row.original)}
                  style={{ cursor: "pointer" }}
                >
                  {row.cells.map((cell: any, index: number) => {
                    if (cell.value === null)
                      return (
                        <CenteredTableCell {...cell.getCellProps()} key={index}>
                          {"Not Paid"}
                        </CenteredTableCell>
                      );
                    return (
                      <CenteredTableCell {...cell.getCellProps()} key={index}>
                        {cell.render("Cell")}
                      </CenteredTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display="flex"
        justifyContent="center"
        marginBottom={7}
        gap={2}
        alignItems="center"
      >
        <TextField
          label="Start Date"
          type="date"
          size="small"
          value={filters?.startDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            handleChangeFilters({ startDate: new Date(e.target.value) })
          }
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          value={filters?.endDate?.toISOString().split("T")[0] || ""}
          onChange={(e) =>
            handleChangeFilters({ endDate: new Date(e.target.value) })
          }
          InputLabelProps={{
            shrink: true
          }}
        />
        {/* <Button
          variant="contained"
          onClick={() => applyFilters(startDate, endDate)}
        >
          Apply Filters
        </Button> */}
        <Button variant="contained" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceList;
