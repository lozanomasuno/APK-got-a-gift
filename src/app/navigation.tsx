import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useGifts } from '../hooks/useGifts';
import { ResultScreen } from '../features/gifts/screens/ResultScreen';
import { SetupScreen } from '../features/gifts/screens/SetupScreen';
import { SurpriseBoxScreen } from '../features/gifts/screens/SurpriseBoxScreen';
import { RootStackParamList } from '../features/gifts/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation() {
  const { hydrated, hasConfiguredGifts } = useGifts();

  if (!hydrated) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0F766E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={hasConfiguredGifts ? 'SurpriseBox' : 'Setup'}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="SurpriseBox" component={SurpriseBoxScreen} />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFEFF',
  },
});
