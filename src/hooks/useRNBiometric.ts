import { useCallback, useEffect, useRef } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';

export function useRNBiometric() {
  const nativeBiometric = useRef(new ReactNativeBiometrics());

  const promptSimpleBiometric = useCallback(() => {
    return nativeBiometric.current?.simplePrompt({
      promptMessage: 'Unlock the device to use FoodApp',
    });
  }, []);

  const hanldeNativeBiometric = useCallback(async () => {
    const { biometryType } = await nativeBiometric.current?.isSensorAvailable();
    switch (biometryType) {
      case 'TouchID': {
        break;
      }
      case 'Biometrics': {
        const { error } = await promptSimpleBiometric();
        if (error) {
          promptSimpleBiometric();
        }
        break;
      }
      case 'FaceID': {
        break;
      }
      default:
    }
  }, [promptSimpleBiometric]);

  useEffect(() => {
    hanldeNativeBiometric();
  }, [hanldeNativeBiometric]);
}
