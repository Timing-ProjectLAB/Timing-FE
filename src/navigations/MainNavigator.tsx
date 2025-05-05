import React from 'react';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterNavigatior from './RegisterNavigator';
import ChatNavigator from './ChatNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationTypes } from './NavigationTypes';

const Stack = createStackNavigator<NavigationTypes.RootStackParamList>();
function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterNavigator"
        component={RegisterNavigatior}
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

export default MainNavigator;
