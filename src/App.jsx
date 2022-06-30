import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from './redux/store';
import ParkVehicleForm from './components/ParkVehicleForm';

function App() {
  return (
    <ReduxProvider store={store}>
      <ParkVehicleForm />
    </ReduxProvider>
  );
}

export default App;
