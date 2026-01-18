import {Image, ImageProps, StyleSheet, View} from 'react-native';
import {customText} from 'react-native-paper';

type OnBoardingStepProp = {
  title: string;
  shortMess: string;
  id?: number;
} & Pick<ImageProps, 'source' | 'alt' | 'resizeMode'>;

const Text = customText<'extraBold' | 'regular'>();

const IMAGE_SROURCES: Record<number, any> = {
  '1': require('@assets/icons/Onboarding_01.png'),
  '2': require('@assets/icons/Onboarding_02.png'),
  '3': require('@assets/icons/Onboarding_03.png'),
};

export function OnBoardingStep(props: OnBoardingStepProp) {
  const {source, shortMess, title, resizeMode, id} = props;

  return (
    <>
      <View style={style.imgContainer}>
        <Image
          source={id ? IMAGE_SROURCES[id] : source}
          resizeMode={resizeMode}
          style={style.image}
          accessibilityLabel="Onboarding image"
        />
      </View>
      <View style={style.contentContainer}>
        <Text variant="extraBold" style={style.textTitle}>
          {title}
        </Text>
        <Text style={style.textShortMess} variant="regular">
          {shortMess}
        </Text>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  textShortMess: {
    textAlign: 'center',
    color: '#646982',
    lineHeight: 24,
    fontSize: 16,
    marginBlockStart: 18,
  },
  textTitle: {fontSize: 24, textAlign: 'center'},
  image: {
    maxWidth: '100%',
    height: '100%',
    width: '100%',
    display: 'flex',
  },
  contentContainer: {
    justifyContent: 'center',
    paddingInline: 10,
  },
  imgContainer: {
    flex: 1,
  },
});
