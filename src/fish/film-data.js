import {nanoid} from 'nanoid';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

export const generateFilmData = () => ({
  'id': nanoid(),
  'comments': [1, 2, 3],
  'filmInfo': {
    'title': 'A Little Pony Without The Carpet',
    'alternativeTitle': 'Laziness Who Sold Themselves',
    'totalRating': getRandomInt(1, 50),
    'poster': 'images/posters/blue-blazes.jpg',
    'ageRating': 0,
    'director': 'Tom Ford',
    'writers': [
      'Anne Wigton', 'Heinz Herald', 'Richard Weil'
    ],
    'actors': [
      'Morgan Freeman'
    ],
    'release': {
      'date': `200${getRandomInt(0, 9)}-0${getRandomInt(1, 9)}-0${getRandomInt(1, 9)}T00:00:00.000Z`, //`${getRandomInt(2000, 2021)}-${getRandomInt(0, 10)}-02T00:00:00.000Z`
      'release_country': 'Finland'
    },
    'runtime': 121,
    'genre': [
      'Comedy',
      'Mystery',
      'Fantasy',
    ],
    'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
  },
  'user_details': {
    'watchlist': false,
    'alreadyWatched': true,
    'watchingDate': '2019-04-12T16:12:32.554Z',
    'favorite': false
  }
});
