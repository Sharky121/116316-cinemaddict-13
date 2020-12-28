import AbstractView from "./abstract";

const createFilmsList = (filmSection) => {
  const {title, isExtra, isHidden, isEmpty} = filmSection;

  return (
    `<section class="films-list ${isExtra ? `films-list--extra` : ``}">
      <h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${title}</h2>
      ${isEmpty ? `` : `<div class="films-list__container"></div>`}
    </section>`
  );
};

export default class FilmsList extends AbstractView {
  constructor(filmSection) {
    super();
    this._filmSection = filmSection;
  }

  getTemplate() {
    return createFilmsList(this._filmSection);
  }
}
