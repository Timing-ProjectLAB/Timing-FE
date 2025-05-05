import { StackScreenProps } from '@react-navigation/stack';

export declare namespace NavigationTypes {
  export type RootStackParamList = {
    StartScreen: undefined;
    LoginScreen: undefined;
    RegisterNavigator: undefined;
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

  export type RegisterStackList = {
    IdPasswordScreen: undefined;
    BirthLocationScreen: undefined;
    GenderEarnScreen: undefined;
    RegisterCompleteScreen: undefined;
    RegisterLoadingScreen: undefined;
    ChatNavigator: undefined;
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

  export type ChatStackList = {
    ChatScreen: undefined;
    InformScreen: undefined;
  };

  export type ChatScreenProps = StackScreenProps<ChatStackList, 'ChatScreen'>;
  export type InformationScreenProps = StackScreenProps<
    ChatStackList,
    'InformScreen'
  >;
}
