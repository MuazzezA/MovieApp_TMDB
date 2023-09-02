import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, MovieCard, TextInput, DropDown} from '../../components';
import {
  discoverMovies,
  getFavoriteMovies,
  getGenres,
  searchMovie,
} from '../../api';
import styles from './styles';
import {reset} from '../../redux/slices/search-movie-slice';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const [filteredMovie, setFilteredMovie] = useState([{}]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [ratingShortType, setRatingShortType] = useState(0);

  const {data, loading} = useSelector(state => state.discoverMovie);
  const {data: genres} = useSelector(state => state.genres);
  const {data: searchData, loading: searchLoading} = useSelector(
    state => state.searchMovie,
  );

  useEffect(() => {
    dispatch(discoverMovies());
    dispatch(getFavoriteMovies());
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    setFilteredMovie(data?.results);
  }, [data]);

  useEffect(() => {
    setFilteredMovie(searchData?.results);
  }, [searchData]);

  useEffect(() => {
    if (selectedCategory.length === 0) {
      setFilteredMovie(filteredMovie);
      return;
    } else {
      const selectedCategoryIds = selectedCategory.map(category => category.id);
      const filteredData = data?.results.filter(item => {
        return item.genre_ids.some(genreId =>
          selectedCategoryIds.includes(genreId),
        );
      });
      setFilteredMovie(filteredData);
    }
  }, [selectedCategory]);

  const onChangeSearchText = text => {
    setSearchText(text);
  };

  const onBlurInput = () => {
    dispatch(reset());
    if (searchText !== '') {
      dispatch(searchMovie(searchText));
    } else {
      setFilteredMovie(data?.results);
    }
  };

  const sortByRating = () => {
    const filteredDataCopy = [...filteredMovie];
    const sortedData = filteredDataCopy.sort((a, b) => {
      if (ratingShortType === 1) {
        setRatingShortType(0);
        return a.vote_average - b.vote_average;
      } else if (ratingShortType === 0) {
        setRatingShortType(1);
        return b.vote_average - a.vote_average;
      }
    });
    setFilteredMovie(sortedData);
  };

  if (loading || !filteredMovie) {
    return (
      <ActivityIndicator
        size="large"
        color="red"
        style={styles.activityIndicator}
      />
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Movie List</Text>
        <Button
          icon={'Heart'}
          title="Favorite Movies"
          onPress={() => {
            navigation.navigate('favorites-screen');
          }}
        />
      </View>

      <TextInput
        value={searchText}
        onChangeText={onChangeSearchText}
        onBlur={onBlurInput}
      />

      <View style={styles.shortButtonsContainer}>
        <DropDown
          data={genres?.genres}
          icon={'Menu'}
          title={'Short By Category'}
          selectedValue={selectedCategory}
          setSelectedValue={setSelectedCategory}
        />
        <Button icon={'Stars'} title="Short By Rating" onPress={sortByRating} />
      </View>

      {filteredMovie && filteredMovie?.length !== 0 ? (
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
        <Text style={styles.noResultText}>No Result</Text>
      )}
    </View>
  );
};
