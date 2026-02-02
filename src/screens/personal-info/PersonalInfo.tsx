import { ProfileHeader } from '@components/profile-header/ProfileHeader';
import { ProfileSectionItem } from '@components/profile-section-item/ProfileSectionItem';
import { NativeStatusBar } from '@components/status-bar/NativeStatusBar';
import { useAppSelector } from '@store/hooks';
import Color from 'color';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileIcon from '@assets/icons/Profile-Icon.svg';
import EmailIcon from '@assets/icons/Email-Icon.svg';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/nativeStackNavigator';

type PersonalInfoProps = { navigation: NavigationProp<RootStackParamList> };

export function PersonalInfo(props: PersonalInfoProps) {
  const theme = useTheme();
  const { user } = useAppSelector(({ user: userInfo }) => userInfo);
  const { name = 'John Doe', email } = user ?? {};

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={styles.safeAreaCotainer}>
      <NativeStatusBar />
      <View style={{ paddingInline: 26 }}>
        <ProfileHeader
          title="Personal Info"
          rightSection={
            <Text
              style={styles.editText}
              onPress={() => props.navigation.navigate('EditProfile')}>
              EDIT
            </Text>
          }
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 100,
              aspectRatio: 1,
              borderRadius: 100,
              backgroundColor: Color(theme.colors.primary)
                .alpha(0.5)
                .toString(),
            }}
          />
          <View style={{ marginInlineStart: 16 }}>
            <Text variant="bold" style={{ fontSize: 20 }}>
              Lakhmi Venkatesh J
            </Text>
            <Text
              variant="regular"
              style={{
                fontSize: 14,
                marginTop: 8,
                lineHeight: 24,
                color: '#A0A5BA',
              }}>
              I love fast food
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 32,
            backgroundColor: '#F6F8FA',
            borderRadius: 16,
          }}>
          <ProfileSectionItem
            title={
              <View>
                <Text variant="bold">FULL NAME</Text>
                <Text
                  variant="regular"
                  style={{ fontSize: 14, color: '#6B6E82' }}>
                  {name}
                </Text>
              </View>
            }
            leftIcon={<ProfileIcon />}
          />
          <ProfileSectionItem
            title={
              <View>
                <Text variant="bold">EMAIL</Text>
                <Text
                  variant="regular"
                  style={{ fontSize: 14, color: '#6B6E82' }}>
                  {email}
                </Text>
              </View>
            }
            leftIcon={<EmailIcon />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaCotainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  editText: {
    color: '#FF7622',
    fontSize: 14,
    lineHeight: 24,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#FF7622',
  },
});
