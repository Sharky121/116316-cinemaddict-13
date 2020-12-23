import {getRandomValueFromArray, getRandomArray, getRandomInteger, getRandomFloat, getRandomText} from "../utils/common";
import {getDateBetween, getRuntime} from "../utils/date";

const FILM_NAMES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`
];

const DESCRIPTION_TEMPLATE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Film-Noir`,
  `Mystery`
];

const DIRECTORS = [
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
  `Francis Ford Coppola`,
  `Ingmar Bergman`,
  `Woody Allen`,
  `Darren Aronofsky`,
  `Roman Polanski`
];

const WRITERS = [
  `Christopher Nolan`,
  `Joel Coen`,
  `Michael Mann`,
  `Frank Darabont`,
  `Sergio Leone`,
  `Wes Anderson`,
  `Damien Chazelle`,
  `Drew Goddard`,
  `Billy Wilder`,
  `Robert Towne`
];

const ACTORS = [
  `Jack Nicholson`,
  `Marlon Brando`,
  `Robert De Niro`,
  `Al Pacino`,
  `Daniel Day-Lewis`,
  `Dustin Hoffman`,
  `Tom Hanks`,
  `Anthony Hopkins`,
  `Paul Newman`,
  `Denzel Washington`
];

const COUNTRY = [
  `USA`,
  `Japan`,
  `Germany`,
  `Italy`,
  `France`,
  `Denmark`,
  `Russia`,
  `Norwegian`,
  `Sweden`,
  `Poland`
];

const AGE = [`0+`, `6+`, `12+`, `16+`, `18+`];

const Date = {
  FILMS_DATE_FROM: `1930`,
  FILMS_DATE_TO: `1980`,
};

import {generateNewComment} from "./comment";

export const generateFilmCard = () => {
  const comments = new Array(getRandomInteger(0, 5)).fill().map(generateNewComment);

  return {
    poster: getRandomValueFromArray(POSTERS),
    title: getRandomValueFromArray(FILM_NAMES),
    originalTitle: getRandomValueFromArray(FILM_NAMES),
    rate: getRandomFloat(1, 9.9).toFixed(1),
    director: getRandomValueFromArray(DIRECTORS),
    writers: getRandomArray(WRITERS, getRandomInteger(3, WRITERS.length - 1)),
    actors: getRandomArray(ACTORS, getRandomInteger(3, ACTORS.length - 1)),
    date: getDateBetween(Date.FILMS_DATE_FROM, Date.FILMS_DATE_TO),
    runtime: getRuntime(getRandomInteger(0, 3), getRandomInteger(1, 59)),
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
