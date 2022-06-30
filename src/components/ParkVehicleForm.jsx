import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';

import usePrepareParkData from '../helpers/usePrepareParkData';
import { park } from '../redux/parkingSpotsSlice';
import { parkEntranceOptions, sizeOptions } from '../constants';
import DialogPark from './DialogPark';

function ParkVehicleForm() {
  const dispatch = useDispatch();
  const prepareParkData = usePrepareParkData();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [plateNo, setPlateNo] = useState('');
  const [size, setSize] = useState(null);
  const [parkEntrance, setParkEntrance] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const sizeId = size.id;
    const parkEntranceId = parkEntrance.id;
    const data = prepareParkData({ plateNo, sizeId, parkEntranceId });

    dispatch(park(data));
    setDialogData(data);
    setOpenDialog(true);

    setPlateNo('');
    setSize(null);
    setParkEntrance(null);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing="2em" alignItems="center" mt="2em">
          <TextField
            value={plateNo}
            onChange={(e) => setPlateNo(e.target.value)}
            label="Plate No."
            size="small"
            required
          />

          <Autocomplete
            value={size}
            options={sizeOptions}
            onChange={(_, newValue) => setSize(newValue)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField
                {...params} // eslint-disable-line
                label="Vehicle Size"
                size="small"
                required
              />
            )}
          />

          <Autocomplete
            value={parkEntrance}
            options={parkEntranceOptions}
            onChange={(_, newValue) => setParkEntrance(newValue)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField
                {...params} // eslint-disable-line
                label="Parking Entrance"
                size="small"
                required
              />
            )}
          />

          <Button variant="contained" type="submit">
            Park Vehicle
          </Button>
        </Stack>
      </form>

      {openDialog && <DialogPark setOpen={setOpenDialog} data={dialogData} />}
    </>
  );
}

export default ParkVehicleForm;
