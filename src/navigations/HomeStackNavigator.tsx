import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InformScreen from '../screens/InformScreen';
import HomeNavigator from './HomeNavigator';
import { NavigationTypes } from './NavigationTypes';

const Stack = createStackNavigator<NavigationTypes.HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={HomeNavigator} />
      <Stack.Screen name="InformScreen" component={InformScreen} />
    </Stack.Navigator>
  );
}
