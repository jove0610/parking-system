import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import usePrepareParkData from '../helpers/usePrepareParkData';
import { park } from '../redux/parkingSpotsSlice';
import { parkEntranceOptions, sizeOptions } from '../constants';
import DialogPark from './DialogPark';

function ParkVehicleForm() {
  const dispatch = useDispatch();
  const prepareParkData = usePrepareParkData();
  const [errMessage, setErrMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [plateNo, setPlateNo] = useState('');
  const [size, setSize] = useState(null);
  const [parkEntrance, setParkEntrance] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const sizeId = size.id;
    const parkEntranceId = parkEntrance.id;

    let data;
    try {
      data = prepareParkData({ plateNo, sizeId, parkEntranceId });
    } catch (err) {
      setErrMessage(err.message);
      return;
    }
    dispatch(park(data));

    setDialogData(data);
    setOpenDialog(true);

    setPlateNo('');
    setSize(null);
    setParkEntrance(null);
    setErrMessage('');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Paper
          elevation={4}
          sx={{ width: 'fit-content', p: '2em', mt: '2em', mx: 'auto' }}
        >
          <Stack spacing="2em" alignItems="center">
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

            <Stack spacing="0.5em" alignItems="center">
              <Button variant="contained" type="submit">
                Park Vehicle
              </Button>

              {errMessage && (
                <Typography color="red" fontWeight="bold">
                  {errMessage}
                </Typography>
              )}
              {!errMessage && <>&nbsp;</>}
            </Stack>
          </Stack>
        </Paper>
      </form>

      {openDialog && <DialogPark setOpen={setOpenDialog} data={dialogData} />}
    </>
  );
}

export default ParkVehicleForm;
