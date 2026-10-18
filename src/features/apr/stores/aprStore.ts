import { create } from "zustand";
import type {
  AprDraft,
  ContextoData,
  ControlesTopo,
  EstadoRisco,
  RespostaControle,
  RespostaRisco,
  RecusaData,
  EpisData,
  RiscoLocal,
  EmergenciaData,
} from "@/types/apr";
import { getRiskById } from "@/features/apr/data/risks";
import { aprRepository } from "@/features/apr/repositories";
import { SCHEMA_VERSION } from "@/features/apr/schemas/aprSchema";

const emptyControlesTopo = (): ControlesTopo => [
  { id: "sinto_bem", texto: "Sinto-me bem para realizar essa atividade?", resposta: null },
  { id: "sabem_onde", texto: "As pessoas sabem onde eu estou?", resposta: null },
  { id: "afeta_outros", texto: "Alguém pode ser afetado por essa atividade?", resposta: null },
];

const emptyEpis = (): EpisData => ({
  selecionados: [],
  luvas: "",
  outros: "",
});

const emptyEmergencia = (): EmergenciaData => ({
  bombeiro: "",
  ambulancia: "",
  assinatura: "",
  assinaturaDataUrl: null,
  assinaturaTimestamp: null,
});

const emptyContexto = (): ContextoData => ({
  nome: "",
  area: "",
  atividade: "",
  matricula: "",
  data: "",
  horario: "",
});

export function createEmptyDraft(): AprDraft {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    schemaVersion: SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    status: "rascunho",
    contexto: emptyContexto(),
    controlesTopo: emptyControlesTopo(),
    triagem: {},
    respostas: {},
    epis: emptyEpis(),
    riscosLocais: [{ perigo: "", controle: "" }],
    emergencia: emptyEmergencia(),
    recusa: null,
  };
}

function emptyRespostaRisco(riskId: string): RespostaRisco {
  const risk = getRiskById(riskId);
  if (!risk) {
    return {
      controles: {},
      secaoNaoAplica: false,
      origemNA: null,
      respondidoEm: null,
    };
  }
  const controles: Record<string, RespostaControle> = {};
  for (const c of risk.controles) {
    controles[c.id] = null;
  }
  return {
    controles,
    secaoNaoAplica: false,
    origemNA: null,
    respondidoEm: null,
  };
}

interface AprState {
  draft: AprDraft | null;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setContexto: (campo: keyof ContextoData, valor: string) => void;
  setControleTopo: (id: string, resposta: "sim" | "nao") => void;
  setEstadoRisco: (riskId: string, estado: EstadoRisco) => void;
  marcarSecaoNaoAplica: (riskId: string, origem: "triagem" | "secao") => void;
  desmarcarSecaoNaoAplica: (riskId: string) => void;
  responderControle: (riskId: string, controleId: string, valor: RespostaControle) => void;
  toggleEpi: (epiId: string) => void;
  setEpiCampoLivre: (campo: "luvas" | "outros", valor: string) => void;
  addRiscoLocal: () => void;
  removeRiscoLocal: (index: number) => void;
  setRiscoLocalCampo: (index: number, campo: keyof RiscoLocal, valor: string) => void;
  setEmergencia: (campo: keyof EmergenciaData, valor: string) => void;
  setAssinatura: (dataUrl: string | null) => void;
  registrarRecusa: (recusa: RecusaData) => void;
  finalizar: () => Promise<void>;
  recusar: () => Promise<void>;
  resetApr: () => void;
  saveNow: () => Promise<void>;
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

function scheduleSave(get: () => AprState) {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    const { draft, saveNow } = get();
    if (draft) await saveNow();
  }, 500);
}

