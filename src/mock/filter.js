const filmToFilterMap = {
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

export const generateFilter = (filmCards) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(filmCards)
    };
  });
};
