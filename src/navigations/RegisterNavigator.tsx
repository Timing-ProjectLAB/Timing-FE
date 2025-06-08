import React from 'react';
import IdPasswordScreen from '../screens/IdPasswordScreen';
import BirthLocationScreen from '../screens/BirthLocationScreen';
import GenderEarnScreen from '../screens/GenderEarnScreen';
import RegisterCompleteScreen from '../screens/RegisterCompleteScreen';
import RegisterLoadingScreen from '../screens/RegisterLoadingScreen';
import HomeNavigator from './HomeNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationTypes } from './NavigationTypes';

const Stack = createStackNavigator<NavigationTypes.RegisterStackList>();
function RegisterNavigatior() {
  return (
    <Stack.Navigator initialRouteName="IdPasswordScreen">
      <Stack.Screen
        name="IdPasswordScreen"
        component={IdPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BirthLocationScreen"
        component={BirthLocationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GenderEarnScreen"
        component={GenderEarnScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterCompleteScreen"
        component={RegisterCompleteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterLoadingScreen"
        component={RegisterLoadingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RegisterNavigatior;
