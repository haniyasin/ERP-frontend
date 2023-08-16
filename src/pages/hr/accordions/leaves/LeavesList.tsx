import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useUser } from '../../../../hooks/contextHooks';
import { Leave } from '../../../../interfaces/Leave';
import FileDisplay from '../../../../common/FileDisplay';
import { formatDateToLocaleTime } from '../../../../utils/formatDataToLocaleTime';

const LeavesList = () => {
  const { openedEmployee } = useUser();
  
  return (
    <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {openedEmployee.leaves!==null && openedEmployee.leaves.map((leave: Leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.id}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>
                    <FileDisplay
                      fileBuffer={leave.document}
                      fileName={`leave${leave.id}`}
                      fileType={'.pdf'}/>
                  </TableCell>
                  <TableCell>{formatDateToLocaleTime(leave.startDate)}</TableCell>
                  <TableCell>{formatDateToLocaleTime(leave.endDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default LeavesList;