import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Stack } from '@mui/material';

import store from './redux/store';
import ParkVehicleForm from './components/ParkVehicleForm';
import ParkingSpotsTable from './components/ParkingSpotsTable';

function App() {
  const onClickDel = (data) => {
    console.log(data);
  };

  return (
    <ReduxProvider store={store}>
      <Stack spacing="3em" px="3em" pb="5em">
        <ParkVehicleForm />
        <ParkingSpotsTable onClickDel={onClickDel} />
      </Stack>
    </ReduxProvider>
  );
}

export default App;
