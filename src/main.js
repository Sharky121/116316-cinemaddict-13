import {createProfileTemplate} from "./views/profile";
import {createFilterTemplate} from "./views/filter";
import {createSortTemplate} from "./views/sort";
import {createFilmsBoardTemplate} from "./views/films";
import {createFilmsList} from "./views/films-list";
import {createFilmCardTemplate} from "./views/film-card";
import {createShowMoreButtonTemplate} from "./views/show-more-button";
import {createFooterStatsElement} from "./views/footer-stats";
import {createFilmDetailsPopup} from "./views/film-details-popup";
import {generateFilmCard} from "./mock/film-card";
import {generateFilter} from "./mock/filter";
import {getRandomInteger} from "./utils";

const FILMS_COUNT = 9;
const FILMS_EXTRA_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;
const FilmsContainer = {
  ALL: `All movies. Upcoming`,
  TOP: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

// Генерируем массив карточек фильма
const filmCards = new Array(FILMS_COUNT).fill(undefined).map(generateFilmCard);

// Создаем массив с данными для фильтра
const filters = generateFilter(filmCards);

// Функция рендера
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Рендер пользователя
render(siteHeaderElement, createProfileTemplate(), `beforeend`);

// Рендер меню
render(siteMainElement, createFilterTemplate(filters), `afterbegin`);

const siteMenuElement = document.querySelector(`.main-navigation`);

// Рендер сортировки
render(siteMenuElement, createSortTemplate(), `afterend`);

// Рендер основного борда под фильмы
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const siteFilmsElement = document.querySelector(`.films`);

// Рендер секции фильмов
render(siteFilmsElement, createFilmsList(FilmsContainer.ALL), `afterbegin`);
render(siteFilmsElement, createFilmsList(FilmsContainer.TOP, `isExtra`), `beforeend`);
render(siteFilmsElement, createFilmsList(FilmsContainer.MOST_COMMENTED, `isExtra`), `beforeend`);

const siteFilmsListContainerElement = document.querySelectorAll(`.films-list__container`);

const [allMoviesContainer, topRatedContainer, mostCommentedContainer] = siteFilmsListContainerElement;

// Рендер секции All movies
for (let i = 0; i < Math.min(filmCards.length, FILMS_COUNT_PER_STEP); i++) {
  render(allMoviesContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

if (filmCards.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  // Рендер кнопки показать еще
  render(allMoviesContainer, createShowMoreButtonTemplate(), `afterend`);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    filmCards
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((filmCard) => render(allMoviesContainer, createFilmCardTemplate(filmCard), `beforeend`));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

// Рендер секции Top rated
for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  render(topRatedContainer, createFilmCardTemplate(filmCards[getRandomInteger(0, filmCards.length - 1)]), `beforeend`);
}

// Рендер секции Most commented
for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  render(mostCommentedContainer, createFilmCardTemplate(filmCards[getRandomInteger(0, filmCards.length - 1)]), `beforeend`);
}

// Рендер статистики в футере
render(siteFooterElement, createFooterStatsElement(), `beforeend`);

// Рендер попапа с информацией о фильме
const openPopup = () => {
  render(siteFooterElement, createFilmDetailsPopup(filmCards[0]), `afterend`);
  siteBodyElement.classList.add(`hide-overflow`);

  const popupElement = document.querySelector(`.film-details`);
  const closePopupElement = popupElement.querySelector(`.film-details__close`);

  const closePopup = () => {
    popupElement.remove();
    siteBodyElement.classList.remove(`hide-overflow`);
    closePopupElement.removeEventListener(`click`, closePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  closePopupElement.addEventListener(`click`, closePopup);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const filmCardPoster = document.querySelectorAll(`.film-card__poster`);

filmCardPoster.forEach((element) =>{
  element.addEventListener(`click`, openPopup);
});
