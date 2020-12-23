import {isProperty, getCutText} from "../utils/common";
import AbstractView from "./abstract";

const ACTIVE_CONTROL_CLASS = `film-card__controls-item--active`;

const createFilmCardControls = (cardControl) => {
  const {title, className, isActive} = cardControl;
  const activeClass = isProperty(isActive, ACTIVE_CONTROL_CLASS);

  return (
    `<button class="film-card__controls-item button film-card__controls-item--${className} ${activeClass}" type="button">${title}</button>`
  );
};

const createFilmCardTemplate = (filmCard) => {
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

  const FILM_CARD_CONTROLS = [
    {
      title: `Add to watchlist`,
      className: `add-to-watchlist`,
      isActive: inWatchlist
    },
    {
      title: `Already watched`,
      className: `mark-as-watched`,
      isActive: isWatched
    },
    {
      title: `Add to favorites`,
      className: `favorite`,
      isActive: isFavorite
    }
  ];

  const filmCardControlsTemplate = FILM_CARD_CONTROLS
    .map((cardControl) => createFilmCardControls(cardControl))
    .join(``);

  const genre = genres[0];
  const cutDescription = getCutText(description);
  const releaseYear = date.format(`YYYY`);

  return (
    `<article class="film-card">
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
        ${filmCardControlsTemplate}
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    const PopupTriggerElements = [
      this.getElement().querySelector(`.film-card__poster`),
      this.getElement().querySelector(`.film-card__title`),
      this.getElement().querySelector(`.film-card__comments`)
    ];

    PopupTriggerElements.forEach((element) => {
      element.addEventListener(`click`, this._clickHandler);
    });
  }
}
