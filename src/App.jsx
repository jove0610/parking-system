import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Box, Typography } from '@mui/material';

import store from './redux/store';

function App() {
  return (
    <ReduxProvider store={store}>
      <Box>
        <Typography variant="h2">Hello World</Typography>
      </Box>
    </ReduxProvider>
  );
}

export default App;
