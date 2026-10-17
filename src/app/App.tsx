import { useEffect, useState } from "react";
import { AlertCircle, Loader2, TestTube2, RotateCcw } from "lucide-react";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { useTriagem } from "@/features/apr/hooks/useTriagem";
import { useDeverRecusa } from "@/features/apr/hooks/useDeverRecusa";
import { RISK_CATEGORIES, TOTAL_RISKS, TOTAL_CONTROLES } from "@/features/apr/data/risks";

export default function App() {
  const [error, setError] = useState<string | null>(null);
  const {
    draft,
    hydrated,
    hydrate,
    setEstadoRisco,
    setControleTopo,
    resetApr,
    setContexto,
  } = useAprForm();
  const triagem = useTriagem();
  const recusa = useDeverRecusa();

  useEffect(() => {
    hydrate().catch((e: unknown) => setError(String(e)));
  }, [hydrate]);

  if (error) {
    return (
      <main className="min-h-dvh bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border border-destructive bg-card p-4 flex gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div>
              <div className="font-semibold text-destructive">Erro na hidratacao</div>
              <div className="text-sm text-muted-foreground">{error}</div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!hydrated || !draft) {
    return (
      <main className="min-h-dvh bg-background text-foreground flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Carregando...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <TestTube2 className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-primary">APR Digital - Bloco 3</h1>
          </div>
          <p className="text-muted-foreground">
            Debug do store real: triagem, N/A por secao, Dever de Recusa, auto-save.
          </p>
        </header>

        {recusa.temRecusa && (
          <div className="rounded-lg border-2 border-destructive bg-destructive/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-bold text-destructive text-lg">
                  DEVER DE RECUSA ATIVO
                </div>
                <p className="text-sm text-destructive/90 mt-1">
                  {recusa.detalhes.length} controle(s) critico(s) com resposta "NAO".
                </p>
                <ul className="mt-2 text-sm text-destructive/80 list-disc list-inside space-y-0.5">
                  {recusa.detalhes.map((d, i) => (
                    <li key={i}>
                      <strong>{d.origem}:</strong> {d.texto}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">Total de riscos</div>
            <div className="text-2xl font-bold text-primary">{TOTAL_RISKS}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">Aplicaveis</div>
            <div className="text-2xl font-bold text-success">
              {triagem.totalAplicaveis}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">N/A</div>
            <div className="text-2xl font-bold text-muted-foreground">
              {triagem.naoAplicaveis.length}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">Controles totais</div>
            <div className="text-2xl font-bold">{TOTAL_CONTROLES}</div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-semibold mb-3">Controles de topo</h2>
          <div className="space-y-2">
            {draft.controlesTopo.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="flex-1 min-w-[280px]">{c.texto}</span>
                <button
                  onClick={() => setControleTopo(c.id, "sim")}
                  className={
                    "px-3 py-1 rounded-md border text-xs font-medium transition " +
                    (c.resposta === "sim"
                      ? "bg-success text-success-foreground border-success"
                      : "border-border bg-background hover:bg-muted")
                  }
                >
                  SIM
                </button>
                <button
                  onClick={() => setControleTopo(c.id, "nao")}
                  className={
                    "px-3 py-1 rounded-md border text-xs font-medium transition " +
                    (c.resposta === "nao"
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : "border-border bg-background hover:bg-muted")
                  }
                >
                  NAO
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="flex gap-2">
          <button
            onClick={resetApr}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card hover:bg-muted text-sm font-medium transition"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar APR
          </button>
          <button
            onClick={() => {
              setContexto("nome", "Teste Bloco 3");
              setContexto("area", "Area Teste");
            }}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
          >
            Preencher contexto (teste)
          </button>
        </div>

        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-semibold mb-3">Triagem de riscos</h2>
          <ul className="space-y-2">
            {RISK_CATEGORIES.map((risk) => {
              const estado = triagem.estadoDe(risk.id);
              return (
                <li
                  key={risk.id}
                  className="flex flex-wrap items-center gap-2 py-2 border-b border-border/50 last:border-0"
                >
                  <div className="flex-1 min-w-[200px]">
                    <div className="font-medium text-sm">{risk.nome}</div>
                    <div className="text-xs text-muted-foreground">
                      {risk.controles.length} controles
                    </div>
                  </div>
                  <button
                    onClick={() => setEstadoRisco(risk.id, "aplicavel")}
                    className={
                      "px-3 py-1 rounded-md border text-xs font-medium transition " +
                      (estado === "aplicavel"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border bg-background hover:bg-muted")
                    }
                  >
                    Aplicavel
                  </button>
                  <button
                    onClick={() => setEstadoRisco(risk.id, "nao_aplicavel")}
                    className={
                      "px-3 py-1 rounded-md border text-xs font-medium transition " +
                      (estado === "nao_aplicavel"
                        ? "bg-muted text-foreground border-muted-foreground"
                        : "border-border bg-background hover:bg-muted")
                    }
                  >
                    N/A
                  </button>
                  <button
                    onClick={() => setEstadoRisco(risk.id, "nao_selecionado")}
                    className={
                      "px-3 py-1 rounded-md border text-xs font-medium transition " +
                      (estado === "nao_selecionado"
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "border-border bg-background hover:bg-muted")
                    }
                  >
                    Limpar
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-semibold mb-2">Estado do draft</h2>
          <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-64">
            {JSON.stringify(
              {
                status: draft.status,
                contexto: draft.contexto,
                triagem: draft.triagem,
                recusaDetectada: recusa.temRecusa,
                controlesComFalha: recusa.controlesComFalha,
              },
              null,
              2
            )}
          </pre>
        </section>

        <p className="text-xs text-muted-foreground text-center">
          Painel temporario - sera removido no Bloco 4.
        </p>
      </div>
    </main>
  );
}
