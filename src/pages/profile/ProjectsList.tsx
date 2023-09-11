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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Employee Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user?.projects &&
            user?.projects !== null &&
            user.projects.map((project: Project) => (
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
