import React, { useCallback, useState } from "react";
import { useCandidate, usePosition } from "../../../../hooks/contextHooks";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Candidate } from "../../../../interfaces/Candidate";
import CandidateModal from "./CandidateModal";

const CandidatesList = () => {
  const { clickedPosition } = usePosition();
  const { handleCandidateModalOpen } = useCandidate();
  const [isCandidateModalOpen, setIsCandidateModalOpen] =
    useState<boolean>(false);

  const handleCandidateClick = (candidate: Candidate) => {
    handleCandidateModalOpen(candidate);
    setIsCandidateModalOpen(true);
  };

  const getTableCells = useCallback((candidate: Candidate) => {
    return Object.entries(candidate).map(([key, value]) => {
      if (key === "id" || key === "position") return null;
      return <TableCell key={key}>{value}</TableCell>;
    });
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Applied On</TableCell>
            <TableCell>Accepted On</TableCell>
            <TableCell>Staus</TableCell>
            <TableCell>CV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clickedPosition &&
            clickedPosition?.candidates &&
            clickedPosition?.candidates.map((candidate: Candidate) => (
              <TableRow
                key={candidate.id}
                hover
                onClick={() => handleCandidateClick(candidate)}
                style={{ cursor: "pointer" }}
              >
                {getTableCells(candidate)}
              </TableRow>
            ))}
        </TableBody>
        {isCandidateModalOpen && (
          <CandidateModal
            closeCandidateModal={() => setIsCandidateModalOpen(false)}
            isCandidateModalOpen={isCandidateModalOpen}
          />
        )}
      </Table>
    </TableContainer>
  );
};

export default CandidatesList;
