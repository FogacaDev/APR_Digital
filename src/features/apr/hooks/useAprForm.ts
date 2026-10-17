import { useShallow } from "zustand/shallow";
import { useAprStore } from "@/features/apr/stores/aprStore";
import type { ContextoData, RespostaControle, EstadoRisco } from "@/types/apr";

/**
 * Hook tipado que expõe o draft e as ações do store.
 *
 * Importante: as ações do Zustand são FUNÇÕES ESTÁVEIS (não mudam entre renders),
 * então podemos selecioná-las em bloco com useShallow sem risco de loop.
 * O `draft` é selecionado individualmente porque muda com frequência.
 */
export function useAprForm() {
  const draft = useAprStore((s) => s.draft);
  const hydrated = useAprStore((s) => s.hydrated);

  const actions = useAprStore(
    useShallow((s) => ({
      hydrate: s.hydrate,
      setContexto: s.setContexto,
      setControleTopo: s.setControleTopo,
      setEstadoRisco: s.setEstadoRisco,
      marcarSecaoNaoAplica: s.marcarSecaoNaoAplica,
      desmarcarSecaoNaoAplica: s.desmarcarSecaoNaoAplica,
      responderControle: s.responderControle,
      toggleEpi: s.toggleEpi,
      setEpiCampoLivre: s.setEpiCampoLivre,
      addRiscoLocal: s.addRiscoLocal,
      removeRiscoLocal: s.removeRiscoLocal,
      setRiscoLocalCampo: s.setRiscoLocalCampo,
      setEmergencia: s.setEmergencia,
      registrarRecusa: s.registrarRecusa,
      finalizar: s.finalizar,
      recusar: s.recusar,
      resetApr: s.resetApr,
    }))
  );

  return {
    draft,
    hydrated,
    hydrate: actions.hydrate,
    setContexto: (campo: keyof ContextoData, valor: string) =>
      actions.setContexto(campo, valor),
    setControleTopo: actions.setControleTopo,
    setEstadoRisco: (riskId: string, estado: EstadoRisco) =>
      actions.setEstadoRisco(riskId, estado),
    marcarSecaoNaoAplica: actions.marcarSecaoNaoAplica,
    desmarcarSecaoNaoAplica: actions.desmarcarSecaoNaoAplica,
    responderControle: (riskId: string, controleId: string, valor: RespostaControle) =>
      actions.responderControle(riskId, controleId, valor),
    toggleEpi: actions.toggleEpi,
    setEpiCampoLivre: actions.setEpiCampoLivre,
    addRiscoLocal: actions.addRiscoLocal,
    removeRiscoLocal: actions.removeRiscoLocal,
    setRiscoLocalCampo: actions.setRiscoLocalCampo,
    setEmergencia: actions.setEmergencia,
    registrarRecusa: actions.registrarRecusa,
    finalizar: actions.finalizar,
    recusar: actions.recusar,
    resetApr: actions.resetApr,
  };
}
