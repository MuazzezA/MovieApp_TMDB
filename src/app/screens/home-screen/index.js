import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, MovieCard, TextInput} from '../../components';
import {discoverMovies, getFavoriteMovies} from '../../api';
import styles from './styles';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const [filteredMovie, setFilteredMovie] = useState([{}]);
  const {data, loading} = useSelector(state => state.discoverMovie);

  useEffect(() => {
    dispatch(discoverMovies());
    dispatch(getFavoriteMovies());
  }, []);

  useEffect(() => {
    setFilteredMovie(data?.results);
  }, [data]);

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

  console.log('filteredMovie', filteredMovie);

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
        <Button
          icon={'Menu'}
          title="Short By Category"
          onPress={() => {
            console.log('Go to Details');
          }}
        />
        <Button
          icon={'Stars'}
          title="Short By Rating"
          onPress={() => {
            console.log('Go to Details');
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
