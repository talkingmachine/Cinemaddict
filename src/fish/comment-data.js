const generateComment = () => ({
  'id': '1',
  'author': 'Ilya O\'Reilly',
  'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': 'smile'
});

export const generateFilmCommentData = () => (Array.from({length: 10}, generateComment));
