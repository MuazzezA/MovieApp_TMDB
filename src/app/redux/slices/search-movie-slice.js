import {createSlice} from '@reduxjs/toolkit';
import {searchMovie} from '../../api';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const searchMovieSlice = createSlice({
  name: 'searchMovie',
  initialState,
  reducers: {
    reset: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [searchMovie.pending]: state => {
      state.loading = true;
    },
    [searchMovie.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [searchMovie.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {reset} = searchMovieSlice.actions;
export default searchMovieSlice.reducer;
