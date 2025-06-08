import React from 'react';
import BoardScreen from '../screens/BoardScreen';
import InformScreen from '../screens/InformScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationTypes } from './NavigationTypes';

const Stack = createStackNavigator<NavigationTypes.BoardStackList>();
function BoardNavigator() {
  return (
    <Stack.Navigator initialRouteName="BoardScreen">
      <Stack.Screen
        name="BoardScreen"
        component={BoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InformScreen"
        component={InformScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default BoardNavigator;
