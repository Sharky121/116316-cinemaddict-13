import AbstractView from "./abstract";
import {getCapitalizeString} from "../utils/common";

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

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
