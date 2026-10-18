import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export interface HeaderProps {
  id: string;
  data: string;
  horario: string;
}

export function Header({ id, data, horario }: HeaderProps) {
  return (
    <View style={styles.headerContainer} fixed>
      <View>
        <Text style={styles.headerTitle}>APR DIGITAL</Text>
        <Text style={styles.headerSubtitle}>
          Analise Preliminar de Risco - Gerenciamento de Risco Critico
        </Text>
      </View>
      <View style={styles.headerMeta}>
        <Text style={styles.headerMetaLine}>ID: {id.slice(0, 8)}</Text>
        <Text style={styles.headerMetaLine}>
          {data || "---"} as {horario || "---"}
        </Text>
      </View>
    </View>
  );
}
