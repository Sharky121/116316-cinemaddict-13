import dayjs from "dayjs";
import {
  getRandomValueFromArray,
  getRandomArray,
  getRandomInteger,
  getRandomFloat,
  getRandomText,
  getDate
} from "../utils";

import {
  DESCRIPTION_TEMPLATE,
  FILM_NAMES,
  POSTERS,
  GENRES,
  DIRECTORS,
  WRITERS,
  ACTORS,
  COUNTRY,
  AGE,
  Date,
} from "../const";

import {generateNewComment} from "./comment";

// Возвращает случайную продолжительность фильма
const getRuntime = () => {
  const hour = getRandomInteger(0, 3);
  const minute = getRandomInteger(1, 59);

  return hour === 0
    ? dayjs().minute(minute).format(`m[m]`)
    : dayjs().hour(hour).minute(minute).format(`H[h] m[m]`);
};

export const generateFilmCard = () => {
  const comments = new Array(getRandomInteger(0, 5)).fill(`undefinded`).map(generateNewComment);

  return {
    poster: getRandomValueFromArray(POSTERS),
    title: getRandomValueFromArray(FILM_NAMES),
    originalTitle: getRandomValueFromArray(FILM_NAMES),
    rate: getRandomFloat(1, 9.9).toFixed(1),
    director: getRandomValueFromArray(DIRECTORS),
    writers: getRandomArray(WRITERS, getRandomInteger(3, WRITERS.length - 1)),
    actors: getRandomArray(ACTORS, getRandomInteger(3, ACTORS.length - 1)),
    date: getDate(Date.FILMS_DATE_FROM, Date.FILMS_DATE_TO),
    runtime: getRuntime(),
    country: getRandomValueFromArray(COUNTRY),
    genres: getRandomArray(GENRES, getRandomInteger(1, 3)),
    description: getRandomText(DESCRIPTION_TEMPLATE),
    comments,
    ageRating: getRandomValueFromArray(AGE),
    isFavorite: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    inWatchlist: Boolean(getRandomInteger()),
  };
};
