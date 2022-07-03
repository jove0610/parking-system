import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { IconButton, Tooltip } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HelpIcon from '@mui/icons-material/Help';

import { getParkingEntrance } from '../../redux/parkingEntranceSlice';
import { getParkingSpots, unpark } from '../../redux/parkingSpotsSlice';
import { sizeOptions } from '../../constants';
import prepareUnparkData from '../../helpers/prepareUnparkData';
import DialogUnpark from './DialogUnpark';

const useRows = () => {
  const parkingEntrance = useSelector(getParkingEntrance);
  const parkingSpots = useSelector(getParkingSpots);

  // Used to display the size label given the size id
  const sizes = (() => {
    const output = {};
    sizeOptions.forEach((option) => {
      output[option.id] = option.label;
    });
    return output;
  })();

  const rows = parkingSpots.map((spot) => {
    const row = {
      action: spot,
      id: spot.id,
      parkSize: sizes[spot.sizeId],
      plateNo: '',
      startTime: '',
    };

    if (spot.isActive) {
      row.plateNo = spot.plateNo;
      row.startTime = dayjs(spot.startTime).format('h:mm A');
    }

    parkingEntrance.forEach((item, index) => {
      row[String(item.id)] = spot.distances[index];
    });

    return row;
  });

  return rows;
};

function ParkingSpotsTable() {
  const dispatch = useDispatch();
  const rows = useRows();
  const [pageSize, setPageSize] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const parkingEntrance = useSelector(getParkingEntrance);

  const onClickDel = (parkingSpot) => {
    const data = prepareUnparkData(parkingSpot);
    dispatch(unpark(data));
    setDialogData(data);
    setOpenDialog(true);
  };

  const columns = (() => {
    const output = [
      {
        field: 'action',
        headerName: 'Action',
        minWidth: 70,
        flex: 0.5,
        sortable: false,
        renderCell: (params) => (
          <>
            {params.value.isActive && (
              <Tooltip title="Unpark vehicle" arrow>
                <IconButton
                  onClick={() => onClickDel(params.value)}
                  sx={{ p: 0 }}
                >
                  <RemoveCircleIcon sx={{ color: red[500] }} />
                </IconButton>
              </Tooltip>
            )}
            {!params.isActive && <>&nbsp;</>}
          </>
        ),
      },
      { field: 'id', headerName: 'Parking No.', minWidth: 120, flex: 1 },
      { field: 'parkSize', headerName: 'Parking Size', minWidth: 120, flex: 1 },
      { field: 'plateNo', headerName: 'Plate No.', minWidth: 120, flex: 1 },
      { field: 'startTime', headerName: 'Start Time', minWidth: 150, flex: 2 },
    ];

    parkingEntrance.forEach((item) => {
      output.push({
        field: String(item.id),
        headerName: item.label,
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
          <>
            <Tooltip title="Distance from the entrance." arrow>
              <HelpIcon sx={{ color: grey[500], fontSize: '1.3rem' }} />
            </Tooltip>
            &nbsp; &nbsp;
            {params.value}
          </>
        ),
      });
    });

    return output;
  })();

  return (
    <div style={{ maxWidth: '90vw', overflowX: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[10, 15, 30]}
        sx={{
          background: '#fff',
          '$ .MuiDataGrid-sortIcon': {
            display: 'block',
            visibility: 'visible',
            color: 'red',
          },
        }}
      />

      {openDialog && <DialogUnpark setOpen={setOpenDialog} data={dialogData} />}
    </div>
  );
}

export default ParkingSpotsTable;
