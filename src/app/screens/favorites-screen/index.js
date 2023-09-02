import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  Button,
  MovieCard,
  TextInput,
  Header,
  DropDown,
} from '../../components';
import {getFavoriteMovies} from '../../api';
import styles from './styles';

export const FavoritesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [filteredMovie, setFilteredMovie] = useState();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [ratingShortType, setRatingShortType] = useState(0);

  const {favoriteMovies, loading, error} = useSelector(
    state => state.favoriteMovies,
  );
  const {data: genres} = useSelector(state => state.genres);

  useFocusEffect(
    useCallback(() => {
      dispatch(getFavoriteMovies());
    }, []),
  );

  useEffect(() => {
    setFilteredMovie(favoriteMovies.results);
  }, [favoriteMovies]);

  useEffect(() => {
    if (selectedCategory.length === 0) {
      setFilteredMovie(favoriteMovies?.results);
      return;
    } else {
      const selectedCategoryIds = selectedCategory.map(category => category.id);
      const filteredData = favoriteMovies?.results.filter(item => {
        return item.genre_ids.some(genreId =>
          selectedCategoryIds.includes(genreId),
        );
      });
      setFilteredMovie(filteredData);
    }
  }, [selectedCategory]);

  const onChangeSearchText = text => {
    setSearchText(text);
    const data = favoriteMovies.results.filter(item => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredMovie(data);
  };
  if (loading) {
    return (
      <View style={styles.infoContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  const sortByRating = () => {
    console.log('shortByRating : ', filteredMovie);
    const filteredDataCopy = [...filteredMovie];
    const data = filteredDataCopy.sort((a, b) => {
      if (ratingShortType === 1) {
        setRatingShortType(0);
        return a.vote_average - b.vote_average;
      } else if (ratingShortType === 0) {
        setRatingShortType(1);
        return b.vote_average - a.vote_average;
      }
    });
    setFilteredMovie(data);
  };

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

  return (
    <View style={styles.root}>
      <Header
        leftIcon={'ChevronLeft'}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <Text style={styles.titleText}>Favorite Movies</Text>
      <TextInput
        value={searchText}
        onChangeText={onChangeSearchText}
        onBlur={() => {
          console.log('onBlur');
        }}
      />
      <View style={styles.shortButtonsContainer}>
        <DropDown
          data={genres?.genres}
          icon="Menu"
          title="Short By Category"
          selectedValue={selectedCategory}
          setSelectedValue={setSelectedCategory}
        />
        <Button
          icon="Stars"
          title="Short By Rating"
          onPress={() => sortByRating()}
        />
      </View>

      {filteredMovie && filteredMovie.length > 0 ? (
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
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.notdataTitle}>
            There are no movies in favorites yet.
          </Text>
          <Text style={styles.notdataDesc}>
            To favorite a movie, go to my movie detail and tap the heart.
          </Text>
        </View>
      )}
    </View>
  );
};
