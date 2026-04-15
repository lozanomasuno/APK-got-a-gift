import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../../../components/PrimaryButton';
import { useGifts } from '../../../hooks/useGifts';
import { RootStackParamList } from '../types';

type SetupScreenProps = NativeStackScreenProps<RootStackParamList, 'Setup'>;

const INPUT_COUNT = 10;
const INPUT_IDS = Array.from({ length: INPUT_COUNT }, (_, index) => `gift-${index + 1}`);

function initialValues(values: string[]) {
  if (values.length === INPUT_COUNT) {
    return values;
  }

  return Array.from({ length: INPUT_COUNT }, () => '');
}

export function SetupScreen({ navigation }: Readonly<SetupScreenProps>) {
  const { gifts, saveGifts } = useGifts();
  const [inputs, setInputs] = useState<string[]>(() => initialValues(gifts));
  const [error, setError] = useState<string | null>(null);

  const completed = useMemo(
    () => inputs.filter((gift) => gift.trim().length > 0).length,
    [inputs]
  );

  const handleChange = (index: number, value: string) => {
    setInputs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSave = () => {
    const trimmed = inputs.map((gift) => gift.trim());

    if (trimmed.some((gift) => !gift)) {
      setError('Completa los 10 regalos para continuar.');
      return;
    }

    const unique = new Set(trimmed.map((gift) => gift.toLowerCase()));
    if (unique.size !== INPUT_COUNT) {
      setError('Cada regalo debe ser unico y no repetirse.');
      return;
    }

    saveGifts(trimmed);
    setError(null);
    navigation.replace('SurpriseBox');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>10 Regalos</Text>
      <Text style={styles.subtitle}>Escribe tus regalos personales y confia en el proceso.</Text>
      <Text style={styles.progress}>{`${completed}/10 completados`}</Text>

      <ScrollView style={styles.form} contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
        {inputs.map((value, index) => (
          <View key={INPUT_IDS[index]} style={styles.inputGroup}>
            <Text style={styles.label}>{`Regalo ${index + 1}`}</Text>
            <TextInput
              value={value}
              onChangeText={(text) => handleChange(index, text)}
              placeholder="Ejemplo: Cena especial"
              placeholderTextColor="#6B7280"
              maxLength={60}
              style={styles.input}
            />
          </View>
        ))}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>

      <PrimaryButton label="Guardar regalos" onPress={handleSave} style={styles.saveButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#7C2D12',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#92400E',
  },
  progress: {
    marginTop: 10,
    fontSize: 13,
    color: '#B45309',
    fontWeight: '700',
  },
  form: {
    marginTop: 16,
    flex: 1,
  },
  formContent: {
    paddingBottom: 12,
    gap: 12,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: '#78350F',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#1F2937',
    fontSize: 15,
  },
  error: {
    marginTop: 8,
    color: '#B91C1C',
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 12,
  },
});
