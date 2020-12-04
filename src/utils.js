import dayjs from "dayjs";

const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return lower + Math.random() * (upper - lower);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValueFromArray = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArray = (array, quantity) => {
  return new Array(quantity)
    .fill(undefined)
    .map(() => array[getRandomInteger(0, array.length - 1)]);
};

const getRandomText = (text, limit = 5) => {
  const sentences = text
    .split(`.`)
    .filter(String)
    .map((item) => item.trim());

  return new Array(getRandomInteger(1, limit))
    .fill(undefined)
    .map(() => sentences[getRandomInteger(1, sentences.length - 1)])
    .join(`. `);
};

const getDate = (from, to) => {
  const fromMilli = dayjs(from).valueOf();
  const max = dayjs(to).valueOf() - fromMilli;

  const dateOffset = Math.floor(Math.random() * max + 1);

  const newDate = dayjs(fromMilli + dateOffset);

  return dayjs(newDate);
};

export {getRandomFloat, getRandomInteger, getRandomValueFromArray, getRandomArray, getRandomText, getDate}
