import {RenderPosition, FilmSection} from "./const";
import {getRandomInteger} from "./utils";
import {render} from "./utils/render";
import {createProfileTemplate} from "./views/profile";
import {createFilterTemplate} from "./views/menu";
import {createSortTemplate} from "./views/sort";
import {createFilmsBoardTemplate} from "./views/films";
import {createFilmsList} from "./views/films-list";
import {createFilmCardTemplate} from "./views/film-card";
import {createShowMoreButtonTemplate} from "./views/show-more-button";
import {createFooterStatsElement} from "./views/footer-stats";
import {createFilmDetailsPopup} from "./views/film-details-popup";
import {generateFilmCard} from "./mock/film-card";
import {generateMenu} from "./mock/menu";

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;

// Генерируем массив карточек фильма
const filmCards = new Array(FILMS_COUNT).fill().map(generateFilmCard);

// Создаем массив с данными для фильтра
const menu = generateMenu(filmCards);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// Рендер пользователя
render(siteHeaderElement, createProfileTemplate(), RenderPosition.BEFOREEND);

// Рендер меню
render(siteMainElement, createFilterTemplate(menu), RenderPosition.AFTERBEGIN);

const siteMenuElement = document.querySelector(`.main-navigation`);

// Рендер сортировки
render(siteMenuElement, createSortTemplate(), RenderPosition.AFTEREND);

// Рендер основного борда под фильмы
render(siteMainElement, createFilmsBoardTemplate(), RenderPosition.BEFOREEND);

const siteFilmsElement = document.querySelector(`.films`);

// Рендер секции фильмов
render(siteFilmsElement, createFilmsList(FilmSection.ALL), RenderPosition.AFTERBEGIN);
render(siteFilmsElement, createFilmsList(FilmSection.TOP), RenderPosition.BEFOREEND);
render(siteFilmsElement, createFilmsList(FilmSection.MOST_COMMENTED), RenderPosition.BEFOREEND);

const siteFilmsListContainerElement = document.querySelectorAll(`.films-list__container`);

const [allMoviesContainer, topRatedContainer, mostCommentedContainer] = siteFilmsListContainerElement;

// Рендер секции All movies
for (let i = 0; i < Math.min(filmCards.length, FILMS_COUNT_PER_STEP); i++) {
  render(allMoviesContainer, createFilmCardTemplate(filmCards[i]), RenderPosition.BEFOREEND);
}

if (filmCards.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  // Рендер кнопки показать еще
  render(allMoviesContainer, createShowMoreButtonTemplate(), RenderPosition.AFTEREND);

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    filmCards
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((filmCard) => render(allMoviesContainer, createFilmCardTemplate(filmCard), RenderPosition.BEFOREEND));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

const topRatedFilms = filmCards.sort((a, b) => b.rate - a.rate).slice(0, FILMS_EXTRA_COUNT);

// Рендер секции Top rated
for (let i = 0; i < topRatedFilms.length; i++) {
  render(topRatedContainer, createFilmCardTemplate(topRatedFilms[i]), RenderPosition.BEFOREEND);
}

const topCommentedFilms = filmCards.sort((a, b) => b.comments.length - a.comments.length).slice(0, FILMS_EXTRA_COUNT);

// Рендер секции Most commented
for (let i = 0; i < topCommentedFilms.length; i++) {
  render(mostCommentedContainer, createFilmCardTemplate(topCommentedFilms[i]), RenderPosition.BEFOREEND);
}

// Рендер статистики в футере
render(siteFooterElement, createFooterStatsElement(), RenderPosition.BEFOREEND);

// Рендер попапа с информацией о фильме
const openPopup = () => {
  render(siteFooterElement, createFilmDetailsPopup(filmCards[0]), RenderPosition.AFTEREND);
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
