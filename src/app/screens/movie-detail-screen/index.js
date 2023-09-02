import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, ActivityIndicator, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addFavoriteMovie, getMovieCredits, getMovieDetail} from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {Header, StarVote, Text} from '../../components';
import styles from './styles';
import {reset} from '../../redux/slices/movie-detail-slice';

const filterActor = cast =>
  cast
    .filter(item => item?.known_for_department === 'Acting')
    .map(actor => actor.name)
    .join(' / ');

const filterDirector = crew =>
  crew
    .filter(item => item?.job === 'Director')
    .map(director => director.name)
    .join(' / ');

export const MovieDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {movieId} = route.params;
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const movieDetail = useSelector(state => state.movieDetail.data);
  const movieCredits = useSelector(state => state.movieCredits.data);
  const favoriteData = useSelector(
    state => state.favoriteMovies.favoriteMovies,
  );

  useEffect(() => {
    dispatch(reset());
    dispatch(getMovieDetail(movieId));
    dispatch(getMovieCredits(movieId));
  }, [movieId]);

  useEffect(() => {
    if (favoriteData) {
      const isFavorite = favoriteData.results.find(
        movieItem => movieItem.id === movieId,
      );
      if (isFavorite) {
        setFavorite(true);
      }
    }
  }, [favoriteData]);

  useEffect(() => {
    if (movieCredits) {
      setCast(movieCredits.cast);
      setCrew(movieCredits.crew);
    }
  }, [movieCredits]);

  const pressSetFavorite = async () => {
    if (!favorite) {
      Alert.alert('Movie added to favorites');
      dispatch(addFavoriteMovie({movieId: movieId, isFavorite: true}));
    } else {
      Alert.alert('Movie removed from favorites');
      dispatch(addFavoriteMovie({movieId: movieId, isFavorite: false}));
    }
    setFavorite(!favorite);
  };

  return (
    <View style={styles.root}>
      <Header
        leftIcon={'ChevronLeft'}
        favorite={favorite}
        onPressLeftIcon={() => navigation.goBack()}
        onPressFavorite={() => pressSetFavorite()}
      />

      {movieDetail && cast && crew ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
            }}
          />
          <Text style={styles.title}>{movieDetail.title}</Text>
          <StarVote rating={movieDetail.vote_average} />

          <Text style={styles.subtitle}>
            Genre :{' '}
            <Text>
              {movieDetail.genres.map(genre => genre.name).join(' / ')}
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            Director : <Text>{filterDirector(crew)}</Text>
          </Text>

          <Text style={styles.subtitle} numberOfLines={4}>
            Actors : <Text>{filterActor(cast)}</Text>
          </Text>
          <Text style={styles.descTitleText}>Description</Text>
          <Text style={styles.descText}>{movieDetail.overview}</Text>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="red" />
      )}
    </View>
  );
};
