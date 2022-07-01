import { configureStore } from '@reduxjs/toolkit';

import parkingSpots from './parkingSpotsSlice';
import parkingEntrance from './parkingEntranceSlice';

export default configureStore({
  reducer: {
    parkingSpots,
    parkingEntrance,
  },
});
