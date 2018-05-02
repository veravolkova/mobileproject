import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Calculator from './screens/Calculator';
import HistoryScreen from './screens/HistoryScreen';
import MapScreen from './screens/MapScreen';
import Calculator2 from './screens/Calculator2';
import YouTube from './screens/YouTube';
import Main from './Main';

export default class App extends React.Component {

  render() {
    return <MyApp />;
  }
}

const MyApp = StackNavigator({
  MainScreen: { screen: Main },
  Calc: { screen: Calculator },
  Calc2: { screen: Calculator2 },
  History: { screen: HistoryScreen },
  Map: { screen: MapScreen }, 
  Youtube: { screen: YouTube },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
