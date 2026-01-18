import type {ThemeProp} from 'react-native-paper/lib/typescript/types';

export const theme: ThemeProp = {
  colors: {
    background: '#ffffff',
    onBackground: '#32343E',
    primary: '#ff7622',
    onPrimary: '#ffffff',
    secondary: '#F0F5FA',
    onSecondary: '#32343E',
    error: '#FF3326',
    onError: '#FF3326',
    onSurface: '#32343E',
  },
  roundness: 3,
  fonts: {
    medium: {
      fontFamily: 'Sen-Medium',
      fontStyle: 'normal',
    },
    regular: {
      fontFamily: 'Sen-Regular',
      fontStyle: 'normal',
    },
    labelLarge: {},
    default: {
      fontFamily: 'Sen-Regular',
      fontStyle: 'normal',
    },
    extraBold: {
      fontFamily: 'Sen-ExtraBold',
      fontStyle: 'normal',
    },
    bold: {
      fontFamily: 'Sen-Bold',
      fontStyle: 'normal',
    },
  },
};
