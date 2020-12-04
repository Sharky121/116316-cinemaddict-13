export const createFilmsList = (title, isExtra = false) => {
  const extraClass = isExtra
    ? `films-list--extra`
    : ``;

  const titleClass = isExtra
    ? ``
    : `visually-hidden`;

  return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${titleClass}">${title}</h2>
    <div class="films-list__container"></div>
  </section>`;
};
