const filmsCounter = {
  mainList: 5,
  topRated: 2,
  mostCommented: 2
};
const FILMS_CARDS_TO_GENERATE = 13;
const FILMS_PER_PAGE = 5;
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const emptyListOptions = {
  'allMovies': 'There are no movies in our database',
  'watchList': 'There are no movies to watch now',
  'history': 'There are no watched movies now',
  'favorites': 'There are no favorite movies now'
};


export {filmsCounter, EMOTIONS, FILMS_CARDS_TO_GENERATE, FILMS_PER_PAGE, emptyListOptions};
