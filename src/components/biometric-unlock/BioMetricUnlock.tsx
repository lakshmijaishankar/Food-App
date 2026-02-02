import Color from 'color';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Modal, Text, useTheme } from 'react-native-paper';

export function BioMetricUnlock() {
  const [modalVisible, setModalVisible] = useState(true);
  const nativeBiometric = useRef(new ReactNativeBiometrics());
  const theme = useTheme();

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
          setModalVisible(prev => !prev);
        } else {
          setModalVisible(false);
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

  return (
    <Modal
      visible={modalVisible}
      dismissable={false}
      contentContainerStyle={{
        backgroundColor: '#fff',
        borderRadius: 8,
      }}
      style={{
        backgroundColor: Color('#121223').alpha(0.5).toString(),
        paddingInline: 16,
        marginTop: 0,
        marginBottom: 0,
      }}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: Color('#000').alpha(0.2).toString(),
        }}>
        <Text variant="bold" style={{ textAlign: 'center', fontSize: 20 }}>
          FoodApp is locked
        </Text>
        <Text style={{ marginTop: 10 }}>
          Authentication is required to access the FoodApp app
        </Text>
      </View>
      <Pressable
        onPress={() => {
          setModalVisible(false);
          hanldeNativeBiometric();
        }}>
        <Text
          style={{
            textAlign: 'center',
            padding: 16,
            color: theme.colors.primary,
          }}>
          Unlock now
        </Text>
      </Pressable>
    </Modal>
  );
}
