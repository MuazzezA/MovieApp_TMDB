import {configureStore} from '@reduxjs/toolkit';
import favoriteMoviesReducer from './slices/favorite-movie-slice.js';
import addFavoriteMovieReducer from './slices/add-favorite-movie-slice.js';
import movieDetailReducer from './slices/movie-detail-slice.js';
import movieCreditsReducer from './slices/movie-credits-slice.js';
import discoverMovieReducer from './slices/discover-movie-slice.js';
import genresReducer from './slices/genres-slice.js';

export const store = configureStore({
  reducer: {
    favoriteMovies: favoriteMoviesReducer,
    addFavoriteMovie: addFavoriteMovieReducer,
    movieDetail: movieDetailReducer,
    movieCredits: movieCreditsReducer,
    discoverMovie: discoverMovieReducer,
    genres: genresReducer,
  },
});
