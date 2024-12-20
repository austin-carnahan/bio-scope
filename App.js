import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MainView from './views/MainView'; // Adjust path if MainView.js is located elsewhere

export default function App() {
  return (
    <View style={styles.container}>
      <MainView /> {/* Load the MainView component */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
