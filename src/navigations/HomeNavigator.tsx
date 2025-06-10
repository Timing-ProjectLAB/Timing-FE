import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ChatNavigator from './ChatNavigator';
import BoardNavigator from './BoardNavigator';
import { NavigationTypes } from './NavigationTypes';

const Tab = createBottomTabNavigator<NavigationTypes.HomeTabList>();

// 더미용 빈 화면
const EmptyScreen = () => null;

export default function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          let label = '';
          switch (route.name) {
            case 'HomeScreen':
              label = '홈';
              break;
            case 'BoardNavigator':
              label = '정책';
              break;
            case 'ChatNavigator':
              label = '챗봇';
              break;
            case 'Favorites':
              label = '즐겨찾기';
              break;
            case 'MyPage':
              label = '마이페이지';
              break;
          }

          return (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#0073FF' : '#888',
              }}
            >
              {label}
            </Text>
          );
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="BoardNavigator" component={BoardNavigator} />
      <Tab.Screen name="ChatNavigator" component={ChatNavigator} />
      <Tab.Screen name="Favorites" component={EmptyScreen} />
      <Tab.Screen name="MyPage" component={EmptyScreen} />
    </Tab.Navigator>
  );
}
