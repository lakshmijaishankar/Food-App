import { ProfileHeader } from '@components/profile-header/ProfileHeader';
import { NativeStatusBar } from '@components/status-bar/NativeStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export function EditProfile() {
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'top']}
      style={{ flex: 1, backgroundColor: '#fff' }}>
      <NativeStatusBar />
      <ProfileHeader title="Edit Profile" />
    </SafeAreaView>
  );
}
