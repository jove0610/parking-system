import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { getParkingSpots, unpark } from '../../redux/parkingSpotsSlice';
import { getParkingEntrance } from '../../redux/parkingEntranceSlice';
import { sizeOptions } from '../../constants';
import prepareUnparkData from '../../helpers/prepareUnparkData';

import StyledTableCell from '../StyledTableCell';
import StyledTableRow from '../StyledTableRow';
import DialogUnpark from './DialogUnpark';
import TablePaginationActions from './TablePaginationActions';

function ParkingSpotsTable() {
  const dispatch = useDispatch();
  const parkingEntrance = useSelector(getParkingEntrance);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const parkingSpots = useSelector(getParkingSpots);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - parkingSpots.length) : 0;

  // Used to display the size label given the size id
  const sizes = (() => {
    const output = {};
    sizeOptions.forEach((option) => {
      output[option.id] = option.label;
    });
    return output;
  })();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClickDel = (parkingSpot) => {
    const data = prepareUnparkData(parkingSpot);
    dispatch(unpark(data));
    setDialogData(data);
    setOpenDialog(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell rowSpan={2} />
              <StyledTableCell rowSpan={2}>Parking No.</StyledTableCell>
              <StyledTableCell rowSpan={2}>Parking Size</StyledTableCell>
              <StyledTableCell rowSpan={2}>Plate No.</StyledTableCell>
              <StyledTableCell rowSpan={2}>Start Time</StyledTableCell>
              <StyledTableCell colSpan={parkingEntrance.length} align="center">
                Distance from
              </StyledTableCell>
            </StyledTableRow>

            <StyledTableRow>
              {parkingEntrance.map((option) => (
                <StyledTableCell key={nanoid()} align="right">
                  {option.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? parkingSpots.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : parkingSpots
            ).map((row) => (
              <StyledTableRow key={nanoid()}>
                <StyledTableCell component="th" scope="row">
                  {row.isActive && (
                    <IconButton onClick={() => onClickDel(row)} sx={{ p: 0 }}>
                      <RemoveCircleIcon sx={{ color: red[500] }} />
                    </IconButton>
                  )}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }}>
                  {sizes[row.sizeId]}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }}>
                  {row.isActive && row.plateNo}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }}>
                  {row.isActive && row.startTime && (
                    <>{dayjs(row.startTime).format('h:mm A')}</>
                  )}
                </StyledTableCell>
                {row.distances.map((distance) => (
                  <StyledTableCell key={nanoid()} align="right">
                    {distance}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}

            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </StyledTableRow>
            )}
          </TableBody>

          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                count={parkingSpots.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {openDialog && <DialogUnpark setOpen={setOpenDialog} data={dialogData} />}
    </>
  );
}

export default ParkingSpotsTable;
