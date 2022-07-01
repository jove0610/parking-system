import React from 'react';
import { Stack } from '@mui/material';

import ParkEntranceForm from './components/ParkEntranceForm';
import ParkVehicleForm from './components/ParkVehicleForm';
import ParkingSpotsTable from './components/ParkingSpotsTable';

function App() {
  return (
    <Stack spacing="3em" px="3em" pb="5em">
      <Stack
        direction="row"
        spacing="2em"
        justifyContent="center"
        alignItems="center"
      >
        <ParkVehicleForm />
        <ParkEntranceForm />
      </Stack>

      <ParkingSpotsTable />
    </Stack>
  );
}

export default App;
