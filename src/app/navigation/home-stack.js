import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, MovieDetailScreen, FavoritesScreen} from '../screens';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="home-screen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home-screen" component={HomeScreen} />
      <Stack.Screen name="movie-detail-screen" component={MovieDetailScreen} />
      <Stack.Screen name="favorites-screen" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
