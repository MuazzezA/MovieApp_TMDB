import {createSlice} from '@reduxjs/toolkit';
import {addFavoriteMovie} from '../../api';
const initialState = {
  data: null,
  error: null,
  loading: false,
  message: null,
};

export const addFavoriteMoviesSlice = createSlice({
  name: 'addFavoriteMoviesSlice',
  initialState,
  reducers: {
    reset: state => {
      state.data = null;
      state.error = null;
      state.loading = false;
      state.message = null;
    },
  },
  extraReducers: {
    [addFavoriteMovie.pending]: state => {
      state.loading = true;
    },

    [addFavoriteMovie.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [addFavoriteMovie.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {reset} = addFavoriteMoviesSlice.actions;

export default addFavoriteMoviesSlice.reducer;
