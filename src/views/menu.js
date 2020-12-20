import {getCapitalizeString} from "../utils";
import {createElement} from "../utils/render";

const createMenuItemTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">
      ${getCapitalizeString(name)}
      ${name === `all` ? `movies` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

const createMenuTemplate = (menuItems) => {
  const menuItemsTemplate = menuItems
    .map((menu) => createMenuItemTemplate(menu))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${menuItemsTemplate}
       </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
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
