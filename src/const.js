export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const FilmSection = {
  ALL: {
    title: `All movies. Upcoming`,
    isExtra: false,
    isHidden: true
  },
  TOP: {
    title: `Top rated`,
    isExtra: true,
    isHidden: false
  },
  MOST_COMMENTED: {
    title: `Most commented`,
    isExtra: true,
    isHidden: false
  }
};

export const ESC_KEY = `Escape`;

export const FilmsCount = {
  STATS: 123000,
  ALL: 7,
  EXTRA: 2,
  COUNT_PER_STEP: 5
};
