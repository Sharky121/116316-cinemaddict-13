import {getNumberWithSpaces} from "../utils";

const FILMS_COUNT = 10291;

export const createFooterStatsElement = () => {
  return (
    `<section class="footer__statistics">
      <p>${getNumberWithSpaces(FILMS_COUNT)} movies inside</p>
    </section>`
  );
};
