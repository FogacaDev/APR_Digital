import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text style={styles.fieldValue}>{value || "-"}</Text>
    </View>
  );
}
