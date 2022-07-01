import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { getParkingSpots } from '../redux/parkingSpotsSlice';

const usePrepareParkData = () => {
  const parkingSpots = useSelector(getParkingSpots);

  const prepareParkData = ({ plateNo, sizeId, parkEntranceId }) => {
    let startTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let totalAmountPaid = 0;

    // check if vehicle is already parked
    const currentVehicleSpot = parkingSpots.find(
      (pSpot) => pSpot.plateNo === plateNo && pSpot.isActive
    );
    if (currentVehicleSpot !== undefined) {
      throw new Error('Plate no. already exist.');
    }

    // check if vehicle came back within one hour after leaving
    // if true, then keep the totalAmountPaid and startTime
    const oldData = parkingSpots.filter(
      (pSpot) =>
        pSpot.plateNo === plateNo &&
        dayjs(startTime).diff(dayjs(pSpot.endTime), 'hour', true) <= 1
    );
    if (oldData.length !== 0) {
      const [sortedOldData] = oldData.sort(
        (a, b) => dayjs(b.endTime) - dayjs(a.endTime)
      );
      startTime = sortedOldData.startTime;
      totalAmountPaid = sortedOldData.totalAmountPaid;
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
      totalAmountPaid,
    };
  };

  return prepareParkData;
};

export default usePrepareParkData;
