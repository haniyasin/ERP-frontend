import React from "react";
import { useCallback } from "react";
import { usePosition } from "../../../hooks/contextHooks";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Position } from "../../../interfaces/Position";
import { theme } from "../../../styles/Theme";
import { CenteredTableCell } from "../../../styles/styled components/CenteredTableCell";

const PositionList = () => {
  const { handlePositionDashboardOpen, positions } = usePosition();

  const getColumnHeaders = useCallback(() => {
    if (positions.length === 0) return null;

    const position = positions[0];

    return Object.keys(position)
      .filter((key) => key !== "id")
      .map((key) => (
        <CenteredTableCell key={key}>
          {key[0].toUpperCase() + key.slice(1)}
        </CenteredTableCell>
      ));
  }, [positions]);

  const getTableCells = useCallback((position: Position) => {
    return Object.entries(position).map(([key, value]) => {
      if (key === "id") return null;
      if (key === "project" || key === "company")
        return <CenteredTableCell key={key}>{value?.name}</CenteredTableCell>;
      return <CenteredTableCell key={key}>{value}</CenteredTableCell>;
    });
  }, []);

  const handlePositionClick = (position: Position) => {
    handlePositionDashboardOpen(position);
  };

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
          {positions.map((position: Position) => (
            <TableRow
              key={position.name}
              hover
              onClick={() => handlePositionClick(position)}
              style={{ cursor: "pointer" }}
            >
              {getTableCells(position)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PositionList;
