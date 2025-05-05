import React from 'react';
import ChatScreen from '../screens/ChatScreen';
import InformScreen from '../screens/InformScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationTypes } from './NavigationTypes';

const Stack = createStackNavigator<NavigationTypes.ChatStackList>();
function ChatNavigator() {
  return (
    <Stack.Navigator initialRouteName="ChatScreen">
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
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

export default ChatNavigator;
