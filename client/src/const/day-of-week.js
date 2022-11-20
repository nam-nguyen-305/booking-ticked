import dayjs from 'dayjs';

export const dayOfWeek = (totalDay) => {
  const dateTo = dayjs();
  const length = Array.from({ length: totalDay }, (_, i) => i + 1);

  let dayofweek = length.map((item, index) => {
    return dayjs(dateTo.add(index, 'day')).format('DD/MM');
  });
  return dayofweek;
};
