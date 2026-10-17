import { z } from "zod";
import { getRiskById } from "@/features/apr/data/risks";

export const SCHEMA_VERSION = 1;

const respostaControleSchema = z.enum(["sim", "nao", "nao_aplica"]).nullable();

const respostaRiscoSchema = z
  .object({
    controles: z.record(z.string(), respostaControleSchema),
    secaoNaoAplica: z.boolean(),
    origemNA: z.enum(["triagem", "secao", "individual"]).nullable(),
    respondidoEm: z.number().nullable(),
  })
  .refine(
    (data) =>
      !data.secaoNaoAplica ||
      Object.values(data.controles).every((v) => v === "nao_aplica"),
    {
      message: "Seção marcada como N/A deve ter todos os controles como N/A",
    },
  );

const contextoDataSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  area: z.string().min(1, "Área é obrigatória"),
  atividade: z.string().min(1, "Atividade é obrigatória"),
  matricula: z.string().min(1, "Matrícula é obrigatória"),
  data: z.string().min(1, "Data é obrigatória"),
  horario: z.string().min(1, "Horário é obrigatório"),
});

const controleTopoRespostaSchema = z.object({
  id: z.string(),
  texto: z.string(),
  resposta: z.enum(["sim", "nao"]).nullable(),
});

const episDataSchema = z.object({
  selecionados: z.array(z.string()),
  luvas: z.string(),
  outros: z.string(),
});

const riscoLocalSchema = z.object({
  perigo: z.string(),
  controle: z.string(),
});

const emergenciaDataSchema = z.object({
  bombeiro: z.string(),
  ambulancia: z.string(),
  assinatura: z.string(),
});

const recusaDataSchema = z.object({
  motivo: z.string().min(1, "Motivo do dever de recusa é obrigatório"),
  registradoEm: z.number(),
  controlesComFalha: z.array(z.string()),
});

export const aprDraftSchema = z.object({
  id: z.string().uuid(),
  schemaVersion: z.number().int().positive(),
  createdAt: z.number(),
  updatedAt: z.number(),
  status: z.enum(["rascunho", "finalizado", "recusado"]),
  contexto: contextoDataSchema,
  controlesTopo: z.array(controleTopoRespostaSchema),
  triagem: z.record(
    z.string(),
    z.enum(["aplicavel", "nao_aplicavel", "nao_selecionado"]),
  ),
  respostas: z.record(z.string(), respostaRiscoSchema),
  epis: episDataSchema,
  riscosLocais: z.array(riscoLocalSchema),
  emergencia: emergenciaDataSchema,
  recusa: recusaDataSchema.nullable(),
});

export type AprDraftSchema = z.infer<typeof aprDraftSchema>;

// =============================================================================
// Validação de "pronto para gerar PDF"
// =============================================================================

export interface ValidationIssue {
  tipo: "erro" | "aviso";
  campo: string;
  mensagem: string;
}

/**
 * Verifica se o draft está completo o suficiente para gerar PDF.
 * Diferente do schema Zod (que valida estrutura), este valida regras de negócio.
 */
export function validateForPdf(draft: AprDraftSchema): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // 1. Contexto obrigatório
  for (const campo of [
    "nome",
    "area",
    "atividade",
    "matricula",
    "data",
    "horario",
  ] as const) {
    if (!draft.contexto[campo]) {
      issues.push({
        tipo: "erro",
        campo: `contexto.${campo}`,
        mensagem: `Campo "${campo}" é obrigatório`,
      });
    }
  }

  // 2. Controles de topo obrigatórios
  for (const c of draft.controlesTopo) {
    if (c.resposta === null) {
      issues.push({
        tipo: "erro",
        campo: `controlesTopo.${c.id}`,
        mensagem: `Controle de topo "${c.texto}" não respondido`,
      });
    }
  }

  // 3. Riscos aplicáveis com todos os controles respondidos
  for (const [riskId, estado] of Object.entries(draft.triagem)) {
    if (estado !== "aplicavel") continue;
    const risk = getRiskById(riskId);
    if (!risk) {
      issues.push({
        tipo: "erro",
        campo: `triagem.${riskId}`,
        mensagem: `Risco com id "${riskId}" não existe no catálogo`,
      });
      continue;
    }
    const resposta = draft.respostas[riskId];
    if (!resposta) {
      issues.push({
        tipo: "erro",
        campo: `respostas.${riskId}`,
        mensagem: `Risco "${risk.nome}" não tem respostas`,
      });
      continue;
    }
    for (const controle of risk.controles) {
      const valor = resposta.controles[controle.id];
      if (valor === null || valor === undefined) {
        issues.push({
          tipo: "erro",
          campo: `respostas.${riskId}.${controle.id}`,
          mensagem: `Risco "${risk.nome}" — controle "${controle.texto}" não respondido`,
        });
      }
    }
  }

  return issues;
}

/**
 * Detecta se há algum controle obrigatório com resposta "NÃO" (dispara Dever de Recusa).
 * N/A nunca dispara.
 */
export function detectDeverDeRecusa(draft: AprDraftSchema): {
  temRecusa: boolean;
  controlesComFalha: string[];
} {
  const controlesComFalha: string[] = [];

  // Controles de topo
  for (const c of draft.controlesTopo) {
    if (c.resposta === "nao") {
      controlesComFalha.push(`topo:${c.id}`);
    }
  }

  // Controles críticos dos riscos aplicáveis
  for (const [riskId, estado] of Object.entries(draft.triagem)) {
    if (estado !== "aplicavel") continue;
    const risk = getRiskById(riskId);
    const resposta = draft.respostas[riskId];
    if (!risk || !resposta || resposta.secaoNaoAplica) continue;

    for (const controle of risk.controles) {
      if (!controle.obrigatorio) continue;
      if (resposta.controles[controle.id] === "nao") {
        controlesComFalha.push(`${riskId}:${controle.id}`);
      }
    }
  }

  return {
    temRecusa: controlesComFalha.length > 0,
    controlesComFalha,
  };
}
