import React from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Text, Button, MovieCard, TextInput, Header} from '../../components';

export const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = React.useState('');
  const [results, setResults] = React.useState();

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

      {results ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={results}
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
        <View style={styles.notFoundDataTextContainer}>
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
