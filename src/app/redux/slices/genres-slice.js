import {createSlice} from '@reduxjs/toolkit';
import {getGenres} from '../../api';

const initialState = {
  data: null,
  error: null,
  loading: false,
  message: null,
};

export const genresSlice = createSlice({
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
    [getGenres.pending]: state => {
      state.loading = true;
    },
    [getGenres.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getGenres.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const {reset} = genresSlice.actions;

export default genresSlice.reducer;
