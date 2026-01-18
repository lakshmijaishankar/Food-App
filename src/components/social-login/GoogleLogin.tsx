import {useCallback, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GoogleIcon from '@assets/icons/Google-G-Icon.svg';

export function GoogleLogin() {
  useEffect(() => {
    GoogleSignin.configure({});
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await GoogleSignin.signOut();
    const isPlayServicesAvailable = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    if (isPlayServicesAvailable) {
      GoogleSignin.signIn()
        .then(({data, type}) => {
          if (type === 'success') {
            console.log('Google Sign In Success', data);
          }
        })
        .catch(error => console.error('error', error));
    }
  }, []);

  return (
    <TouchableOpacity
      style={styles.googleLoginButton}
      onPress={loginWithGoogle}
      activeOpacity={1}>
      <GoogleIcon width={23} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleLoginButton: {
    minWidth: 62,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});
