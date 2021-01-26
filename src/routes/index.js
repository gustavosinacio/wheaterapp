import React from 'react';
// import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';

// import { LearnMoreLinks, Colors } from 'react-native/Libraries/NewAppScreen';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentWeather from '../pages/CurrentWeather';

//TODO REMOVE
// const LearMoreLinks = () => {
//   return (
//     <>
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <View style={styles.body}>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

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
    </WeatherInfoStackNavigator.Navigator>
  );
};

export default Routes;
