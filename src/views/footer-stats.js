import {FILMS_COUNT} from "../const";

const getNumberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
};

const count = getNumberWithSpaces(FILMS_COUNT);

export const createFooterStatsElement = () => {
  return `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`;
};
