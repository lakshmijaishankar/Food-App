import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnBoarding } from '@components/on-boarding/OnBoarding';
import type { RootStackParamList } from '../types/nativeStackNavigator';
import { SignUp } from '@screens/sign-up/SignUp';
import { Login } from '@screens/login';
import { lazy, Suspense } from 'react';
import { Text } from 'react-native-paper';

const MainBottomNavigation = lazy(() =>
  import('../components/bottom-navigation/mainBottomNavigation').then(
    module => ({ default: module.MainBottomNavigation }),
  ),
);

const SuspenseMainBottomNavigation = () => (
  <Suspense fallback={<Text>Loading...</Text>}>
    <MainBottomNavigation />
  </Suspense>
);

export const RootStack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen } = RootStack;

export function RootLayout() {
  return (
    <Navigator
      initialRouteName="Boarding"
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
        statusBarStyle: 'auto',
        // statusBarHidden: true,
        statusBarAnimation: 'slide',
      }}>
      <Screen name="Boarding" component={OnBoarding} />
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="HomeDashboard" component={SuspenseMainBottomNavigation} />
    </Navigator>
  );
}
