import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 0, label: 'Emerald' },
  { id: 1, label: 'Ruby' },
  { id: 2, label: 'Pearl' },
];

const entranceSlice = createSlice({
  name: 'parkingEntrance',
  initialState,
  reducers: {
    addEntrance: (state, action) => {
      const newEntrance = {
        id: state.length,
        label: action.payload,
      };
      state.push(newEntrance);
    },
  },
});

export default entranceSlice.reducer;

export const { addEntrance } = entranceSlice.actions;
export const getParkingEntrance = (state) => state.parkingEntrance;
