import { useMemo } from "react";
import { useAprStore } from "@/features/apr/stores/aprStore";
import { getRiskById } from "@/features/apr/data/risks";

export interface DeverRecusaState {
  temRecusa: boolean;
  controlesComFalha: string[];
  detalhes: Array<{ origem: string; texto: string }>;
}

const EMPTY_RESULT: DeverRecusaState = {
  temRecusa: false,
  controlesComFalha: [],
  detalhes: [],
};

export function useDeverRecusa(): DeverRecusaState {
  const draft = useAprStore((s) => s.draft);

  return useMemo(() => {
    if (!draft) return EMPTY_RESULT;

    const controlesComFalha: string[] = [];
    const detalhes: Array<{ origem: string; texto: string }> = [];

    for (const c of draft.controlesTopo) {
      if (c.resposta === "nao") {
        controlesComFalha.push(`topo:${c.id}`);
        detalhes.push({ origem: "Controle de topo", texto: c.texto });
      }
    }

    for (const [riskId, estado] of Object.entries(draft.triagem)) {
      if (estado !== "aplicavel") continue;
      const risk = getRiskById(riskId);
      const resposta = draft.respostas[riskId];
      if (!risk || !resposta || resposta.secaoNaoAplica) continue;
      for (const c of risk.controles) {
        if (!c.obrigatorio) continue;
        if (resposta.controles[c.id] === "nao") {
          controlesComFalha.push(`${riskId}:${c.id}`);
          detalhes.push({ origem: risk.nome, texto: c.texto });
        }
      }
    }

    return {
      temRecusa: controlesComFalha.length > 0,
      controlesComFalha,
      detalhes,
    };
  }, [draft]);
}
