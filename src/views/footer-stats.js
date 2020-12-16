import {getNumberWithSpaces} from "../utils";
import {createElement} from "../utils/render";

const createFooterStatsElement = (count) => {
  return (
    `<section class="footer__statistics">
      <p>${getNumberWithSpaces(count)} movies inside</p>
    </section>`
  );
};

export default class SiteFooter {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemplate() {
    return createFooterStatsElement(this._count);
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
