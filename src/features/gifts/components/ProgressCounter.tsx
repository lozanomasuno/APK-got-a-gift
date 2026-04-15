import { StyleSheet, Text, View } from 'react-native';

type ProgressCounterProps = Readonly<{
  openedCount: number;
  totalCount?: number;
}>;

export function ProgressCounter({ openedCount, totalCount = 10 }: ProgressCounterProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{`${openedCount} de ${totalCount} regalos abiertos`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#D1FAE5',
  },
  label: {
    color: '#065F46',
    fontSize: 13,
    fontWeight: '700',
  },
});
