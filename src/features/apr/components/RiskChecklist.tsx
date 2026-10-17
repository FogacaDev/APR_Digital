import type { RiskCategory } from "@/features/apr/data/risks";
import type { RespostaControle, RespostaRisco } from "@/types/apr";
import { cn } from "@/lib/utils/cn";
import { AlertCircle, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { Checkbox } from "@/lib/ui/checkbox";
import { Label } from "@/lib/ui/label";

export interface RiskChecklistProps {
  risk: RiskCategory;
  resposta: RespostaRisco | undefined;
  onResponder: (controleId: string, valor: RespostaControle) => void;
  onMarcarSecaoNA: () => void;
  onDesmarcarSecaoNA: () => void;
}

function opcaoBtn(
  ativo: boolean,
  variant: "sim" | "nao" | "na"
): string {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition min-w-[80px] justify-center";
  if (ativo) {
    if (variant === "sim") return cn(base, "bg-success text-success-foreground border-success");
    if (variant === "nao") return cn(base, "bg-destructive text-destructive-foreground border-destructive");
    return cn(base, "bg-muted-foreground text-background border-muted-foreground");
  }
  return cn(base, "border-border bg-background hover:bg-muted");
}

export function RiskChecklist({
  risk,
  resposta,
  onResponder,
  onMarcarSecaoNA,
  onDesmarcarSecaoNA,
}: RiskChecklistProps) {
  const secaoNA = resposta?.secaoNaoAplica ?? false;
  const controles = resposta?.controles ?? {};

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/30 p-3 flex items-start gap-3">
        <Checkbox
          id={`secao-na-${risk.id}`}
          checked={secaoNA}
          onCheckedChange={(checked) => {
            if (checked === true) onMarcarSecaoNA();
            else onDesmarcarSecaoNA();
          }}
          className="mt-0.5"
        />
        <Label htmlFor={`secao-na-${risk.id}`} className="text-sm cursor-pointer">
          <span className="font-semibold">Esta secao nao se aplica a minha atividade</span>
          <span className="block text-xs text-muted-foreground font-normal mt-0.5">
            Todos os {risk.controles.length} controles abaixo serao marcados como N/A.
          </span>
        </Label>
      </div>

      {secaoNA && (
        <div className="rounded-lg border border-muted-foreground/30 bg-muted/20 p-3 text-sm text-muted-foreground text-center">
          Secao marcada como Nao Aplicavel. Desmarque acima se quiser responder individualmente.
        </div>
      )}

      <div className="space-y-2">
        {risk.controles.map((controle, idx) => {
          const valor = controles[controle.id] ?? null;
          const falha = valor === "nao" && controle.obrigatorio;

          return (
            <div
              key={controle.id}
              className={cn(
                "rounded-lg border p-3 transition",
                falha && "border-destructive bg-destructive/5",
                !falha && "border-border bg-card"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="text-muted-foreground text-xs font-mono mr-1.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {controle.texto}
                    {controle.obrigatorio && (
                      <span className="text-destructive ml-1" title="Controle critico obrigatorio">
                        *
                      </span>
                    )}
                  </p>
                  {falha && (
                    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      Resposta NEGATIVA em controle critico. Devera usar o Dever de Recusa.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    disabled={secaoNA}
                    onClick={() => onResponder(controle.id, "sim")}
                    className={opcaoBtn(valor === "sim", "sim")}
                    aria-pressed={valor === "sim"}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    SIM
                  </button>
                  <button
                    type="button"
                    disabled={secaoNA}
                    onClick={() => onResponder(controle.id, "nao")}
                    className={opcaoBtn(valor === "nao", "nao")}
                    aria-pressed={valor === "nao"}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    NAO
                  </button>
                  <button
                    type="button"
                    disabled={secaoNA}
                    onClick={() => onResponder(controle.id, "nao_aplica")}
                    className={opcaoBtn(valor === "nao_aplica", "na")}
                    aria-pressed={valor === "nao_aplica"}
                  >
                    <MinusCircle className="h-3.5 w-3.5" />
                    N/A
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
