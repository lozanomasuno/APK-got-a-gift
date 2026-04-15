import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type PrimaryButtonProps = Readonly<{
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}>;

export function PrimaryButton({ label, onPress, disabled = false, style }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#134E4A',
    paddingHorizontal: 20,
  },
  label: {
    color: '#ECFDF5',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.55,
  },
});
