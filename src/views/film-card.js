import {getRandomInteger} from "../utils";

const ACTIVE_CONTROL_CLASS = `film-card__controls-item--active`;

const getCutText = (text, limit = 139) => {
  return text.length > limit
    ? text.substring(0, limit) + `...`
    : text;
};

const isProperty = (property) => {
  return property ? ACTIVE_CONTROL_CLASS : ``;
};

export const createFilmCardTemplate = (filmCard) => {
  const {
    poster,
    title,
    rate,
    date,
    runtime,
    genres,
    description,
    isFavorite,
    isWatched,
    inWatchlist,
    comments
  } = filmCard;

  const genre = genres[getRandomInteger(0, genres.length - 1)];
  const cutDescription = getCutText(description);
  const releaseYear = date.format(`YYYY`);
  const favoriteClassName = isProperty(isFavorite);
  const watchedClassName = isProperty(isWatched);
  const watchlistClassName = isProperty(inWatchlist);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rate}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${cutDescription}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
