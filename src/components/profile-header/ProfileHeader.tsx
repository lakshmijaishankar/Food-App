import { BackButton } from '@components/back-button/BackButton';
import { type ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

type ProfileHeaderProps = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  rightSection?: ReactNode;
};

export function ProfileHeader({
  title = 'Profile',
  containerStyle = { backgroundColor: '#fff' },
  rightSection,
}: ProfileHeaderProps) {
  return (
    <View style={[styles.profileHeaderContainer, containerStyle]}>
      <View style={styles.profileLeftContainer}>
        <BackButton />
        <Text style={styles.profileTitle}>{title}</Text>
      </View>
      {rightSection ?? <View style={styles.profileRightContainer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeaderContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBlock: 10,
  },
  profileTitle: {
    fontSize: 17,
    lineHeight: 22,
    marginInlineStart: 16,
  },
  profileLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 45,
    aspectRatio: 1,
    backgroundColor: '#ECF0F4',
    borderRadius: 100,
  },
});
