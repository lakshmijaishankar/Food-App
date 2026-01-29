import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/home-screen/home';
import ProfileIcon from '@assets/icons/Profile-Icon.svg';
import MenuIcon from '@assets/icons/Menu-Icon.svg';
import NotificationIcon from '@assets/icons/Notification-Icon.svg';
import MenuGridIcon from '@assets/icons/Menu-Grid-Icon.svg';
import PlusIcon from '@assets/icons/Plus.svg';
import { SlidingTabBar } from './SlidingTabBar';
import { Notification } from '@screens/notification/Notification';
import { Profile } from '@screens/profile/Profile';
import { HomeDashboard } from '@screens/home-dashboard/HomeDashboard';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator, Screen } = createBottomTabNavigator();

export function MainBottomNavigation() {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Navigator
        tabBar={props => <SlidingTabBar {...props} />}
        initialRouteName="Profile"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            // minHeight: 89,
            // borderTopLeftRadius: 30,
            // borderTopRightRadius: 30,
          },
          tabBarPosition: 'bottom',
          // tabBarHideOnKeyboard: true,
          // tabBarItemStyle: {
          //   flex: 0,
          //   flexDirection: 'column',
          //   justifyContent: 'center',
          //   width: diemensions.width / 4,
          //   flexShrink: 0,
          // },
          // tabBarShowLabel: false,
          // tabBarButton: props => (
          //   <TouchableOpacity activeOpacity={1} {...props} />
          // ),
        }}>
        <Screen
          name="MenuApp"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <MenuGridIcon />,
          }}
        />
        <Screen
          name="Menu"
          component={HomeScreen}
          options={{ tabBarIcon: () => <MenuIcon /> }}
        />
        <Screen
          name="Home"
          component={HomeDashboard}
          options={{ tabBarIcon: () => <PlusIcon /> }}
        />
        <Screen
          name="Notification"
          component={Notification}
          options={{ tabBarIcon: () => <NotificationIcon /> }}
        />
        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => <ProfileIcon />,
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
}
