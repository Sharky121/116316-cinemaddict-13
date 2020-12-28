import {RenderPosition, FilmSection, FilmsCount, ESC_KEY} from "./const";
import {render, remove} from "./utils/render";
import SiteProfileView from "./views/profile";
import SiteMenuView from "./views/menu";
import SiteSortView from "./views/sort";
import FilmsBoardView from "./views/films";
import FilmsListView from "./views/films-list";
import FilmCardView from "./views/film-card";
import LoadMoreButton from "./views/show-more-button";
import SiteFooter from "./views/footer-stats";
import Popup from "./views/film-details-popup";
import {generateFilmCard} from "./mock/film-card";
import {generateMenu} from "./mock/menu";

// Генерируем массив карточек фильма
// Создаем массив с данными для меню
const filmCards = new Array(FilmsCount.ALL).fill().map(generateFilmCard);
const menu = generateMenu(filmCards);

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

// РЕНДЕР PROFILE
render(siteHeaderElement, new SiteProfileView());

// Создаем меню
const siteMenuElement = new SiteMenuView(menu);

// РЕНДЕР ЭЛЕМЕНТА МЕНЮ
render(siteMainElement, siteMenuElement, RenderPosition.AFTERBEGIN);

// MAIN КАРТОЧКИ ФИЛЬМОВ
// Рендер основного борда под фильмы
const siteFilmsBoard = new FilmsBoardView();
render(siteMainElement, siteFilmsBoard);

// Получаем экземпляры объектов для секций ALL, TOP, MOST_COMMENTED
const siteAllFilmSection = new FilmsListView(FilmSection.ALL);
const siteTopFilmSection = new FilmsListView(FilmSection.TOP);
const siteMostCommentedFilmSection = new FilmsListView(FilmSection.MOST_COMMENTED);
const siteNoFilmSection = new FilmsListView(FilmSection.EMPTY);

// ФУНКЦИЯ РЕНДЕРА КАРТОЧКИ ФИЛЬМА
const renderFilmCard = (filmsListContainer, filmCard) => {
  const filmComponent = new FilmCardView(filmCard);

  render(filmsListContainer, filmComponent);

  // ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
  const openPopup = () => {
    const popupElement = new Popup(filmCard);

    siteBodyElement.classList.add(`hide-overflow`);
    siteBodyElement.appendChild(popupElement.getElement());

    const closePopup = () => {
      siteBodyElement.classList.remove(`hide-overflow`);
      remove(popupElement);
      popupElement.removeClickHandler();
      document.removeEventListener(`keydown`, onPopupEscPress);
    };

    const onPopupEscPress = (evt) => {
      if (evt.key === ESC_KEY) {
        closePopup();
      }
    };

    document.addEventListener(`keydown`, onPopupEscPress);
    popupElement.setClickHandler(() => closePopup());
  };

  filmComponent.setClickHandler(() => openPopup());
};

// ФУНКЦИЯ РЕНДЕРА EXTRA СЕКЦИИ С ФИЛЬМАМИ
const renderExtraSection = (siteFilmSection, filmsListContainer) => {
  const {title} = siteFilmSection._filmSection;
  render(siteFilmsBoard, siteFilmSection);

  const sortFilms = (title === `Top rated`)
    ? [...filmCards].sort((a, b) => b.rate - a.rate).slice(0, FilmsCount.EXTRA)
    : [...filmCards].sort((a, b) => b.comments.length - a.comments.length).slice(0, FilmsCount.EXTRA);

  sortFilms.forEach((filmCard) => {
    renderFilmCard(filmsListContainer, filmCard);
  });
};

if (FilmsCount.ALL === 0) {
  render(siteFilmsBoard, siteNoFilmSection);
} else {
  // Рендерим секция под ALL FILMS
  render(siteFilmsBoard, siteAllFilmSection, RenderPosition.AFTERBEGIN);

  // РЕНДЕР МЕНЮ СОРТИРОВКИ
  render(siteMenuElement, new SiteSortView(), RenderPosition.AFTEREND);

  const filmsListContainer = siteAllFilmSection.getElement().querySelector(`.films-list__container`);

  // РЕНДЕР СЕКЦИИ ALL MOVIES
  for (let i = 0; i < Math.min(filmCards.length, FilmsCount.COUNT_PER_STEP); i++) {
    renderFilmCard(filmsListContainer, filmCards[i]);
  }

  // УСЛОВИЕ ДОПОКАЗА ФИЛЬМОВ
  if (filmCards.length > FilmsCount.COUNT_PER_STEP) {
    let renderedFilmsCount = FilmsCount.COUNT_PER_STEP;
    const showMoreButtonComponent = new LoadMoreButton();

    // РЕНДЕР КНОПКИ ПОКАЗАТЬ ЕЩЕ
    render(siteAllFilmSection, showMoreButtonComponent);

    showMoreButtonComponent.setClickHandler(() => {
      filmCards
        .slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.COUNT_PER_STEP)
        .forEach((filmCard) => renderFilmCard(filmsListContainer, filmCard));

      renderedFilmsCount += FilmsCount.COUNT_PER_STEP;

      if (renderedFilmsCount >= filmCards.length) {
        remove(showMoreButtonComponent);
      }
    });
  }

  // РЕНДЕР СЕКЦИИ TOP RATED
  const topFilmsListContainer = siteTopFilmSection.getElement().querySelector(`.films-list__container`);
  renderExtraSection(siteTopFilmSection, topFilmsListContainer);

  // РЕНДЕР СЕКЦИИ MOST COMMENTED
  const mostCommentedFilmsListContainer = siteMostCommentedFilmSection.getElement().querySelector(`.films-list__container`);
  renderExtraSection(siteMostCommentedFilmSection, mostCommentedFilmsListContainer);
}

// РЕНДЕР СТАТИСТИКИ В ФУТЕРЕ
render(siteFooterElement, new SiteFooter(FilmsCount.STATS));
