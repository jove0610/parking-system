import { createSlice } from '@reduxjs/toolkit';

const numParkingSpot = 30;

const addDistanceFromParkEntrance = (parkingSpots) => {
  const newParkingSpots = parkingSpots;

  // create a shuffled array similar to this => [5, 3, 1, 0, 2]
  const shuffledArr = [...Array(numParkingSpot).keys()]
    .map((index) => ({ index, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.index);

  shuffledArr.forEach((shuffledIndex, index) => {
    newParkingSpots[index].distances.push(shuffledIndex + 1);
  });

  return newParkingSpots;
};

const initialState = (() => {
  let output = [...Array(numParkingSpot).keys()].map((_, index) => ({
    id: index + 1,
    sizeId: Math.floor(Math.random() * 3), // 0 = small, 1 = medium, 2 = large
    plateNo: null,
    startTime: null,
    endTime: null,
    distances: [],
    totalAmountPaid: 0,
    isActive: false, // if the parking spot is occupied
  }));

  output = addDistanceFromParkEntrance(output); // for parking entrance 1
  output = addDistanceFromParkEntrance(output); // for parking entrance 2
  output = addDistanceFromParkEntrance(output); // for parking entrance 3

  return output;
})();

const parkingSpotsSlice = createSlice({
  name: 'parkingSpots',
  initialState,
  reducers: {
    park: (state, action) => {
      const { payload } = action;
      const parkingSpot = state.find((pSpot) => pSpot.id === payload.id);
      parkingSpot.plateNo = payload.plateNo;
      parkingSpot.startTime = payload.startTime;
      parkingSpot.endTime = payload.endTime;
      parkingSpot.isActive = payload.isActive;
      parkingSpot.isContinous = payload.isContinous;
    },
    unpark: (state, action) => {
      const { payload } = action;
      const parkingSpot = state.find((pSpot) => pSpot.id === payload.id);
      parkingSpot.endTime = payload.endTime;
      parkingSpot.totalAmountPaid = payload.totalAmountPaid;
      parkingSpot.isActive = payload.isActive;
    },
  },
});

export default parkingSpotsSlice.reducer;

export const { park, unpark } = parkingSpotsSlice.actions;
export const getParkingSpots = (state) => state.parkingSpots;
