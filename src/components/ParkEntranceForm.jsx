import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';

import { addEntrance as addEntranceParkSpots } from '../redux/parkingSpotsSlice';
import { addEntrance } from '../redux/parkingEntranceSlice';

function ParkEntranceForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(addEntrance(name));
    dispatch(addEntranceParkSpots());

    setName('');
    setMessage('');
  };

  return (
    <form onSubmit={onSubmit}>
      <Paper
        elevation={4}
        sx={{ width: 'fit-content', p: '2em', mt: '2em', mx: 'auto' }}
      >
        <Stack spacing="2em" alignItems="center">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Entrance Name"
            size="small"
            required
          />

          <Stack spacing="0.5em" alignItems="center">
            <Button variant="contained" type="submit">
              Add New Entrance
            </Button>

            {message && <Typography fontWeight="bold">{message}</Typography>}
            {!message && <>&nbsp;</>}
          </Stack>
        </Stack>
      </Paper>
    </form>
  );
}

export default ParkEntranceForm;
