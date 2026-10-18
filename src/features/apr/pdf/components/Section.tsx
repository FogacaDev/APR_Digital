import type { ReactNode } from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}
