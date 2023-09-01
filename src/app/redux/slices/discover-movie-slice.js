import {createSlice} from '@reduxjs/toolkit';
import {discoverMovies} from '../../api';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const discoverMovieSlice = createSlice({
  name: 'discoverMovie',
  initialState,
  reducers: {
    reset: state => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [discoverMovies.pending]: state => {
      state.loading = true;
    },
    [discoverMovies.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [discoverMovies.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const {reset} = discoverMovieSlice.actions;
export default discoverMovieSlice.reducer;
