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
    isActive: false, // if the parking spot is occupied
    isContinous: false, // if vehicle came back within one hour after leaving
  }));

  output = addDistanceFromParkEntrance(output); // for parking entrance 1
  output = addDistanceFromParkEntrance(output); // for parking entrance 2
  output = addDistanceFromParkEntrance(output); // for parking entrance 3

  return output;
})();

const parkingSpotsSlice = createSlice({
  name: 'parkingSpots',
  initialState,
  reducers: {},
});

export default parkingSpotsSlice.reducer;

export const getParkingSpots = (state) => state.parkingSpots;
