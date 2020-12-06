const filmMenuMap = {
  all: (filmCards) => filmCards.length,
  watchlist: (filmCards) => filmCards
    .filter((filmCard) => filmCard.inWatchlist)
    .length,
  history: (filmCards) => filmCards
    .filter((filmCard) => filmCard.isWatched)
    .length,
  favorites: (filmCards) => filmCards
    .filter((filmCard) => filmCard.isFavorite)
    .length,
};

export const generateMenu = (filmCards) => {
  return Object.entries(filmMenuMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(filmCards)
    };
  });
};
