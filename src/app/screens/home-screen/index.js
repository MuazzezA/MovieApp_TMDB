import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, MovieCard, TextInput, DropDown} from '../../components';
import {discoverMovies, getFavoriteMovies, getGenres} from '../../api';
import styles from './styles';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const [filteredMovie, setFilteredMovie] = useState([{}]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const {data, loading} = useSelector(state => state.discoverMovie);
  const {data: genres} = useSelector(state => state.genres);

  useEffect(() => {
    dispatch(discoverMovies());
    dispatch(getFavoriteMovies());
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    setFilteredMovie(data?.results);
  }, [data]);

  useEffect(() => {
    if (selectedCategory.length === 0) {
      setFilteredMovie(data?.results);
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
    const filteredData = data?.results.filter(item => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredMovie(filteredData);
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
        onBlur={() => {
          console.log('onBlur');
        }}
      />

      <View style={styles.shortButtonsContainer}>
        <DropDown
          data={genres?.genres}
          icon={'Menu'}
          title={'Short By Category'}
          selectedValue={selectedCategory}
          setSelectedValue={setSelectedCategory}
        />
        <Button
          icon={'Stars'}
          title="Short By Rating"
          onPress={() => {
            console.log('Short By Rating');
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
