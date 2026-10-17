import { useMemo } from "react";
import { useAprStore } from "@/features/apr/stores/aprStore";
import { RISK_CATEGORIES } from "@/features/apr/data/risks";
import type { EstadoRisco } from "@/types/apr";
import type { AprDraft } from "@/types/apr";

export interface TriagemView {
  aplicaveis: typeof RISK_CATEGORIES;
  naoAplicaveis: typeof RISK_CATEGORIES;
  naoSelecionados: typeof RISK_CATEGORIES;
  estadoDe: (riskId: string) => EstadoRisco;
  totalAplicaveis: number;
}

const EMPTY_TRIAGEM: AprDraft["triagem"] = {};

export function useTriagem(): TriagemView {
  // ⚠️ Seletor deve retornar uma referência ESTÁVEL.
  // `draft?.triagem` é o mesmo objeto até que alguém altere.
  // O fallback é uma constante módulo-level (EMPTY_TRIAGEM), nunca um `{}` novo.
  const triagem = useAprStore((s) => s.draft?.triagem ?? EMPTY_TRIAGEM);

  return useMemo(() => {
    const estadoDe = (riskId: string): EstadoRisco =>
      triagem[riskId] ?? "nao_selecionado";

    const aplicaveis = RISK_CATEGORIES.filter((r) => estadoDe(r.id) === "aplicavel");
    const naoAplicaveis = RISK_CATEGORIES.filter((r) => estadoDe(r.id) === "nao_aplicavel");
    const naoSelecionados = RISK_CATEGORIES.filter((r) => estadoDe(r.id) === "nao_selecionado");

    return {
      aplicaveis,
      naoAplicaveis,
      naoSelecionados,
      estadoDe,
      totalAplicaveis: aplicaveis.length,
    };
  }, [triagem]);
}
