import { type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { ProfileHeader } from '@components/profile-header/ProfileHeader';
import { NativeStatusBar } from '@components/status-bar/NativeStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import Color from 'color';
import ProfileIcon from '@assets/icons/Profile-Icon.svg';
import CartIcon from '@assets/icons/Cart-Icon.svg';
import HeartIcon from '@assets/icons/Favourite-Icon.svg';
import LogoutIcon from '@assets/icons/Logout-Icon.svg';
import FaqIcon from '@assets/icons/Faq-Icon.svg';
import ReviewIcon from '@assets/icons/Review-Icon.svg';
import SettingIcon from '@assets/icons/Setting-Icon.svg';
import AddressIcon from '@assets/icons/Address-Icon.svg';
import ProbileMenu from '@db/accountMenu.json';
import PaymentIcon from '@assets/icons/Payment-Icon.svg';
import NotificationIcon from '@assets/icons/Notification-Icon.svg';
import ArrowRightIcon from '@assets/icons/Back.svg';
import { ProfileSectionItem } from '@components/profile-section-item/ProfileSectionItem';

const ICONS_GROUP: Record<string, ReactNode> = {
  user: <ProfileIcon />,
  map: <AddressIcon />,
  cart: <CartIcon />,
  heart: <HeartIcon />,
  logout: <LogoutIcon />,
  help: <FaqIcon />,
  reviews: <ReviewIcon />,
  settings: <SettingIcon />,
  card: <PaymentIcon />,
  bell: <NotificationIcon />,
};

export function Profile() {
  const theme = useTheme();
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
      <NativeStatusBar />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ paddingInline: 26, flex: 1 }}>
          <ProfileHeader />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 62 }}
            showsVerticalScrollIndicator={false}>
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
            <View style={{ marginTop: 16 }}>
              {ProbileMenu.sections.map(section => (
                <View
                  key={section.id}
                  style={{
                    marginBottom: 20,
                    backgroundColor: '#F6F8FA',
                    borderRadius: 16,
                  }}>
                  {section.items.map(item => (
                    <ProfileSectionItem
                      key={item.id}
                      title={item.title}
                      leftIcon={ICONS_GROUP[item.icon]}
                      rightIcon={
                        <ArrowRightIcon
                          style={{
                            transform: [{ rotate: '180deg' }, { scale: 0.7 }],
                          }}
                        />
                      }
                      onPress={() => {
                        if (item.id === 'logout') {
                          // logout logic
                          return;
                        }
                        // navigation.navigate(item.route)
                      }}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
