import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_BASE_URL, ACCOUNT_ID, TOKEN} from './config';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer ' + TOKEN,
  },
});

export const getFavoriteMovies = createAsyncThunk(
  'getFavoriteMovies',
  async () => {
    const res = await instance.get(
      '/account/' + ACCOUNT_ID + '/favorite/movies',
    );
    return res.data;
  },
);

export const addFavoriteMovie = createAsyncThunk(
  'addFavoriteMovie',
  async movieId => {
    const res = await instance.post('/account/' + ACCOUNT_ID + '/favorite', {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    });
    return res.data;
  },
);

export const getMovieDetail = createAsyncThunk(
  'getMovieDetail',
  async movieId => {
    const res = await instance.get(`/movie/${movieId}`);
    return res.data;
  },
);

export const getMovieCredits = createAsyncThunk(
  'getMovieCredits',
  async movieId => {
    const res = await instance.get(`/movie/${movieId}/credits?language=en-US`);
    return res.data;
  },
);

export const discoverMovies = createAsyncThunk(
  'discoverMovies',
  async (pageCount = 1) => {
    const res = await instance.get(
      `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageCount}&sort_by=popularity.desc`,
    );

    return res.data;
  },
);

export const getGenres = createAsyncThunk('getGenres', async () => {
  const res = await instance.get('genre/movie/list?language=en');
  return res.data;
});

export const searchMovie = createAsyncThunk(
  'searchMovie',
  async (query, pageCount = 1) => {
    const res = await instance.get(
      `/search/movie?include_adult=false&page=${pageCount}&query=${query}`,
    );
    return res.data;
  },
);
