/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { hide } from 'react-native-bootsplash';
import { PaperProvider } from 'react-native-paper';
import { theme } from '@theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootLayout } from '@screens/rootLayout';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { BioMetricUnlock } from '@components/biometric-unlock/BioMetricUnlock';
import { store } from '@store/index';

function App(): React.JSX.Element {
  useEffect(() => {
    hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme} settings={{ rippleEffectEnabled: true }}>
        <ReduxProvider store={store}>
          <NavigationContainer>
            <BioMetricUnlock />
            <GestureHandlerRootView>
              <RootLayout />
            </GestureHandlerRootView>
          </NavigationContainer>
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
