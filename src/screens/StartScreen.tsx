import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Logo from '../assets/images/Logo.svg';
import { NavigationTypes } from '../navigations/NavigationTypes';

export default function StartScreen(props: NavigationTypes.StartScreenProps) {
  const { navigation } = props;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate('LoginScreen');
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View className="flex w-screen h-screen bg-white items-center justify-center">
      <Animated.View style={{ opacity: fadeAnim }}>
        <Logo width={180} height={180} />
      </Animated.View>
    </View>
  );
}
