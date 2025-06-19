// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigations/MainNavigator';
import { UserProvider } from './src/contexts/UserContext';
import { LoadingProvider, useLoading } from './src/contexts/LoadingContext';
import { View, Text, ActivityIndicator } from 'react-native';

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <LoadingProvider>
        <AppWithLoadingOverlay />
      </LoadingProvider>
    </UserProvider>
  );
}
function AppWithLoadingOverlay() {
  const { loading } = useLoading();

  return (
    <>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>

      {loading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 justify-center items-center z-50">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-2">로딩 중입니다...</Text>
        </View>
      )}
    </>
  );
}

export default App;
