import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  customText,
  TextInput,
  useTheme,
  RadioButton,
} from 'react-native-paper';
import color from 'color';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@components/social-login/GoogleLogin';
import EllipseIcon from '@assets/icons/Ellipse-1005.svg';
import CurveIcon from '@assets/icons/Curve.svg';
import { ControlledTextInput } from '@components/text-input/ControlledTextInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/nativeStackNavigator';

const Text = customText<'medium' | 'bold'>();

type LoginForm = {
  email: string;
  password: string;
};

const loginFormDefaultValues: LoginForm = {
  email: '',
  password: '',
};

export function Login() {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const form = useForm<LoginForm>({
    defaultValues: loginFormDefaultValues,
    mode: 'all',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { formState } = form;
  const { errors, isValid } = formState;

  const handleLogin = () => {
    if (isValid) {
      navigation.navigate('HomeDashboard');
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log('Forgot password pressed');
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={styles.loginWrapper}>
        <View style={styles.ellipseContainer}>
          <EllipseIcon width={177} height={177} />
        </View>
        <View style={styles.curveContainer}>
          <CurveIcon width={177} height={444} />
        </View>
        <View style={styles.loginOverlay}>
          <View style={styles.sectionPaperTop}>
            <View style={{ marginTop: 0 }}>
              <Text
                variant="bold"
                style={{
                  fontSize: 30,
                  color: '#fff',
                  textAlign: 'center',
                }}>
                Log In
              </Text>
              <Text
                style={{
                  color: color('#ffffff').alpha(0.85).toString(),
                  textAlign: 'center',
                  fontSize: 16,
                  lineHeight: 26,
                  marginTop: 3,
                }}>
                Please sign in to your existing account
              </Text>
            </View>
          </View>
          <View style={styles.sectionPaperBottom}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <Text variant="medium">EMAIL</Text>
                <ControlledTextInput
                  placeholder="example@gmail.com"
                  name="email"
                  control={form.control}
                  keyboardType="email-address"
                  rules={{
                    required: 'Email Required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  error={Boolean(errors.email?.message)}
                  errorHelper={errors.email?.message}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text variant="medium">PASSWORD</Text>
                <ControlledTextInput
                  placeholder="* * * * * * * * * *"
                  name="password"
                  control={form.control}
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={`eye-${showPassword ? '' : 'off-'}outline`}
                      onPress={() => setShowPassword(prev => !prev)}
                    />
                  }
                  rules={{ required: 'Password Required' }}
                  error={Boolean(errors.password?.message)}
                  errorHelper={errors.password?.message}
                />
              </View>
              <View style={styles.rememberForgotRow}>
                <View style={styles.rememberMeContainer}>
                  <RadioButton
                    value="remember"
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(prev => !prev)}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </View>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomSection}>
                <Button
                  mode="contained"
                  labelStyle={styles.loginBtnLabel}
                  style={styles.loginBtn}
                  onPress={isValid ? handleLogin : undefined}
                  buttonColor={color(theme.colors.primary)
                    .alpha(isValid ? 1 : 0.5)
                    .toString()}
                  contentStyle={styles.loginBtnContentStyle}>
                  LOG IN
                </Button>
                <View style={styles.signUpContainer}>
                  <Text style={styles.noAccountText}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signUpText}> SIGN UP</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.orText}>Or</Text>
                <View style={styles.socialContainer}>
                  <GoogleLogin />
                  {/* <TouchableOpacity
                    style={[styles.socialButton, styles.facebookButton]}
                    onPress={() => handleSocialLogin('google')}>
                    <Text style={styles.socialIcon}>f</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.socialButton, styles.twitterButton]}
                    onPress={() => handleSocialLogin('twitter')}>
                    <Text style={styles.socialIcon}>𝕏</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.socialButton, styles.appleButton]}
                    onPress={() => handleSocialLogin('apple')}>
                    <Text style={styles.socialIcon}>{''}</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginWrapper: {
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
  loginOverlay: {
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
    marginTop: 24,
  },
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 13,
    color: '#7E8A97',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#ff7622',
  },
  loginBtnLabel: {
    fontFamily: 'Sen-Bold',
    fontSize: 14,
  },
  loginBtn: {},
  loginBtnContentStyle: {
    minHeight: 62,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  noAccountText: {
    fontSize: 16,
    color: '#646982',
  },
  signUpText: {
    fontSize: 16,
    color: '#ff7622',
    fontFamily: 'Sen-Bold',
  },
  orText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#646982',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 20,
  },
  socialButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookButton: {
    backgroundColor: '#395998',
  },
  twitterButton: {
    backgroundColor: '#169CE8',
  },
  appleButton: {
    backgroundColor: '#1B1F2F',
  },
  socialIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
