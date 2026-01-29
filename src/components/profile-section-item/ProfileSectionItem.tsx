import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type ProfileSectionItemProps = {
  title: string;
  leftIcon: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  isDestructive?: boolean;
};

export function ProfileSectionItem({
  title,
  leftIcon,
  rightIcon,
  onPress,
  isDestructive = false,
}: ProfileSectionItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={() => ({
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        paddingHorizontal: 20,
      })}>
      {/* Left Icon */}
      <View style={styles.leftIcon}>{leftIcon}</View>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text variant="regular" style={styles.title}>
          {title}
        </Text>
      </View>
      {/* Right Icon */}
      {rightIcon && <View>{rightIcon}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    width: 40,
    aspectRatio: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 100,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    color: '#32343E',
  },
});
