import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '@store/hooks';
import { RootStackParamList } from '../../types/nativeStackNavigator';
import { store } from '@store/index';
import { loadUserFromStorage } from '@store/user';

export function AuthLoading() {
  const { isAuthenticated, isLoading } = useAppSelector(({ user }) => user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { replace } = navigation;

  useEffect(() => {
    store.dispatch(loadUserFromStorage());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      replace('HomeDashboard');
    } else if (!isAuthenticated && isLoading) {
      replace('Login');
    }
  }, [isAuthenticated, isLoading, replace]);

  return null;
}
