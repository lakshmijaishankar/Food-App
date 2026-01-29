import React, { useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Vibration,
} from 'react-native';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Color from 'color';

const { width } = Dimensions.get('window');
const TAB_HEIGHT = 89;
const CIRCLE_SIZE = 70;

export function SlidingTabBar(props: BottomTabBarProps) {
  const { state, navigation, descriptors } = props;
  const tabWidth = width / state.routes.length;
  const translateX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    translateX.value = withTiming(state.index * tabWidth, {
      duration: 300,
    });
  }, [state.index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value + tabWidth / 2 - CIRCLE_SIZE / 2 },
    ],
  }));

  const navigateToScreen = useCallback(
    (screenName: string) => {
      Vibration.vibrate(50);
      navigation.navigate(screenName);
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />
      {state.routes?.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigateToScreen(route.name)}
            style={styles.tab}
            activeOpacity={0.8}>
            {options.tabBarIcon?.({ focused, color: '#fff', size: 10 })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: TAB_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  circle: {
    position: 'absolute',
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: Color('#FF7622').alpha(0.3).toString(),
    top: (TAB_HEIGHT - CIRCLE_SIZE) / 2,
    zIndex: 1,
    borderColor: '#FF7622',
    borderWidth: 1,
  },
  wrapper: {
    backgroundColor: 'gold',
    minHeight: TAB_HEIGHT,
  },
});
