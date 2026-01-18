import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function NativeStatusBar({
  bgColor = '#ffffff',
  height = 0,
}: {
  bgColor?: string;
  height?: number;
}) {
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
