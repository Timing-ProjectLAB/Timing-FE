import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Next from '../assets/images/Next.svg';
import { NavigationTypes } from '../navigations/NavigationTypes';
export default function HomeScreen(props: NavigationTypes.HomeScreenProps) {
  return (
    <View className="flex w-screen h-screen bg-white">
      <Text>HomeScreen</Text>
    </View>
  );
}
