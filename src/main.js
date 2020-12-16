import {RenderPosition, FilmSection, FilmsCount, ESC_KEY} from "./const";
import {render} from "./utils/render";
import SiteProfileView from "./views/profile";
import SiteMenuView from "./views/menu";
import SiteSortView from "./views/sort";
import FilmsBoardView from "./views/films";
import FilmsListView from "./views/films-list";
import FilmCardView from "./views/film-card";
import LoadMoreButton from "./views/show-more-button";
import SiteFooter from "./views/footer-stats";
import NoFilmsView from "./views/list-empty";
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
render(siteHeaderElement, new SiteProfileView().getElement(), RenderPosition.BEFOREEND);

// Создаем меню
const siteMenuElement = new SiteMenuView(menu);

// РЕНДЕР ЭЛЕМЕНТА МЕНЮ
render(siteMainElement, siteMenuElement.getElement(), RenderPosition.AFTERBEGIN);

// РЕНДЕР СОРТИРОВКИ
render(siteMenuElement.getElement(), new SiteSortView().getElement(), RenderPosition.AFTEREND);

// MAIN КАРТОЧКИ ФИЛЬМОВ
// Рендер основного борда под фильмы
const siteFilmsBoard = new FilmsBoardView();
render(siteMainElement, siteFilmsBoard.getElement(), RenderPosition.BEFOREEND);

// РЕНДЕР СЕКЦИЙ ДЛЯ ФИЛЬМОВ
const siteAllFilmSection = new FilmsListView(FilmSection.ALL);
const siteTopFilmSection = new FilmsListView(FilmSection.TOP);
const siteMostCommentedFilmSection = new FilmsListView(FilmSection.MOST_COMMENTED);

render(siteFilmsBoard.getElement(), siteAllFilmSection.getElement(), RenderPosition.AFTERBEGIN);
render(siteFilmsBoard.getElement(), siteTopFilmSection.getElement(), RenderPosition.BEFOREEND);
render(siteFilmsBoard.getElement(), siteMostCommentedFilmSection.getElement(), RenderPosition.BEFOREEND);

// ФУНКЦИЯ РЕНДЕРА КАРТОЧКИ ФИЛЬМА
const renderFilmCard = (filmsSection, film) => {
  const filmComponent = new FilmCardView(film);
  const PopupTriggerElements = [
    filmComponent.getElement().querySelector(`.film-card__poster`),
    filmComponent.getElement().querySelector(`.film-card__title`),
    filmComponent.getElement().querySelector(`.film-card__comments`)
  ];
  const filmsListContainer = filmsSection.querySelector(`.films-list__container`);

  render(filmsListContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);

  // ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА
  const openPopup = () => {
    const popupElement = new Popup(film);
    const closePopupElement = popupElement.getElement().querySelector(`.film-details__close-btn`);

    siteBodyElement.classList.add(`hide-overflow`);
    siteBodyElement.appendChild(popupElement.getElement());

    const closePopup = () => {
      siteBodyElement.classList.remove(`hide-overflow`);
      popupElement.getElement().remove();
      popupElement.removeElement();
      closePopupElement.removeEventListener(`click`, closePopup);
      document.removeEventListener(`keydown`, onPopupEscPress);
    };

    const onPopupEscPress = (evt) => {
      if (evt.key === ESC_KEY) {
        closePopup();
      }
    };

    document.addEventListener(`keydown`, onPopupEscPress);
    closePopupElement.addEventListener(`click`, closePopup);
  };

  PopupTriggerElements.forEach((element) => {
    element.addEventListener(`click`, openPopup);
  });
};

// РЕНДЕР СЕКЦИИ ALL MOVIES
if (FilmsCount.ALL === 0) {
  render(siteAllFilmSection, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < Math.min(filmCards.length, FilmsCount.COUNT_PER_STEP); i++) {
    renderFilmCard(siteAllFilmSection.getElement(), filmCards[i]);
  }
}

// УСЛОВИЕ ДОПОКАЗА ФИЛЬМОВ
if (filmCards.length > FilmsCount.COUNT_PER_STEP) {
  let renderedFilmsCount = FilmsCount.COUNT_PER_STEP;
  const showMoreButtonComponent = new LoadMoreButton();

  // РЕНДЕР КНОПКИ ПОКАЗАТЬ ЕЩЕ
  render(siteAllFilmSection.getElement(), showMoreButtonComponent.getElement(), RenderPosition.AFTEREND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    filmCards
      .slice(renderedFilmsCount, renderedFilmsCount + FilmsCount.COUNT_PER_STEP)
      .forEach((filmCard) => renderFilmCard(siteAllFilmSection.getElement(), filmCard));

    renderedFilmsCount += FilmsCount.COUNT_PER_STEP;

    if (renderedFilmsCount >= filmCards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

// РЕНДЕР СЕКЦИИ TOP RATED
const topRatedFilms = filmCards.sort((a, b) => b.rate - a.rate).slice(0, FilmsCount.EXTRA);

for (let i = 0; i < topRatedFilms.length; i++) {
  renderFilmCard(siteTopFilmSection.getElement(), filmCards[i]);
}

// РЕНДЕР СЕКЦИИ MOST COMMENTED
const topCommentedFilms = filmCards.sort((a, b) => b.comments.length - a.comments.length).slice(0, FilmsCount.EXTRA);

for (let i = 0; i < topCommentedFilms.length; i++) {
  renderFilmCard(siteMostCommentedFilmSection.getElement(), filmCards[i]);
}

// РЕНДЕР СТАТИСТИКИ В ФУТЕРЕ
render(siteFooterElement, new SiteFooter(FilmsCount.STATS).getElement(), RenderPosition.BEFOREEND);
