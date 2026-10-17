import { Badge } from "@/lib/ui/badge";
import { cn } from "@/lib/utils/cn";
import type { EstadoRisco } from "@/types/apr";
import * as Icons from "lucide-react";

export interface RiskCardProps {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  totalControles: number;
  estado: EstadoRisco;
  onChange: (estado: EstadoRisco) => void;
}

type IconComponent = React.ComponentType<{ className?: string }>;

function resolveIcon(name: string): IconComponent {
  const icons = Icons as unknown as Record<string, IconComponent>;
  return icons[name] ?? Icons.Circle;
}

export function RiskCard({
  nome,
  descricao,
  icone,
  totalControles,
  estado,
  onChange,
}: RiskCardProps) {
  const Icon = resolveIcon(icone);
  const isAplicavel = estado === "aplicavel";
  const isNA = estado === "nao_aplicavel";

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-4 transition flex flex-col gap-3",
        isAplicavel && "border-primary bg-primary/5 shadow-sm",
        isNA && "border-muted-foreground/30 bg-muted/30",
        !isAplicavel && !isNA && "border-border bg-card hover:border-muted-foreground/40"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "rounded-lg p-2 flex-shrink-0",
            isAplicavel && "bg-primary text-primary-foreground",
            isNA && "bg-muted text-muted-foreground",
            !isAplicavel && !isNA && "bg-secondary text-secondary-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm">{nome}</h3>
            {isAplicavel && <Badge variant="default">Aplicavel</Badge>}
            {isNA && <Badge variant="secondary">N/A</Badge>}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {descricao}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {totalControles} controle(s) critico(s)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 mt-auto">
        <button
          type="button"
          onClick={() => onChange("aplicavel")}
          className={cn(
            "px-2 py-1.5 rounded-md border text-xs font-medium transition",
            isAplicavel
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-background hover:bg-muted"
          )}
          aria-pressed={isAplicavel}
        >
          Aplicavel
        </button>
        <button
          type="button"
          onClick={() => onChange("nao_aplicavel")}
          className={cn(
            "px-2 py-1.5 rounded-md border text-xs font-medium transition",
            isNA
              ? "bg-muted-foreground text-background border-muted-foreground"
              : "border-border bg-background hover:bg-muted"
          )}
          aria-pressed={isNA}
        >
          N/A
        </button>
        <button
          type="button"
          onClick={() => onChange("nao_selecionado")}
          className={cn(
            "px-2 py-1.5 rounded-md border text-xs font-medium transition",
            !isAplicavel && !isNA
              ? "bg-secondary text-secondary-foreground border-secondary"
              : "border-border bg-background hover:bg-muted"
          )}
          aria-pressed={!isAplicavel && !isNA}
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
