import {createFilmCardTemplate} from "./film-card";

const FILMS_EXTRA_COUNT = 2;
let films = [];

for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  films.push(createFilmCardTemplate());
}

export const createFilmListExtra = (title) => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
      ${films.join(``)}
    </div>
  </section>`;
};
