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
