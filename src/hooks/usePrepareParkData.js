import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { getParkingSpots } from '../redux/parkingSpotsSlice';

const usePrepareParkData = () => {
  const parkingSpots = useSelector(getParkingSpots);

  const prepareParkData = ({ plateNo, sizeId, parkEntranceId }) => {
    const startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let isContinous = false;

    // check if vehicle is already parked
    const currentVehicleSpot = parkingSpots.find(
      (pSpot) => pSpot.plateNo === plateNo && pSpot.isActive
    );
    if (currentVehicleSpot !== undefined) {
      throw new Error('Plate no. already exist.');
    }

    // check if vehicle came back within one hour after leaving
    const oldData = parkingSpots.find(
      (pSpot) =>
        pSpot.plateNo === plateNo &&
        dayjs(startTime).diff(dayjs(pSpot.startTime), 'hour', true) <= 1
    );
    if (oldData !== undefined) {
      isContinous = true;
    }

    // filter the parking spots by size and isActive
    const filteredParkingSpots = parkingSpots.filter(
      (pSpot) => pSpot.sizeId >= sizeId && !pSpot.isActive
    );
    if (filteredParkingSpots.length === 0) {
      throw new Error('No parking spot available');
    }

    // sort the parking spots by distance from the parking entrance
    const sortedParkingSpots = filteredParkingSpots.sort(
      (a, b) => a.distances[parkEntranceId] - b.distances[parkEntranceId]
    );
    const [selectedParkingSpot] = sortedParkingSpots;

    return {
      ...selectedParkingSpot,
      plateNo,
      startTime,
      endTime: null,
      isActive: true,
      isContinous,
    };
  };

  return prepareParkData;
};

export default usePrepareParkData;
