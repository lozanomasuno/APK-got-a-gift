import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../../../components/PrimaryButton';
import { useGifts } from '../../../hooks/useGifts';
import { ProgressCounter } from '../components/ProgressCounter';
import { RootStackParamList } from '../types';

type SurpriseBoxScreenProps = NativeStackScreenProps<RootStackParamList, 'SurpriseBox'>;

export function SurpriseBoxScreen({ navigation }: Readonly<SurpriseBoxScreenProps>) {
  const {
    hasConfiguredGifts,
    selectedGift,
    used,
    available,
    drawRandomGift,
    hasCompletedAll,
  } = useGifts();

  const [isDrawing, setIsDrawing] = useState(false);
  const [message, setMessage] = useState('Confia en el proceso. Tu proximo regalo te espera.');

  useEffect(() => {
    if (!hasConfiguredGifts) {
      navigation.replace('Setup');
    }
  }, [hasConfiguredGifts, navigation]);

  useEffect(() => {
    if (selectedGift) {
      navigation.replace('Result');
    }
  }, [navigation, selectedGift]);

  const buttonLabel = useMemo(() => {
    if (hasCompletedAll) {
      return 'No hay mas regalos';
    }

    return isDrawing ? 'Mezclando sorpresa...' : '🎁 Sacar regalo';
  }, [hasCompletedAll, isDrawing]);

  const handleDraw = async () => {
    if (hasCompletedAll || isDrawing) {
      setMessage('Ya abriste todos tus regalos 🎉');
      return;
    }

    if (!available.length) {
      setMessage('Ya abriste todos tus regalos 🎉');
      return;
    }

    const gift = drawRandomGift();

    if (!gift) {
      setMessage('Ya abriste todos tus regalos 🎉');
      return;
    }

    setIsDrawing(true);
    setMessage('Respira hondo... la caja esta eligiendo por ti.');

    setTimeout(async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsDrawing(false);
      navigation.replace('Result');
    }, 900);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caja de Sorpresa</Text>
      <Text style={styles.subtitle}>{message}</Text>

      <View style={styles.boxContainer}>
        <Text style={styles.boxEmoji}>🎁</Text>
      </View>

      <PrimaryButton
        label={buttonLabel}
        onPress={handleDraw}
        disabled={isDrawing || hasCompletedAll}
        style={styles.mainButton}
      />

      <ProgressCounter openedCount={used.length} totalCount={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFEFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 18,
  },
  title: {
    color: '#155E75',
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#0F766E',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  boxContainer: {
    width: 180,
    height: 180,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCFBF1',
    borderWidth: 2,
    borderColor: '#5EEAD4',
  },
  boxEmoji: {
    fontSize: 78,
  },
  mainButton: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
});
