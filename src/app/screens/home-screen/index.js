import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  View,
} from 'react-native';
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
  const translateY = useRef(new Animated.Value(0)).current;

  const {data, loading} = useSelector(state => state.discoverMovie);
  const {data: genres} = useSelector(state => state.genres);
  const {data: searchData} = useSelector(state => state.searchMovie);

  const [searchText, setSearchText] = useState('');
  const [filteredMovie, setFilteredMovie] = useState([{}]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [ratingShortType, setRatingShortType] = useState(0);

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

  const sortContainerVisibility = visible => {
    Animated.timing(translateY, {
      toValue: visible ? -51 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const renderFlatListItem = item => (
    <MovieCard
      data={item}
      onPress={() => {
        navigation.navigate('movie-detail-screen', {
          movieId: item.id,
        });
      }}
    />
  );

  if ((loading || !filteredMovie) && searchText !== '') {
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

      <Animated.View
        style={[
          styles.shortButtonsContainer,
          {transform: [{translateY: translateY}]},
        ]}>
        <DropDown
          data={genres?.genres}
          icon={'Menu'}
          title={'Short By Category'}
          selectedValue={selectedCategory}
          setSelectedValue={setSelectedCategory}
        />
        <Button icon={'Stars'} title="Short By Rating" onPress={sortByRating} />
      </Animated.View>

      {filteredMovie && filteredMovie?.length !== 0 ? (
        <FlatList
          data={filteredMovie}
          onScroll={event => {
            const offsetY = event.nativeEvent.contentOffset.y;
            if (offsetY > -50 && offsetY < 200) {
              sortContainerVisibility(false);
            } else if (offsetY > 200) {
              sortContainerVisibility(true);
            }
          }}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderFlatListItem(item)}
          ItemSeparatorComponent={() => {
            return <View style={styles.seperator} />;
          }}
        />
      ) : (
        <Text style={styles.noResultText}>No Result</Text>
      )}
    </View>
  );
};
