import { View, Text, Image } from "@react-pdf/renderer";
import type { EmergenciaData } from "@/types/apr";
import { styles } from "../styles";

export interface SignatureProps {
  emergencia: EmergenciaData;
}

export function Signature({ emergencia }: SignatureProps) {
  const temImagem = !!emergencia.assinaturaDataUrl;
  const temTexto = !!emergencia.assinatura;
  const timestamp = emergencia.assinaturaTimestamp;

  return (
    <View style={{ marginTop: 8 }}>
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>Bombeiro:</Text>
        <Text style={styles.fieldValue}>{emergencia.bombeiro || "-"}</Text>
      </View>
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>Ambulancia:</Text>
        <Text style={styles.fieldValue}>{emergencia.ambulancia || "-"}</Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={[styles.fieldLabel, { marginBottom: 4 }]}>Assinatura:</Text>

        {temImagem ? (
          <Image
            src={emergencia.assinaturaDataUrl!}
            style={{ width: 220, height: 80, objectFit: "contain" }}
          />
        ) : temTexto ? (
          <View>
            <Text
              style={{
                fontSize: 14,
                fontStyle: "italic",
                borderBottomWidth: 1,
                borderBottomColor: "#000",
                paddingBottom: 2,
                minWidth: 250,
                alignSelf: "flex-start",
              }}
            >
              {emergencia.assinatura}
            </Text>
          </View>
        ) : (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              width: 250,
              height: 20,
            }}
          />
        )}

        {timestamp && (
          <Text style={{ fontSize: 8, color: "#666", marginTop: 4 }}>
            Assinado em {new Date(timestamp).toLocaleString("pt-BR")}
          </Text>
        )}
      </View>
    </View>
  );
}
