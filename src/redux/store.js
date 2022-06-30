import { configureStore } from '@reduxjs/toolkit';

import parkingSpots from './parkingSpotsSlice';

export default configureStore({
  reducer: {
    parkingSpots,
  },
});
