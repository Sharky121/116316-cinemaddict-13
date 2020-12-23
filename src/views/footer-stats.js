import {getNumberWithSpaces} from "../utils/common";
import AbstractView from "./abstract";

const createFooterStatsElement = (count) => {
  return (
    `<section class="footer__statistics">
      <p>${getNumberWithSpaces(count)} movies inside</p>
    </section>`
  );
};

export default class SiteFooter extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterStatsElement(this._count);
  }
}
