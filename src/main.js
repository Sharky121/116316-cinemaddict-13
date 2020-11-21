import {createProfileTemplate} from "./views/profile";
import {createMenuTemplate} from "./views/menu";
import {createSortTemplate} from "./views/sort";
import {createFilmsBoardTemplate} from "./views/films";
import {createFilmsList} from "./views/films-list";
import {createFilmListExtra} from "./views/films-list-extra";
import {createFilmCardTemplate} from "./views/film-card";
import {createShowMoreButtonTemplate} from "./views/show-more-button";
import {createFooterStatsElement} from "./views/footer-stats";
import {createFilmDetailsPopup} from "./views/film-details-popup";

const FILMS_COUNT = 5;

// Функция рендера
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Рендер пользователя
render(siteHeaderElement, createProfileTemplate(), `beforeend`);

// Рендер меню
render(siteMainElement, createMenuTemplate(), `afterbegin`);

const siteMenuElement = document.querySelector(`.main-navigation`);

// Рендер сортировки
render(siteMenuElement, createSortTemplate(), `afterend`);

// Рендер основного контейнера под фильмы
render(siteMainElement, createFilmsBoardTemplate(), `beforeend`);

const siteFilmsElement = document.querySelector(`.films`);

// Рендер секции фильмов
render(siteFilmsElement, createFilmsList(), `afterbegin`);

const siteFilmsListContainerElement = document.querySelector(`.films-list__container`);

// Рендер карточек фильмов
for (let i = 0; i < FILMS_COUNT; i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(), `beforeend`);
}

// Рендер кнопки показать еще
render(siteFilmsListContainerElement, createShowMoreButtonTemplate(), `afterend`);

// Рендер секции Top rated
render(siteFilmsElement, createFilmListExtra(`Top rated`), `beforeend`);

// Рендер секции Most commented
render(siteFilmsElement, createFilmListExtra(`Most commented`), `beforeend`);

// Рендер статистики в футере
render(siteFooterElement, createFooterStatsElement(), `beforeend`);

// Рендер попапа с информацией о фильме
render(siteFooterElement, createFilmDetailsPopup(), `afterend`);
