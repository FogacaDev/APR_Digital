import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { RiskCard } from "@/features/apr/components/RiskCard";
import { useTriagem } from "@/features/apr/hooks/useTriagem";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { RISK_CATEGORIES } from "@/features/apr/data/risks";
import type { EstadoRisco } from "@/types/apr";

export function TriagemRiscosPage() {
  const { setEstadoRisco } = useAprForm();
  const triagem = useTriagem();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Triagem de riscos</CardTitle>
          <CardDescription>
            Identifique quais riscos fatais se aplicam a sua atividade.
            Os riscos que voce marcar como <strong>Aplicavel</strong> entram no
            checklist a seguir. Os marcados como <strong>N/A</strong> aparecem no
            PDF como nao aplicaveis. Os <strong>nao selecionados</strong> nao aparecem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RISK_CATEGORIES.map((risk) => (
              <RiskCard
                key={risk.id}
                id={risk.id}
                nome={risk.nome}
                descricao={risk.descricao}
                icone={risk.icone}
                totalControles={risk.controles.length}
                estado={triagem.estadoDe(risk.id)}
                onChange={(estado: EstadoRisco) => setEstadoRisco(risk.id, estado)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
