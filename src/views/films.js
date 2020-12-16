import {createElement} from "../utils/render";

const createFilmsBoardTemplate = () => `<section class="films"></section>`;

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsBoardTemplate();
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
