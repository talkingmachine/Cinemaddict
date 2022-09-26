import dayjs from 'dayjs';

const sortByDate = (filmA, filmB) => -dayjs(filmA.filmInfo.release.date).diff(filmB.filmInfo.release.date);

const sortByRating = (filmA, filmB) => {
  if (filmA.filmInfo.totalRating > filmB.filmInfo.totalRating) {
    return -1;
  }
  if (filmA.filmInfo.totalRating < filmB.filmInfo.totalRating) {
    return 1;
  }
  return 0;
};


export {sortByRating, sortByDate};
