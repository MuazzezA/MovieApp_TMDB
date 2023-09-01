import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Button, MovieCard, TextInput, Header} from '../../components';
import {getFavoriteMovies} from '../../api';
import styles from './styles';

export const FavoritesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [filteredMovie, setFilteredMovie] = React.useState();
  const {favoriteMovies, loading, error} = useSelector(
    state => state.favoriteMovies,
  );

  useEffect(() => {
    dispatch(getFavoriteMovies());
  }, []);

  useEffect(() => {
    setFilteredMovie(favoriteMovies.results);
  }, [favoriteMovies]);

  if (loading) {
    return (
      <View style={styles.infoContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.infoContainer}>
        <Text>Something went wrong</Text>
        <Button
          icon="ChevronLeft"
          title="Go Back"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.button}
        />
      </View>
    );
  }

  if (!loading && favoriteMovies?.results?.lenght === 0) {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.notdataTitle}>
          There are no movies in favorites yet.
        </Text>
        <Text style={styles.notdataDesc}>
          To favorite a movie, go to my movie detail and tap the heart.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Header
        leftIcon={'ChevronLeft'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <Text style={styles.titleText}>Favorite Movies</Text>
      <TextInput
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          console.log('text : ', text);
          const data = favoriteMovies.results.filter(item => {
            return item.title.toLowerCase().includes(text.toLowerCase());
          });
          setFilteredMovie(data);
        }}
        onBlur={() => {
          console.log('onBlur');
        }}
      />
      <View style={styles.shortButtonsContainer}>
        <Button
          icon={'Menu'}
          title="Short By Category"
          onPress={() => {
            console.log('short by category');
          }}
        />
        <Button
          icon={'Stars'}
          title="Short By Rating"
          onPress={() => {
            console.log('short by rating');
          }}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredMovie}
        ItemSeparatorComponent={() => {
          return <View style={styles.seperator} />;
        }}
        renderItem={({item}) => {
          return (
            <MovieCard
              data={item}
              onPress={() => {
                navigation.navigate('movie-detail-screen', {
                  movieId: item.id,
                });
              }}
            />
          );
        }}
      />
    </View>
  );
};
