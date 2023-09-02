import React from "react";
import { useCallback } from "react";
import { usePosition } from "../../../hooks/contextHooks";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Position } from "../../../interfaces/Position";
import { theme } from "../../../styles/Theme";

const PositionList = () => {
  const { handlePositionDashboardOpen, positions } = usePosition();

  const getColumnHeaders = useCallback(() => {
    if (positions.length === 0) return null;

    const position = positions[0];

    return Object.keys(position)
      .filter((key) => key !== "id")
      .map((key) => <TableCell key={key}>{key}</TableCell>);
  }, [positions]);

  const getTableCells = useCallback((position: Position) => {
    return Object.entries(position).map(([key, value]) => {
      if (key === "id") return null;
      if (key === "project")
        return <TableCell key={key}>{value.name}</TableCell>;
      return <TableCell key={key}>{value}</TableCell>;
    });
  }, []);

  const handlePositionClick = (position: Position) => {
    handlePositionDashboardOpen(position);
  };

  return (
    <TableContainer component={Paper}>
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
