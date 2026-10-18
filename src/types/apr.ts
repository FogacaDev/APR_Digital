/**
 * Tipos de domínio da APR.
 * Estes tipos são a fonte da verdade do app.
 * Qualquer mudança aqui deve refletir no schema Zod (schemas/aprSchema.ts).
 */

export type RespostaControle = "sim" | "nao" | "nao_aplica" | null;

export type OrigemNA = "triagem" | "secao" | "individual" | null;

export interface RespostaRisco {
  controles: Record<string, RespostaControle>;
  secaoNaoAplica: boolean;
  origemNA: OrigemNA;
  respondidoEm: number | null;
}

export type EstadoRisco = "aplicavel" | "nao_aplicavel" | "nao_selecionado";

export type Triagem = Record<string, EstadoRisco>;

export type RespostaSimNao = "sim" | "nao" | null;

export interface ControleTopoResposta {
  id: string;
  texto: string;
  resposta: RespostaSimNao;
}

export type ControlesTopo = ControleTopoResposta[];

export interface ContextoData {
  nome: string;
  area: string;
  atividade: string;
  matricula: string;
  data: string;
  horario: string;
}

export interface EpisData {
  selecionados: string[];
  luvas: string;
  outros: string;
}

export interface RiscoLocal {
  perigo: string;
  controle: string;
}

export interface EmergenciaData {
  bombeiro: string;
  ambulancia: string;
  assinatura: string;
  assinaturaDataUrl: string | null;
  assinaturaTimestamp: number | null;
}

export interface RecusaData {
  motivo: string;
  registradoEm: number;
  controlesComFalha: string[];
}

export type AprStatus = "rascunho" | "finalizado" | "recusado";

export interface AprDraft {
  id: string;
  schemaVersion: number;
  createdAt: number;
  updatedAt: number;
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
