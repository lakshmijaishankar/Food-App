/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {hide} from 'react-native-bootsplash';
import {PaperProvider} from 'react-native-paper';
import {theme} from '@theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootLayout} from '@screens/rootLayout';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  useEffect(() => {
    hide({fade: true});
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme} settings={{rippleEffectEnabled: true}}>
        <NavigationContainer>
          <GestureHandlerRootView>
            <RootLayout />
          </GestureHandlerRootView>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
