import dayjs from 'dayjs';

export const getRelativeDayDifferenceToday = (number: number = 0) => {
  return dayjs().set('day', number);
};
