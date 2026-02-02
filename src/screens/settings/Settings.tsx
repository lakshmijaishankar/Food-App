import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { ProfileHeader } from '@components/profile-header/ProfileHeader';
import { NativeStatusBar } from '@components/status-bar/NativeStatusBar';
import { useState } from 'react';

export function Settings() {
  const [lockEnabled, setLockEnabled] = useState(false);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <NativeStatusBar />
      <View style={styles.content}>
        <ProfileHeader showRightSection={false} />
        <View style={styles.card}>
          <View style={styles.textContainer}>
            <Text>Lock Screen Unlock</Text>
            <Text style={styles.description}>
              Use your device lock (PIN, Fingerprint or Face ID) to unlock the
              app
            </Text>
          </View>
          <Switch value={lockEnabled} onValueChange={setLockEnabled} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
  },
  card: {
    marginTop: 12,
    // paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  description: {
    marginTop: 4,
    color: '#6B7280',
  },
});
