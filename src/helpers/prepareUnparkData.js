import dayjs from 'dayjs';

const prepareUnparkData = (parkingSpot) => {
  const { sizeId, startTime } = parkingSpot;

  const endTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const totalHours = dayjs(endTime).diff(dayjs(startTime), 'h', true);

  const numDaysParked = Math.floor(totalHours / 24);
  const excessHours = Math.ceil(totalHours - 3);
  let totalAmountPaid = 40;
  if (excessHours > 0) {
    let multiplier = 20; // small

    // medium
    if (sizeId === 1) {
      multiplier = 60;
    }
    // large
    if (sizeId === 2) {
      multiplier = 100;
    }

    totalAmountPaid += excessHours * multiplier + numDaysParked * 5000;
  }

  // if vehicle came back within one hour after leaving
  // then deduct the previous amount paid
  const amount = totalAmountPaid - parkingSpot.totalAmountPaid;

  return {
    ...parkingSpot,
    endTime,
    totalAmountPaid,
    isActive: false,
    amount,
  };
};

export default prepareUnparkData;
