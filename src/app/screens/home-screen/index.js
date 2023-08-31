import React, {useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Text, Button, MovieCard, TextInput} from '../../components';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
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
        <ActivityIndicator style={styles.activityIndicator} />
      )}
    </View>
  );
};
