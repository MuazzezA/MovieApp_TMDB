import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppStack from './app/navigation/app-stack';
import {store} from './app/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppStack />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
