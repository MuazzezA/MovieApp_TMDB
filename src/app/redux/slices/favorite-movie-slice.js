import {createSlice} from '@reduxjs/toolkit';
import {getFavoriteMovies} from '../../api';
const initialState = {
  favoriteMovies: [],
  error: null,
  loading: false,
  message: null,
};

export const favoriteMoviesSlice = createSlice({
  name: 'favoriteMoviesSlice',
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        movie => movie.id !== action.payload.id,
      );
    },
    reset: state => {
      state.favoriteMovies = [];
    },
  },
  extraReducers: {
    [getFavoriteMovies.pending]: state => {
      state.loading = true;
    },

    [getFavoriteMovies.fulfilled]: (state, action) => {
      state.loading = false;
      state.favoriteMovies = action.payload;
    },
    [getFavoriteMovies.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {reset, addFavoriteMovie} = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
