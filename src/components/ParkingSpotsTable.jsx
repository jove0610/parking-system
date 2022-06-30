import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { red } from '@mui/material/colors';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { getParkingSpots } from '../redux/parkingSpotsSlice';
import { parkEntranceOptions, sizeOptions } from '../constants';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function ParkingSpotsTable({ onClickDel }) {
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell rowSpan={2} />
            <StyledTableCell rowSpan={2}>Parking No.</StyledTableCell>
            <StyledTableCell rowSpan={2}>Parking Size</StyledTableCell>
            <StyledTableCell rowSpan={2}>Plate No.</StyledTableCell>
            <StyledTableCell rowSpan={2}>Start Time</StyledTableCell>
            <StyledTableCell colSpan={3} align="center">
              Distance
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow>
            {parkEntranceOptions.map((option) => (
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
                  <>{dayjs(row.starTime).format('h:mm A')}</>
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
  );
}

ParkingSpotsTable.propTypes = {
  onClickDel: PropTypes.func.isRequired,
};

export default ParkingSpotsTable;
