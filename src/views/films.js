import AbstractView from "./abstract";

const createFilmsBoardTemplate = () => `<section class="films"></section>`;

export default class Board extends AbstractView {
  getTemplate() {
    return createFilmsBoardTemplate();
  }
}
