import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ChatNavigator from './ChatNavigator';
import BoardNavigator from './BoardNavigator';
import { NavigationTypes } from './NavigationTypes';

// SVG 아이콘 import
import HomeIcon from '../assets/images/bnv_home.svg';
import ChatIcon from '../assets/images/bnv_chat.svg';
import BoardIcon from '../assets/images/bnv_board.svg';
import FavIcon from '../assets/images/bnv_star.svg';
import MyPageIcon from '../assets/images/bnv_person.svg';

const Tab = createBottomTabNavigator<NavigationTypes.HomeTabList>();

// 더미용 빈 화면
const EmptyScreen = () => null;

export default function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const iconProps = {
            width: 24,
            height: 24,
          };

          switch (route.name) {
            case 'HomeScreen':
              return <HomeIcon {...iconProps} />;
            case 'BoardNavigator':
              return <BoardIcon {...iconProps} />;
            case 'ChatNavigator':
              return <ChatIcon {...iconProps} />;
            case 'Favorites':
              return <FavIcon {...iconProps} />;
            case 'MyPage':
              return <MyPageIcon {...iconProps} />;
            default:
              return null;
          }
        },
        tabBarLabel: ({ focused }) => {
          let label = '';
          switch (route.name) {
            case 'HomeScreen':
              label = '홈';
              break;
            case 'BoardNavigator':
              label = '맞춤정책';
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
              className="font-pre"
              style={{
                fontSize: 12,
                color: focused ? '#007AFF' : '#888',
                marginTop: 2,
              }}
            >
              {label}
            </Text>
          );
        },
        tabBarStyle: {
          height: 64,
          paddingTop: 4,
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
