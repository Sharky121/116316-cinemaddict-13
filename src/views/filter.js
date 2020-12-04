// Возвращает строку str с заглавным первым символом.
const uppFirst = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;

  return name === `all`
    ? `<a href="#${name}" class="main-navigation__item main-navigation__item--active">${uppFirst(name)} movies</a>`
    : `<a href="#${name}" class="main-navigation__item">${uppFirst(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
