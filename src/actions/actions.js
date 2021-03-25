export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

// initialize movies list
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

// sets filter for movie list
export function setFilter(value) {
  return { type: SET_FILTER, value };
}