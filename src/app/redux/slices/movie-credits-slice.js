import {createSlice} from '@reduxjs/toolkit';
import {getMovieCredits} from '../../api';

const initialState = {
  data: null,
  error: null,
  loading: false,
  message: null,
};

export const movieCreditsSlice = createSlice({
  name: 'movieCreditsSlice',
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
    [getMovieCredits.pending]: state => {
      state.loading = true;
    },
    [getMovieCredits.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getMovieCredits.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {reset} = movieCreditsSlice.actions;

export default movieCreditsSlice.reducer;
