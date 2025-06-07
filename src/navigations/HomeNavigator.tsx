import React from 'react';
import ChatNavigator from './ChatNavigator';
import BoardNavigator from './BoardNavigator';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationTypes } from './NavigationTypes';

const Stack = createStackNavigator<NavigationTypes.HomeStackList>();
function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BoardNavigator"
        component={BoardNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatNavigator"
        component={ChatNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
