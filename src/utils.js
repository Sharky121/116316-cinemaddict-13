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
    .fill()
    .map(() => array[getRandomInteger(0, array.length - 1)]);
};

const getRandomText = (text, limit = 5) => {
  const sentences = text
    .split(`.`)
    .filter(String)
    .map((item) => item.trim());

  return new Array(getRandomInteger(1, limit))
    .fill()
    .map(() => sentences[getRandomInteger(1, sentences.length - 1)])
    .join(`. `);
};

const getCapitalizeString = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const getNumberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
};

const isProperty = (property, activeControlClass) => {
  return property ? activeControlClass : ``;
};

const getCutText = (text, limit = 139) => {
  return text.length > limit
    ? text.substring(0, limit) + `...`
    : text;
};

export {getRandomFloat, getRandomInteger, getRandomValueFromArray, getRandomArray, getRandomText, getCapitalizeString, getNumberWithSpaces, isProperty, getCutText};
