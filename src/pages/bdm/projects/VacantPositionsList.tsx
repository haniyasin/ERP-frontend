import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useProject, usePosition } from "../../../hooks/contextHooks";
import { CenteredTableCell } from "../../../styles/styled components/CenteredTableCell";
import { formatHeaders } from "../../../utils/formatHeaders";
import { Position } from "../../../interfaces/Position";
import { theme } from "../../../styles/Theme";
import LoadingComponent from "../../../common/LoadingComponent";

const VacantPositionList = () => {
  const { positions, getPositionsByProject, isLoading } = usePosition();
  const { openedProject } = useProject();

  useEffect(() => {
    getPositionsByProject(openedProject.id);
  }, [openedProject.id]);

  const getColumnHeaders = useCallback(() => {
    if (positions.length === 0) return null;

    const position = positions[0];
    const formattedHeaders = formatHeaders(Object.keys(position));

    return formattedHeaders.map((key) => {
      if (key !== "Id" && key !== "Deleted At" && key !== "Is Vacant")
        return <CenteredTableCell key={key}>{key}</CenteredTableCell>;
    });
  }, [positions]);

  const getTableCells = useCallback((vacantPosition: Position) => {
    return Object.entries(vacantPosition).map(([key, value], index) => {
      if (key === "isVacant") return null;
      if (key === "projects")
        return (
          <CenteredTableCell key={index}>{value.length}</CenteredTableCell>
        );

      if (key === "company" || key === "project")
        return <CenteredTableCell key={key}>{value?.name}</CenteredTableCell>;

      if (key !== "id" && key !== "deletedAt")
        return <CenteredTableCell key={index}>{value}</CenteredTableCell>;
    });
  }, []);

  if (isLoading) return <LoadingComponent />;

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
            <TableRow key={position.name}>{getTableCells(position)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VacantPositionList;
