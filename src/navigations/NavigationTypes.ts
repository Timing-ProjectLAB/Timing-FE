// src/navigations/NavigationTypes.ts

import { StackScreenProps } from '@react-navigation/stack';

export declare namespace NavigationTypes {
  export type RootStackParamList = {
    StartScreen: undefined;
    LoginScreen: undefined;
    RegisterNavigator: undefined;
    ChatNavigator: undefined;
    BoardNavigator: undefined;
    HomeNavigator: undefined;
    HomeStackNavigator: undefined;
  };

  export type StartScreenProps = StackScreenProps<
    RootStackParamList,
    'StartScreen'
  >;

  export type LoginScreenProps = StackScreenProps<
    RootStackParamList,
    'LoginScreen'
  >;

  export type RegisterNavigatorProps = StackScreenProps<
    RootStackParamList,
    'RegisterNavigator'
  >;

  export type ChatNavigatorProps = StackScreenProps<
    RootStackParamList,
    'ChatNavigator'
  >;

  export type RegisterStackList = {
    IdPasswordScreen: undefined;
    BirthLocationScreen: undefined;
    GenderEarnScreen: undefined;
    RegisterCompleteScreen: undefined;
    RegisterLoadingScreen: undefined;
  };

  export type IdPasswordScreenProps = StackScreenProps<
    RegisterStackList,
    'IdPasswordScreen'
  >;

  export type BirthLocationScreenProps = StackScreenProps<
    RegisterStackList,
    'BirthLocationScreen'
  >;

  export type GenderEarnScreenProps = StackScreenProps<
    RegisterStackList,
    'GenderEarnScreen'
  >;

  export type RegisterCompleteScreenProps = StackScreenProps<
    RegisterStackList,
    'RegisterCompleteScreen'
  >;

  export type RegisterLoadingScreenProps = StackScreenProps<
    RegisterStackList,
    'RegisterLoadingScreen'
  >;

  // ← 여기부터 수정
  export type ChatStackList = {
    ChatScreen: undefined;
    InformScreen: {
      policy_id: string;
    };
  };

  export type ChatScreenProps = StackScreenProps<ChatStackList, 'ChatScreen'>;

  export type InformationScreenProps = StackScreenProps<
    ChatStackList,
    'InformScreen'
  >;

  export type BoardStackList = {
    BoardScreen: undefined;
    InformScreen: {
      policy_id: string;
    };
  };

  export type BoardScreenProps = StackScreenProps<
    BoardStackList,
    'BoardScreen'
  >;

  export type HomeTabList = {
    HomeScreen: undefined;
    ChatNavigator: undefined;
    BoardNavigator: undefined;
    Favorites: undefined;
    MyPage: undefined;
    InformScreen: {
      policy_id: string;
    };
  };

  export type HomeTabParamList = {
    HomeScreen: undefined;
    ChatNavigator: undefined;
    BoardNavigator: undefined;
  };

  export type HomeStackParamList = {
    Tabs: undefined;
    InformScreen: { policy_id: string };
  };

  export type HomeScreenProps = StackScreenProps<HomeTabList, 'HomeScreen'>;
}
