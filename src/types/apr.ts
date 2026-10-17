/**
 * Tipos de domínio da APR.
 * Estes tipos são a fonte da verdade do app.
 * Qualquer mudança aqui deve refletir no schema Zod (schemas/aprSchema.ts).
 */

// =============================================================================
// Respostas de controle
// =============================================================================

/**
 * Resposta a um controle crítico individual.
 * - 'sim'          → controle aplicado
 * - 'nao'          → controle NÃO aplicado (dispara Dever de Recusa se obrigatório)
 * - 'nao_aplica'   → controle não aplicável à atividade
 * - null           → ainda não respondido
 */
export type RespostaControle = "sim" | "nao" | "nao_aplica" | null;

/**
 * Origem do estado N/A de uma seção.
 * Usado para auditoria no PDF (distingue "declarado na triagem" de "declarado na seção").
 */
export type OrigemNA = "triagem" | "secao" | "individual" | null;

/**
 * Respostas de uma seção de risco inteira.
 */
export interface RespostaRisco {
  /** Resposta por id de controle */
  controles: Record<string, RespostaControle>;
  /** true se o usuário marcou a seção inteira como N/A */
  secaoNaoAplica: boolean;
  /** Origem do N/A (auditoria) */
  origemNA: OrigemNA;
  /** Timestamp em que a seção foi respondida (null se não respondida) */
  respondidoEm: number | null;
}

// =============================================================================
// Triagem de riscos
// =============================================================================

/**
 * Estado de um risco na triagem.
 * - 'aplicavel'        → entra no wizard, precisa ser respondido
 * - 'nao_aplicavel'    → não entra no wizard, aparece como N/A no PDF
 * - 'nao_selecionado'  → nem aparece no PDF (usuário não interagiu)
 */
export type EstadoRisco = "aplicavel" | "nao_aplicavel" | "nao_selecionado";

/** Triagem completa, por id de risco. */
export type Triagem = Record<string, EstadoRisco>;

// =============================================================================
// Controles de topo (as 3 perguntas iniciais)
// =============================================================================

export type RespostaSimNao = "sim" | "nao" | null;

export interface ControleTopoResposta {
  id: string;
  texto: string;
  resposta: RespostaSimNao;
}

export type ControlesTopo = ControleTopoResposta[];

// =============================================================================
// Contexto da atividade
// =============================================================================

export interface ContextoData {
  nome: string;
  area: string;
  atividade: string;
  matricula: string;
  /** Data no formato ISO (YYYY-MM-DD) */
  data: string;
  /** Horário no formato HH:MM */
  horario: string;
}

// =============================================================================
// EPIs
// =============================================================================

export interface EpisData {
  /** Lista de EPIs selecionados (ids do catálogo) */
  selecionados: string[];
  /** Campo livre de luvas */
  luvas: string;
  /** Campo livre de "outros" */
  outros: string;
}

// =============================================================================
// Riscos locais e emergência
// =============================================================================

export interface RiscoLocal {
  perigo: string;
  controle: string;
}

export interface EmergenciaData {
  bombeiro: string;
  ambulancia: string;
  assinatura: string;
}

// =============================================================================
// Dever de recusa
// =============================================================================

export interface RecusaData {
  motivo: string;
  registradoEm: number;
  /** Ids dos controles que falharam (para o PDF) */
  controlesComFalha: string[];
}

// =============================================================================
// Draft completo da APR
// =============================================================================

export type AprStatus = "rascunho" | "finalizado" | "recusado";

/**
 * Estrutura completa de uma APR.
 * Este é o objeto que circula no store, no repositório e no gerador de PDF.
 */
export interface AprDraft {
  /** Identificador único — gerado com crypto.randomUUID() */
  id: string;
  /** Versão do schema, para migração futura */
  schemaVersion: number;
  /** Timestamp de criação */
  createdAt: number;
  /** Timestamp da última atualização */
  updatedAt: number;
  /** Estado da APR */
  status: AprStatus;

  contexto: ContextoData;
  controlesTopo: ControlesTopo;
  triagem: Triagem;
  respostas: Record<string, RespostaRisco>;
  epis: EpisData;
  riscosLocais: RiscoLocal[];
  emergencia: EmergenciaData;
  recusa: RecusaData | null;
}