export const useAprStore = create<AprState>()((set, get) => ({
  draft: null,
  hydrated: false,

  hydrate: async () => {
    const current = await aprRepository.getCurrentDraft();
    if (current) {
      set({ draft: current, hydrated: true });
    } else {
      set({ draft: createEmptyDraft(), hydrated: true });
    }
  },

  setContexto: (campo, valor) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          contexto: { ...state.draft.contexto, [campo]: valor },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  setControleTopo: (id, resposta) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          controlesTopo: state.draft.controlesTopo.map((c) =>
            c.id === id ? { ...c, resposta } : c
          ),
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  setEstadoRisco: (riskId, estado) => {
    set((state) => {
      if (!state.draft) return state;
      const novoTriagem = { ...state.draft.triagem, [riskId]: estado };
      const novasRespostas = { ...state.draft.respostas };

      if (estado === "aplicavel" && !novasRespostas[riskId]) {
        novasRespostas[riskId] = emptyRespostaRisco(riskId);
      }

      if (estado === "nao_aplicavel") {
        const risk = getRiskById(riskId);
        if (risk) {
          const controles: Record<string, RespostaControle> = {};
          for (const c of risk.controles) {
            controles[c.id] = "nao_aplica";
          }
          novasRespostas[riskId] = {
            controles,
            secaoNaoAplica: true,
            origemNA: "triagem",
            respondidoEm: Date.now(),
          };
        }
      }

      if (estado === "nao_selecionado") {
        delete novasRespostas[riskId];
      }

      return {
        draft: {
          ...state.draft,
          triagem: novoTriagem,
          respostas: novasRespostas,
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  marcarSecaoNaoAplica: (riskId, origem) => {
    set((state) => {
      if (!state.draft) return state;
      const risk = getRiskById(riskId);
      if (!risk) return state;
      const controles: Record<string, RespostaControle> = {};
      for (const c of risk.controles) {
        controles[c.id] = "nao_aplica";
      }
      return {
        draft: {
          ...state.draft,
          respostas: {
            ...state.draft.respostas,
            [riskId]: {
              controles,
              secaoNaoAplica: true,
              origemNA: origem,
              respondidoEm: Date.now(),
            },
          },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  desmarcarSecaoNaoAplica: (riskId) => {
    set((state) => {
      if (!state.draft) return state;
      const risk = getRiskById(riskId);
      if (!risk) return state;
      const controles: Record<string, RespostaControle> = {};
      for (const c of risk.controles) {
        controles[c.id] = null;
      }
      return {
        draft: {
          ...state.draft,
          respostas: {
            ...state.draft.respostas,
            [riskId]: {
              controles,
              secaoNaoAplica: false,
              origemNA: null,
              respondidoEm: null,
            },
          },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  responderControle: (riskId, controleId, valor) => {
    set((state) => {
      if (!state.draft) return state;
      const atual = state.draft.respostas[riskId] ?? emptyRespostaRisco(riskId);
      return {
        draft: {
          ...state.draft,
          respostas: {
            ...state.draft.respostas,
            [riskId]: {
              ...atual,
              controles: { ...atual.controles, [controleId]: valor },
              respondidoEm: Date.now(),
            },
          },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  toggleEpi: (epiId) => {
    set((state) => {
      if (!state.draft) return state;
      const atual = state.draft.epis.selecionados;
      const novos = atual.includes(epiId)
        ? atual.filter((id) => id !== epiId)
        : [...atual, epiId];
      return {
        draft: {
          ...state.draft,
          epis: { ...state.draft.epis, selecionados: novos },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  setEpiCampoLivre: (campo, valor) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          epis: { ...state.draft.epis, [campo]: valor },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  addRiscoLocal: () => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          riscosLocais: [...state.draft.riscosLocais, { perigo: "", controle: "" }],
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  removeRiscoLocal: (index) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          riscosLocais: state.draft.riscosLocais.filter((_, i) => i !== index),
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  setRiscoLocalCampo: (index, campo, valor) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          riscosLocais: state.draft.riscosLocais.map((r, i) =>
            i === index ? { ...r, [campo]: valor } : r
          ),
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  setEmergencia: (campo, valor) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          emergencia: { ...state.draft.emergencia, [campo]: valor },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  setAssinatura: (dataUrl) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          emergencia: {
            ...state.draft.emergencia,
            assinaturaDataUrl: dataUrl,
            assinaturaTimestamp: dataUrl ? Date.now() : null,
          },
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  registrarRecusa: (recusa) => {
    set((state) => {
      if (!state.draft) return state;
      return {
        draft: {
          ...state.draft,
          recusa,
          status: "recusado",
          updatedAt: Date.now(),
        },
      };
    });
    scheduleSave(get);
  },

  finalizar: async () => {
    const { draft } = get();
    if (!draft) return;
    const finalizado: AprDraft = {
      ...draft,
      status: "finalizado",
      updatedAt: Date.now(),
    };
    set({ draft: finalizado });
    await aprRepository.save(finalizado);
  },

  recusar: async () => {
    const { draft } = get();
    if (!draft) return;
    const recusado: AprDraft = {
      ...draft,
      status: "recusado",
      updatedAt: Date.now(),
    };
    set({ draft: recusado });
    await aprRepository.save(recusado);
  },

  resetApr: () => {
    set({ draft: createEmptyDraft() });
  },

  saveNow: async () => {
    const { draft } = get();
    if (draft) {
      await aprRepository.save(draft);
    }
  },
}));

export const selectDraft = (s: AprState) => s.draft;
export const selectHydrated = (s: AprState) => s.hydrated;
