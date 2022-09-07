export const generateFilmData = () => ({
  'id': '0',
  'comments': [1, 2, 3],
  'filmInfo': {
    'title': 'A Little Pony Without The Carpet',
    'alternativeTitle': 'Laziness Who Sold Themselves',
    'totalRating': Math.floor(Math.random() * 1323),
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
      'date': '2019-08-02T00:00:00.000Z',
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
