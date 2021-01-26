import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import CurrentWeather from '../pages/CurrentWeather';
import PreditectedDay from '../pages/PreditectedDay';

const WeatherInfoStackNavigator = createStackNavigator();

const Routes = () => {
  return (
    <WeatherInfoStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <WeatherInfoStackNavigator.Screen
        name="CurrentWeather"
        component={CurrentWeather}
      />
      <WeatherInfoStackNavigator.Screen
        name="PredictedDay"
        component={PreditectedDay}
        initialParams={{ day: { weather: [{}], temp: {} } }}
      />
    </WeatherInfoStackNavigator.Navigator>
  );
};

export default Routes;
