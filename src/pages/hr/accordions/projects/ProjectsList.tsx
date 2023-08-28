import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import { useUser } from "../../../../hooks/contextHooks";
import { Project } from "../../../../interfaces/Project";

const ProjectsList = () => {
  const { openedEmployee } = useUser();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Employee Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {openedEmployee?.projects &&
            openedEmployee?.projects !== null &&
            openedEmployee.projects.map((project: Project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.openPositions}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsList;
