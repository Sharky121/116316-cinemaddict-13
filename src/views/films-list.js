import {createElement} from "../utils/render";

const createFilmsList = (filmSection) => {
  const {title, isExtra, isHidden, isEmpty} = filmSection;

  return (
    `<section class="films-list ${isExtra ? `films-list--extra` : ``}">
      <h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${title}</h2>
      ${isEmpty ? `` : `<div class="films-list__container"></div>`}
    </section>`
  );
};

export default class FilmsList {
  constructor(filmSection) {
    this._filmSection = filmSection;
    this._element = null;
  }

  getTemplate() {
    return createFilmsList(this._filmSection);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
