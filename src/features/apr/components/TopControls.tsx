import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function TopControls() {
  const { draft, setControleTopo } = useAprForm();
  if (!draft) return null;

  const temNao = draft.controlesTopo.some((c) => c.resposta === "nao");

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold">Avaliacao inicial</h2>
        <span className="text-xs text-muted-foreground">
          Responda as 3 perguntas antes de prosseguir
        </span>
      </div>

      <div className="space-y-2">
        {draft.controlesTopo.map((controle) => (
          <div
            key={controle.id}
            className="rounded-lg border bg-card p-3 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <p className="flex-1 text-sm font-medium">{controle.texto}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setControleTopo(controle.id, "sim")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-md border text-sm font-medium transition min-w-[90px] justify-center",
                  controle.resposta === "sim"
                    ? "bg-success text-success-foreground border-success"
                    : "border-border bg-background hover:bg-muted"
                )}
                aria-pressed={controle.resposta === "sim"}
              >
                <CheckCircle2 className="h-4 w-4" />
                SIM
              </button>
              <button
                type="button"
                onClick={() => setControleTopo(controle.id, "nao")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-md border text-sm font-medium transition min-w-[90px] justify-center",
                  controle.resposta === "nao"
                    ? "bg-destructive text-destructive-foreground border-destructive"
                    : "border-border bg-background hover:bg-muted"
                )}
                aria-pressed={controle.resposta === "nao"}
              >
                <XCircle className="h-4 w-4" />
                NAO
              </button>
            </div>
          </div>
        ))}
      </div>

      {temNao && (
        <div className="rounded-lg border-2 border-destructive bg-destructive/10 p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-destructive">
              Controle critico com resposta NEGATIVA
            </p>
            <p className="text-destructive/90 mt-0.5">
              Voce precisara usar o <strong>Dever de Recusa</strong> ao final
              da pagina, ou corrigir a situacao antes de gerar o PDF.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
