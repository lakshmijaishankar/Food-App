import { BackButton } from '@components/back-button/BackButton';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export function ProfileHeader() {
  return (
    <View style={styles.profileHeaderContainer}>
      <View style={styles.profileLeftContainer}>
        <BackButton />
        <Text style={styles.profileTitle}>Profile</Text>
      </View>
      <View style={styles.profileRightContainer} />
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
