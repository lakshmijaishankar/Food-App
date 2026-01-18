import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnBoarding} from '@components/on-boarding/OnBoarding';
import type {RootStackParamList} from '../types/nativeStackNavigator';
import {SignUp} from '@screens/sign-up/SignUp';
import {Login} from '@screens/login';

export const RootStack = createNativeStackNavigator<RootStackParamList>();
const {Navigator, Screen} = RootStack;

export function RootLayout() {
  return (
    <Navigator
      initialRouteName="Boarding"
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
        statusBarStyle: 'auto',
        statusBarHidden: true,
        statusBarAnimation: 'slide',
      }}>
      <Screen name="Boarding" component={OnBoarding} />
      <Screen name="Login" component={Login} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
