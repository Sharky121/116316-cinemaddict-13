export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const FilmSection = {
  ALL: {
    title: `All movies. Upcoming`,
    isExtra: false,
    isHidden: true,
    isEmpty: false
  },
  TOP: {
    title: `Top rated`,
    isExtra: true,
    isHidden: false,
    isEmpty: false
  },
  MOST_COMMENTED: {
    title: `Most commented`,
    isExtra: true,
    isHidden: false,
    isEmpty: false
  },
  EMPTY: {
    title: `There are no movies in our database`,
    isExtra: false,
    isHidden: false,
    isEmpty: true
  }
};

export const ESC_KEY = `Escape`;

export const FilmsCount = {
  STATS: 123000,
  ALL: 10,
  EXTRA: 2,
  COUNT_PER_STEP: 5
};
