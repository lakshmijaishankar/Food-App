import color from 'color';
import { useCallback, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  Pagination,
  type ICarouselInstance,
} from 'react-native-reanimated-carousel';
import { OnBoardingStep } from './OnBoardingStep';
import { onBoardingSteps } from '@db/onBoardingSteps.json';
import { NativeStatusBar } from '@components/status-bar/NativeStatusBar';
import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/nativeStackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const dimemsion = Dimensions.get('window');
const SAFE_MARGIN_INLINE = 24;

export function OnBoarding() {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { navigate } = navigation;

  const onPressPagination = useCallback(
    (index: number) => {
      ref.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      });
      if (index === onBoardingSteps.length) {
        navigate('Login');
      }
    },
    [progress.value, navigate],
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={style.safeArea}>
      <NativeStatusBar />
      <View style={style.wrapper}>
        <View style={style.container}>
          <Carousel
            ref={ref}
            data={onBoardingSteps}
            vertical={false}
            width={dimemsion.width}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <View style={style.contentContainer} key={item.id}>
                <OnBoardingStep
                  title={item.title}
                  shortMess={item.shortMess}
                  id={item.id}
                  resizeMode="contain"
                />
              </View>
            )}
            containerStyle={style.carouselContainer}
            loop={false}
          />
          <View style={style.bottomSection}>
            <Pagination.Basic
              data={onBoardingSteps}
              progress={progress}
              dotStyle={style.paginationStyle}
              activeDotStyle={{
                backgroundColor: colors.primary,
              }}
              containerStyle={{ marginBlockStart: 32 }}
            />
            <View>
              <Button
                mode="contained"
                onPress={() => onPressPagination(progress.value + 1)}
                contentStyle={{ minHeight: 62, borderRadius: 20 }}>
                NEXT
              </Button>
              <Button
                mode="text"
                style={{ marginBlockStart: 12 }}
                contentStyle={style.skipButtonContentStyle}
                textColor={color('#646982').toString()}
                onPress={() => navigation.navigate('Login')}
                labelStyle={style.skipButtonLabelStyle}>
                Skip
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  carouselContainer: {
    flex: 2.5,
    backgroundColor: color('#ffffff').alpha(1).toString(),
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'space-between',
    marginInline: SAFE_MARGIN_INLINE,
  },
  paginationStyle: {
    backgroundColor: '#FFE1CE',
    width: 10,
    aspectRatio: 1,
    borderRadius: '100%',
    marginInline: 2,
  },
  skipButtonLabelStyle: { fontSize: 16, fontFamily: 'Sen-Bold' },
  skipButtonContentStyle: {
    minHeight: 62,
  },
  contentContainer: {
    height: '100%',
  },
  wrapper: {
    flex: 1,
    backgroundColor: color('#ffffff').alpha(1).toString(),
  },
  safeArea: {
    flex: 1,
  },
});
