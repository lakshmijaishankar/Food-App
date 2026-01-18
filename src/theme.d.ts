import type {Font} from 'react-native-paper/src/types';

declare module 'react-native-paper' {
  export interface MD3Typescale {
    fonts: {
      bold: Font;
    };
  }
}
