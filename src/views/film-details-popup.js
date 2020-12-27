import AbstractView from "./abstract";
import {formatCommentDate} from "../utils/date";

const createGenresTemplate = (genres) => {
  return genres
    .map((genre) => `<span class="film-details__genre">${genre}</span>`)
    .join(``);
};

const createCommentTemplate = (comment) => {
  const {text, emotion, author, date} = comment;

  const commentDate = formatCommentDate(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${commentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createFilmCardControlsTemplate = (cardControl) => {
  const {title, className, isActive} = cardControl;

  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isActive ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--${className}">${title}</label>`
  );
};

const createInfoTemplate = (filmInfo) => {
  const {term, cell} = filmInfo;

  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${term}</td>
      <td class="film-details__cell">${cell}</td>
    </tr>`
  );
};

const createFilmDetailsPopup = (filmCard) => {
  const {
    poster,
    title,
    originalTitle,
    rate,
    director,
    writers,
    actors,
    date,
    runtime,
    country,
    genres,
    description,
    ageRating,
    isFavorite,
    isWatched,
    inWatchlist,
    comments
  } = filmCard;

  const FILM_CARD_CONTROLS = [
    {
      title: `Add to watchlist`,
      className: `watchlist`,
      isActive: inWatchlist
    },
    {
      title: `Already watched`,
      className: `watched`,
      isActive: isWatched
    },
    {
      title: `Add to favorites`,
      className: `favorite`,
      isActive: isFavorite
    }
  ];

  const genreTitle = genres.length === 1 ? `Genre` : `Genres`;
  const releaseDate = date.format(`DD MMMM YYYY`);
  const genresTemplate = createGenresTemplate(genres);

  const FILM_INFO = [
    {
      term: `Director`,
      cell: director
    },
    {
      term: `Writers`,
      cell: writers.join(`, `)
    },
    {
      term: `Actors`,
      cell: actors.join(`, `)
    },
    {
      term: `Release Date`,
      cell: releaseDate
    },
    {
      term: `Runtime`,
      cell: runtime
    },
    {
      term: `Country`,
      cell: country
    },
    {
      term: genreTitle,
      cell: genresTemplate
    },
  ];

  const filmInfo = FILM_INFO.
    map((item) => createInfoTemplate(item))
    .join(``);

  const filmCardControl = FILM_CARD_CONTROLS
    .map((cardControl) => createFilmCardControlsTemplate(cardControl))
    .join(``);

  const commentsTemplate = comments
    .map((comment) => createCommentTemplate(comment))
    .join(``);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rate}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${filmInfo}
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
          <section class="film-details__controls">
            ${filmCardControl}
          </section>
        </div>

        <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsTemplate}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
    </section>`
  );
};

export default class Popup extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsPopup(this._filmCard);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  removeClickHandler() {
    this.getElement().removeEventListener(`click`, this._clickHandler);
    this._callback = {};
  }
}
