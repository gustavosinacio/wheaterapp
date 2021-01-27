import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import CurrentWeather from '../pages/CurrentWeather';
import ForecastedDay from '../pages/ForecastedDay';

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
        name="ForecastedDay"
        component={ForecastedDay}
        initialParams={{ day: { weather: [{}], temp: {} } }}
      />
    </WeatherInfoStackNavigator.Navigator>
  );
};

export default Routes;
