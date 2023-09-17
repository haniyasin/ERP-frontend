import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import { User } from "../../interfaces/User";
import { Project } from "../../interfaces/Project";

interface ProjectsListProps {
  user: User;
}

const ProjectsList = ({ user }: ProjectsListProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Open Positions</TableCell>
            <TableCell>Is Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user?.projects &&
            user?.projects !== null &&
            user.projects.map((project: Project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.openPositions}</TableCell>
                <TableCell>{project.isActive ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsList;
