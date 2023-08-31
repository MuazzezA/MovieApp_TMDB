import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, StarVote, Text} from '../../components';
import styles from './styles';

const isActor = item => {
  return item?.known_for_department === 'Acting';
};

const isDirector = item => {
  console.log(item);
  return item?.job === 'Director';
};

// ! with id : details and credits(cast&crew)

export const MovieDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {movieId} = route.params;
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const [favorite, setFavorite] = useState(false);
  return (
    <View style={styles.root}>
      <Header
        leftIcon={'ChevronLeft'}
        favorite={favorite}
        onPressLeftIcon={() => navigation.goBack()}
        onPressFavorite={() => setFavorite(!favorite)}
      />

      {movie && cast ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          />
          <Text style={styles.title}>{movie.title}</Text>
          <StarVote rating={movie.vote_average} />

          <Text style={styles.subtitle}>
            Genre :{' '}
            <Text>{movie.genres.map(genre => genre.name).join(' / ')} </Text>
          </Text>

          <Text style={styles.subtitle}>
            Director :{' '}
            <Text>
              {crew
                .filter(isDirector)
                .map(director => director.name)
                .join(' / ')}
            </Text>
          </Text>

          <Text style={styles.subtitle} numberOfLines={4}>
            Actors :{' '}
            <Text>
              {cast
                .filter(isActor)
                .map(actor => actor.name)
                .join(' / ')}
            </Text>
          </Text>
          <Text style={styles.descTitleText}>Description</Text>
          <Text style={styles.descText}>{movie.overview}</Text>
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
