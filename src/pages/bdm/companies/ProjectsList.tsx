import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useCallback } from "react";
import { useCompany } from "../../../hooks/contextHooks";
import { CenteredTableCell } from "../../../styles/styled components/CenteredTableCell";
import { formatHeaders } from "../../../utils/formatHeaders";
import { Project } from "../../../interfaces/Project";
import { theme } from "../../../styles/Theme";

const ProjectsList = () => {
  const { clickedCompany } = useCompany();

  const getColumnHeaders = useCallback(() => {
    if (clickedCompany.projects.length === 0) return null;

    const project = clickedCompany.projects[0];
    const formattedHeaders = formatHeaders(Object.keys(project));

    return formattedHeaders.map((key) => {
      if (key !== "Id" && key !== "Deleted At")
        return <CenteredTableCell key={key}>{key}</CenteredTableCell>;
    });
  }, [clickedCompany.projects]);

  const getTableCells = useCallback((vacantProject: Project) => {
    return Object.entries(vacantProject).map(([key, value], index) => {
      if (key === "users")
        return (
          <CenteredTableCell key={index}>{value.length}</CenteredTableCell>
        );

      if (key === "isActive")
        return (
          <CenteredTableCell key={key}>
            {value ? "Yes" : "No"}
          </CenteredTableCell>
        );

      if (key === "project" || key === "company")
        return <CenteredTableCell key={key}>{value?.name}</CenteredTableCell>;

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
          {clickedCompany.projects.map((project: Project) => (
            <TableRow key={project.name}>{getTableCells(project)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsList;
