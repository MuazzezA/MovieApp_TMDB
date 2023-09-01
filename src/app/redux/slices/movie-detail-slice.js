import {createSlice} from '@reduxjs/toolkit';
import {getMovieDetail} from '../../api';
const initialState = {
  data: null,
  error: null,
  loading: false,
  message: null,
};

export const movieDetailSlice = createSlice({
  name: 'movieDetailSlice',
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
    [getMovieDetail.pending]: state => {
      state.loading = true;
    },

    [getMovieDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getMovieDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {reset} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
