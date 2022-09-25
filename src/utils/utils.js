import dayjs from 'dayjs';
const humanizeRuntime = (runtime) => `${Math.floor(runtime / 60)}h ${runtime % 60 !== 0 ? `${(runtime % 60).toString() }m` : ''}`;
const humanizeDate = (date) => dayjs(date).format('D MMMM YYYY');
const humanizeDateComments = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const humanizeArrayAppearance = (array) => array.join(', ');


export {humanizeRuntime, humanizeDate, humanizeArrayAppearance, humanizeDateComments};
