import {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Button, customText, TextInput, useTheme} from 'react-native-paper';
import color from 'color';
import {useForm} from 'react-hook-form';
import {ControlledTextInput} from '@components/text-input/ControlledTextInput';
import EllipseIcon from '@assets/icons/Ellipse-1005.svg';
import CurveIcon from '@assets/icons/Curve.svg';
import BackIcon from '@assets/icons/Back.svg';
import {useKeyBoardVisible} from '@hooks/useKeyBoardVisible';

const Text = customText<'medium' | 'bold'>();

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  reTypedPassword: string;
};

const signUpFormDefaultValues: SignUpForm = {
  name: '',
  email: '',
  password: '',
  reTypedPassword: '',
};

export function SignUp() {
  const theme = useTheme();
  const navigation = useNavigation();
  const form = useForm<SignUpForm>({
    defaultValues: signUpFormDefaultValues,
    mode: 'all',
  });
  const [showPassword, setShowPassword] = useState({
    showPwd: false,
    showReTypedPwd: false,
  });
  const isKeyboardVisible = useKeyBoardVisible();

  const {showPwd, showReTypedPwd} = showPassword;
  const {formState} = form;
  const {errors, isValid} = formState;

  return (
    <SafeAreaView style={style.safeArea} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : isKeyboardVisible
            ? 'height'
            : undefined
        }>
        <View style={style.signupWrapper}>
          <View style={style.ellipseContainer}>
            <EllipseIcon width={177} height={177} />
          </View>
          <View style={style.curveContainer}>
            <CurveIcon width={177} height={444} />
          </View>
          <View style={style.signupOverlay}>
            <View style={style.sectionPaperTop}>
              <View style={{flexDirection: 'row'}}>
                <Button
                  mode="contained"
                  style={style.goBackBtn}
                  labelStyle={{marginHorizontal: 0}}
                  onPress={() => navigation.goBack()}>
                  <BackIcon />
                </Button>
              </View>
              <View style={{marginTop: 24}}>
                <Text
                  variant="bold"
                  style={{
                    fontSize: 30,
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Sign Up
                </Text>
                <Text
                  style={{
                    color: color('#ffffff').alpha(0.85).toString(),
                    textAlign: 'center',
                    fontSize: 16,
                    lineHeight: 26,
                    marginTop: 3,
                  }}>
                  Please sign up to get started
                </Text>
              </View>
            </View>
            <View style={style.sectionPaperBottom}>
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  <View>
                    <Text variant="medium">NAME</Text>
                    <ControlledTextInput
                      placeholder="name"
                      name="name"
                      control={form.control}
                      rules={{required: 'Name Required'}}
                      error={Boolean(errors.name?.message)}
                      errorHelper={errors.name?.message}
                      autoCorrect={false}
                      autoCapitalize="words"
                    />
                  </View>
                  <View style={style.inputWrapper}>
                    <Text variant="medium">EMAIL</Text>
                    <ControlledTextInput
                      placeholder="foodapp@gmail.com"
                      name="email"
                      control={form.control}
                      keyboardType="email-address"
                      rules={{required: 'Email Required'}}
                      error={Boolean(errors.email?.message)}
                      errorHelper={errors.email?.message}
                    />
                  </View>
                  <View style={style.inputWrapper}>
                    <Text variant="medium">PASSWORD</Text>
                    <ControlledTextInput
                      placeholder="* * * * * * * * * *"
                      name="password"
                      control={form.control}
                      secureTextEntry={!showPwd}
                      right={
                        <TextInput.Icon
                          icon={`eye-${showPwd ? '' : 'off-'}outline`}
                          onPress={() =>
                            setShowPassword(prev => ({
                              ...prev,
                              showPwd: !prev.showPwd,
                            }))
                          }
                        />
                      }
                      rules={{required: 'Password Required'}}
                      error={Boolean(errors.password?.message)}
                      errorHelper={errors.password?.message}
                    />
                  </View>
                  <View style={style.inputWrapper}>
                    <Text variant="medium">RE-TYPE PASSWORD</Text>
                    <ControlledTextInput
                      control={form.control}
                      name="reTypedPassword"
                      placeholder="* * * * * * * * * *"
                      secureTextEntry={!showReTypedPwd}
                      right={
                        <TextInput.Icon
                          icon={`eye-${showReTypedPwd ? '' : 'off-'}outline`}
                          onPress={() =>
                            setShowPassword(prev => ({
                              ...prev,
                              showReTypedPwd: !prev.showReTypedPwd,
                            }))
                          }
                        />
                      }
                      rules={{required: 'Re-type Password Required'}}
                      error={Boolean(errors.reTypedPassword?.message)}
                      errorHelper={errors.reTypedPassword?.message}
                    />
                  </View>
                </ScrollView>
                <Button
                  mode="contained"
                  labelStyle={style.signUpBtnLabel}
                  style={style.signUpBtn}
                  onPress={isValid ? () => {} : undefined}
                  buttonColor={color(theme.colors.primary)
                    .alpha(isValid ? 1 : 0.5)
                    .toString()}
                  contentStyle={style.signBtnContentStyle}>
                  SIGN UP
                </Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  signupWrapper: {
    flex: 1,
    backgroundColor: '#121223',
    position: 'relative',
  },
  ellipseContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 111,
  },
  curveContainer: {
    position: 'absolute',
    top: 0,
    right: -35,
  },
  signupOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  safeArea: {
    flex: 1,
  },
  sectionPaperTop: {
    flex: 1,
    justifyContent: 'center',
    paddingInline: 24,
    zIndex: 111,
  },
  sectionPaperBottom: {
    backgroundColor: '#fff',
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingInline: 24,
    paddingBlockStart: 24,
  },
  inputWrapper: {
    marginTop: 30,
  },
  signUpBtnLabel: {
    fontFamily: 'Sen-Bold',
    fontSize: 14,
  },
  signUpBtn: {},
  signBtnContentStyle: {
    minHeight: 62,
  },
  goBackBtn: {
    display: 'flex',
    minWidth: 45,
    backgroundColor: '#fff',
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
