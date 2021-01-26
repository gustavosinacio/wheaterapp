import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
