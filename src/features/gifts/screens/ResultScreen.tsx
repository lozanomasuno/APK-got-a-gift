import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../../../components/PrimaryButton';
import { useGifts } from '../../../hooks/useGifts';
import { RootStackParamList } from '../types';

type ResultScreenProps = NativeStackScreenProps<RootStackParamList, 'Result'>;

export function ResultScreen({ navigation }: Readonly<ResultScreenProps>) {
  const { selectedGift, confirmSelectedGift } = useGifts();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (event) => {
      event.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!selectedGift) {
      navigation.replace('SurpriseBox');
    }
  }, [navigation, selectedGift]);

  const handleAccept = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    confirmSelectedGift();
    navigation.replace('SurpriseBox');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Este regalo es para ti</Text>
      <Text style={styles.subtitle}>Tu sorpresa ya fue elegida. Aceptala y sigue adelante.</Text>

      <View style={styles.giftCard}>
        <Text style={styles.giftText}>{selectedGift ?? 'Tu regalo aparecera aqui'}</Text>
      </View>

      <PrimaryButton
        label="Aceptar regalo (no se puede cambiar)"
        onPress={handleAccept}
        disabled={!selectedGift}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    color: '#1E3A8A',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#1D4ED8',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  giftCard: {
    minHeight: 160,
    alignSelf: 'stretch',
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#93C5FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E40AF',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
});
