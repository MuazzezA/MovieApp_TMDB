import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppStack from './app/navigation/app-stack';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppStack />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
