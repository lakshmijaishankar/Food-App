import { type ReactNode, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '@assets/icons/Back.svg';

interface BackButtonProps {
  bgColor?: string;
  height?: number;
  width?: number;
  onPress?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  rippleColor?: string;
  borderRadius?: number;
  style?: object;
  contentStyle?: object;
  labelStyle?: object;
  testID?: string;
}

export function BackButton({
  bgColor = '#ECF0F4',
  height = 45,
  width = 45,
  onPress,
  icon,
  disabled = false,
  mode = 'contained',
  rippleColor,
  borderRadius = 100,
  style,
  contentStyle,
  labelStyle = { color: '#000', marginInline: 0 },
  testID,
}: BackButtonProps) {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  }, [onPress, navigation]);

  return (
    <Button
      mode={mode}
      onPress={handlePress}
      disabled={disabled}
      rippleColor={rippleColor}
      testID={testID}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          height,
          width,
          borderRadius,
        },
        style,
      ]}
      contentStyle={[
        styles.content,
        {
          height,
          width,
        },
        contentStyle,
      ]}
      labelStyle={labelStyle}
      children={icon ?? <BackIcon style={{ transform: [{ scale: 0.7 }] }} />}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    minWidth: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
