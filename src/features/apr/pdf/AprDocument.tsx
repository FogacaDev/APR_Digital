import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { AprDraft } from "@/types/apr";
import { getRiskById } from "@/features/apr/data/risks";
import { getEpiById } from "@/features/apr/data/epis";
import { styles, SIZES, COLORS } from "./styles";
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { Field } from "./components/Field";
import { ControlsTable } from "./components/ControlsTable";
import { NABlock } from "./components/NABlock";
import { Signature } from "./components/Signature";

export function AprDocument({ draft }: { draft: AprDraft }) {
  const riscosAplicaveis = Object.entries(draft.triagem)
    .filter(([, estado]) => estado === "aplicavel")
    .map(([id]) => getRiskById(id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const riscosNA = Object.entries(draft.triagem)
    .filter(([, estado]) => estado === "nao_aplicavel")
    .map(([id]) => {
      const risk = getRiskById(id);
      const origem = draft.respostas[id]?.origemNA ?? "triagem";
      return { id, nome: risk?.nome ?? id, origem };
    })
    .filter((r) => Boolean(r.nome));

  const riscosLocais = draft.riscosLocais.filter((r) => r.perigo || r.controle);
  const episSelecionados = draft.epis.selecionados
    .map((id) => getEpiById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <Document
      title={`APR Digital - ${draft.contexto.nome}`}
      author="Renan Fogaça"
      subject="Analise Preliminar de Risco"
      creator="APR Digital v1.0"
    >
      <Page size="A4" style={styles.page} wrap>
        <Header
          id={draft.id}
          data={draft.contexto.data}
          horario={draft.contexto.horario}
        />

        <Section title="Contexto da Atividade">
          <Field label="Nome" value={draft.contexto.nome} />
          <Field label="Area" value={draft.contexto.area} />
          <Field label="Atividade" value={draft.contexto.atividade} />
          <Field label="Matricula" value={draft.contexto.matricula} />
          <Field label="Data" value={draft.contexto.data} />
          <Field label="Horario" value={draft.contexto.horario} />
        </Section>

        <Section title="Avaliacao Inicial">
          {draft.controlesTopo.map((c) => (
            <View key={c.id} style={styles.fieldRow}>
              <Text style={[styles.fieldValue, { flex: 1 }]}>{c.texto}</Text>
              <Text
                style={[
                  styles.fieldValue,
                  {
                    width: 60,
                    textAlign: "right",
                    fontFamily: "Helvetica-Bold",
                    color:
                      c.resposta === "sim"
                        ? COLORS.success
                        : c.resposta === "nao"
                          ? COLORS.destructive
                          : COLORS.muted,
                  },
                ]}
              >
                {c.resposta === "sim" ? "SIM" : c.resposta === "nao" ? "NAO" : "-"}
              </Text>
            </View>
          ))}
        </Section>

        {riscosAplicaveis.length > 0 && (
          <Section title="Riscos Aplicaveis">
            {riscosAplicaveis.map((risk) => {
              const resposta = draft.respostas[risk.id];
              if (!resposta) return null;
              return (
                <View key={risk.id} style={{ marginBottom: 12 }} wrap={false}>
                  <Text
                    style={{
                      fontFamily: "Helvetica-Bold",
                      fontSize: 11,
                      marginBottom: 4,
                      color: COLORS.text,
                    }}
                  >
                    {risk.nome}
                  </Text>
                  <ControlsTable
                    controles={risk.controles}
                    respostas={resposta.controles}
                  />
                </View>
              );
            })}
          </Section>
        )}

        {riscosNA.length > 0 && (
          <Section title="Riscos Nao Aplicaveis">
            {riscosNA.map((r) => (
              <NABlock key={r.id} nome={r.nome} origem={r.origem} />
            ))}
          </Section>
        )}

        {episSelecionados.length > 0 && (
          <Section title="EPIs Necessarios">
            {episSelecionados.map((epi) => (
              <Text key={epi.id} style={{ fontSize: SIZES.body, marginBottom: 2 }}>
                - {epi.nome}
                {epi.id === "luvas" && draft.epis.luvas
                  ? `: ${draft.epis.luvas}`
                  : ""}
                {epi.id === "outros" && draft.epis.outros
                  ? `: ${draft.epis.outros}`
                  : ""}
              </Text>
            ))}
          </Section>
        )}

        {riscosLocais.length > 0 && (
          <Section title="Riscos Locais">
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellText, { flex: 1 }]}>Perigo / Risco</Text>
              <Text style={[styles.tableCellText, { flex: 1 }]}>Controle</Text>
            </View>
            {riscosLocais.map((r, idx) => (
              <View
                key={idx}
                style={
                  idx % 2 === 1
                    ? [styles.tableRow, styles.tableRowAlt]
                    : styles.tableRow
                }
                wrap={false}
              >
                <Text style={[styles.tableCellText, { flex: 1 }]}>
                  {r.perigo || "-"}
                </Text>
                <Text style={[styles.tableCellText, { flex: 1 }]}>
                  {r.controle || "-"}
                </Text>
              </View>
            ))}
          </Section>
        )}

        <Section title="Em Caso de Emergencia">
          <Signature emergencia={draft.emergencia} />
        </Section>

        {draft.recusa && (
          <View style={styles.recusaContainer} wrap={false}>
            <Text style={styles.recusaTitle}>REGISTRO DE DEVER DE RECUSA</Text>
            <Text style={styles.recusaField}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Status: </Text>
              RECUSADO
            </Text>
            <Text style={styles.recusaField}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Registrado em: </Text>
              {new Date(draft.recusa.registradoEm).toLocaleString("pt-BR")}
            </Text>
            <Text style={styles.recusaField}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Motivo: </Text>
            </Text>
            <Text style={styles.recusaMotivo}>{draft.recusa.motivo}</Text>
            {draft.recusa.controlesComFalha.length > 0 && (
              <>
                <Text style={[styles.recusaField, { marginTop: 6 }]}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>
                    Controles em falta:{" "}
                  </Text>
                </Text>
                {draft.recusa.controlesComFalha.map((id, i) => {
                  const partes = id.split(":");
                  const origem = partes[0] ?? "";
                  const controleId = partes[1] ?? "";
                  const nomeOrigem =
                    origem === "topo"
                      ? "Controle de topo"
                      : getRiskById(origem)?.nome ?? origem;
                  const controle =
                    origem === "topo"
                      ? draft.controlesTopo.find((c) => c.id === controleId)?.texto
                      : getRiskById(origem)?.controles.find((c) => c.id === controleId)?.texto;
                  return (
                    <Text key={i} style={{ fontSize: SIZES.small, marginLeft: 8 }}>
                      - {nomeOrigem}: {controle ?? controleId}
                    </Text>
                  );
                })}
              </>
            )}
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text>
            APR Digital v1.0 - Documento gerado em{" "}
            {new Date().toLocaleString("pt-BR")}
          </Text>
          <Text style={{ marginTop: 2 }}>
            Dados pessoais (LGPD): este documento contem nome, matricula e
            assinatura. Compartilhe apenas com pessoas autorizadas.
          </Text>
          <Text
            style={{ marginTop: 2 }}
            render={({ pageNumber, totalPages }) =>
              `Pagina ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
