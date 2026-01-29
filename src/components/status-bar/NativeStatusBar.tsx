import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function NativeStatusBar(props: { bgColor?: string; height?: number }) {
  const theme = useTheme();
  const { colors } = theme;
  let { bgColor = colors.primary, height } = props;
  const safeTopHeight = useSafeAreaInsets()?.top;

  return (
    <View
      style={{
        height: safeTopHeight ? safeTopHeight : height,
        backgroundColor: bgColor,
      }}
    />
  );
}
