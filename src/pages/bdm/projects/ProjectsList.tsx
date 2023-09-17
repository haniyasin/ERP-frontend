import React, { useCallback } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useProject } from "../../../hooks/contextHooks";
import { Project } from "../../../interfaces/Project";
import { formatHeaders } from "../../../utils/formatHeaders";
import { CenteredTableCell } from "../../../styles/styled components/CenteredTableCell";
import { theme } from "../../../styles/Theme";

const ProjectsList = () => {
  const { projects, handleProjectDashboardOpen } = useProject();

  const getColumnHeaders = useCallback(() => {
    if (projects.length === 0) return null;

    const project = projects[0];
    const formattedHeaders = formatHeaders(Object.keys(project));

    return formattedHeaders.map((key) => {
      if (key !== "Id" && key !== "Deleted At" && key !== "Open Positions")
        return <CenteredTableCell key={key}>{key}</CenteredTableCell>;
    });
  }, [projects]);

  const getTableCells = useCallback(
    (project: Project) => {
      if (projects.length === 0) return null;
      return Object.entries(project).map(([key, value], index) => {
        if (key === "openPositions") return null;
        if (key === "company")
          return (
            <CenteredTableCell key={index}>
              {value?.name ? value.name : "No Company"}
            </CenteredTableCell>
          );

        if (key === "isActive")
          return (
            <CenteredTableCell key={index}>
              {value ? "Yes" : "No"}
            </CenteredTableCell>
          );
        if (key === "positions" || key === "users")
          return (
            <CenteredTableCell key={index}>{value.length}</CenteredTableCell>
          );

        if (key !== "id" && key !== "deletedAt")
          return <CenteredTableCell key={index}>{value}</CenteredTableCell>;
      });
    },
    [projects]
  );

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
          {projects.map((project: Project) => (
            <TableRow
              key={project.name}
              hover
              onClick={() => handleProjectDashboardOpen(project)}
              style={{ cursor: "pointer" }}
            >
              {getTableCells(project)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsList;
