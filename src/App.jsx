import React from 'react';
import { Stack } from '@mui/material';

import ParkVehicleForm from './components/ParkVehicleForm';
import ParkingSpotsTable from './components/ParkingSpotsTable';

function App() {
  const onClickDel = (data) => {
    console.log(data);
  };

  return (
    <Stack spacing="3em" px="3em" pb="5em">
      <ParkVehicleForm />
      <ParkingSpotsTable onClickDel={onClickDel} />
    </Stack>
  );
}

export default App;
