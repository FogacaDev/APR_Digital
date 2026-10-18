import { View, Text } from "@react-pdf/renderer";
import { styles } from "../styles";

export interface NABlockProps {
  nome: string;
  origem: "triagem" | "secao" | "individual";
}

export function NABlock({ nome, origem }: NABlockProps) {
  const origemTexto =
    origem === "triagem"
      ? "declarado na triagem"
      : origem === "secao"
        ? "declarado na secao"
        : "declarado individualmente";
  return (
    <View style={styles.naBlock} wrap={false}>
      <Text style={styles.naBlockTitle}>{nome}</Text>
      <Text style={styles.naBlockSubtitle}>
        Nao aplicavel a atividade ({origemTexto})
      </Text>
    </View>
  );
}
