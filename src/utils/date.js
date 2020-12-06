import dayjs from "dayjs";

export const getDateBetween = (from, to) => {
  const fromMilli = dayjs(from).valueOf();
  const max = dayjs(to).valueOf() - fromMilli;

  const dateOffset = Math.floor(Math.random() * max + 1);

  const newDate = dayjs(fromMilli + dateOffset);

  return dayjs(newDate);
};

export const getCommentDate = (date) => {
  return getDateBetween(date, dayjs());
};

export const formatCommentDate = (date) => {
  const nowDate = dayjs();
  const diff = nowDate.diff(date, `day`);

  if (diff > 0 && diff <= 7) {
    return `${diff} ago`;
  } else if (diff === 0) {
    return `Today`;
  }

  return date.format(`YYYY/MM/DD HH:mm`);
};

export const getRuntime = (hours, minute) => {
  return hours === 0
    ? dayjs().minute(minute).format(`m[m]`)
    : dayjs().hour(hours).minute(minute).format(`H[h] m[m]`);
};
