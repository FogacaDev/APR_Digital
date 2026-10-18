import { View, Text } from "@react-pdf/renderer";
import type { ControleCritico } from "@/features/apr/data/risks";
import type { RespostaControle } from "@/types/apr";
import { styles } from "../styles";

export interface ControlsTableProps {
  controles: ControleCritico[];
  respostas: Record<string, RespostaControle>;
}

function label(valor: RespostaControle): string {
  if (valor === "sim") return "SIM";
  if (valor === "nao") return "NAO";
  if (valor === "nao_aplica") return "N/A";
  return "-";
}

function respStyle(valor: RespostaControle) {
  if (valor === "sim") return [styles.tableCellResp, styles.tableCellRespSim];
  if (valor === "nao") return [styles.tableCellResp, styles.tableCellRespNao];
  if (valor === "nao_aplica") return [styles.tableCellResp, styles.tableCellRespNA];
  return styles.tableCellResp;
}

export function ControlsTable({ controles, respostas }: ControlsTableProps) {
  return (
    <View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableCellText}>Controle Critico</Text>
        <Text style={styles.tableCellResp}>Resposta</Text>
      </View>
      {controles.map((controle, idx) => {
        const valor = respostas[controle.id] ?? null;
        return (
          <View
            key={controle.id}
            style={idx % 2 === 1 ? [styles.tableRow, styles.tableRowAlt] : styles.tableRow}
            wrap={false}
          >
            <Text style={styles.tableCellText}>
              {controle.texto}
              {controle.obrigatorio ? " *" : ""}
            </Text>
            <Text style={respStyle(valor)}>{label(valor)}</Text>
          </View>
        );
      })}
    </View>
  );
}
