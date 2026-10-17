import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { Button } from "@/lib/ui/button";
import { RiskChecklist } from "@/features/apr/components/RiskChecklist";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { useTriagem } from "@/features/apr/hooks/useTriagem";
import { getRiskById } from "@/features/apr/data/risks";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import type { RespostaControle } from "@/types/apr";

export function ChecklistRiscoPage() {
  const { riskId } = useParams<{ riskId: string }>();
  const navigate = useNavigate();
  const {
    draft,
    responderControle,
    marcarSecaoNaoAplica,
    desmarcarSecaoNaoAplica,
  } = useAprForm();
  const triagem = useTriagem();

  const aplicaveis = triagem.aplicaveis;
  const indice = aplicaveis.findIndex((r) => r.id === riskId);
  const risk = riskId ? getRiskById(riskId) : undefined;
  const resposta = draft && riskId ? draft.respostas[riskId] : undefined;

  useEffect(() => {
    if (aplicaveis.length === 0) {
      navigate("/epis", { replace: true });
    } else if (!risk || indice < 0) {
      navigate(`/risco/${aplicaveis[0]?.id ?? ""}`, { replace: true });
    }
  }, [aplicaveis, indice, risk, navigate]);

  if (!draft || !risk) return null;

  const proximo = aplicaveis[indice + 1];
  const anterior = aplicaveis[indice - 1];

  const respondidos = resposta
    ? risk.controles.filter((c) => resposta.controles[c.id] != null).length
    : 0;
  const completo = respondidos === risk.controles.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Risco {indice + 1} de {aplicaveis.length}
        </span>
        <span className="text-muted-foreground">
          {respondidos}/{risk.controles.length} respondidos
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {risk.nome}
            {completo && <CheckCircle2 className="h-5 w-5 text-success" />}
          </CardTitle>
          <CardDescription>{risk.descricao}</CardDescription>
        </CardHeader>
        <CardContent>
          <RiskChecklist
            risk={risk}
            resposta={resposta}
            onResponder={(controleId: string, valor: RespostaControle) =>
              responderControle(risk.id, controleId, valor)
            }
            onMarcarSecaoNA={() => marcarSecaoNaoAplica(risk.id, "secao")}
            onDesmarcarSecaoNA={() => desmarcarSecaoNaoAplica(risk.id)}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => {
            if (anterior) navigate(`/risco/${anterior.id}`);
            else navigate("/triagem");
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          {anterior ? "Risco anterior" : "Voltar a triagem"}
        </Button>
        <Button
          onClick={() => {
            if (proximo) navigate(`/risco/${proximo.id}`);
            else navigate("/epis");
          }}
        >
          {proximo ? "Proximo risco" : "Ir para EPIs"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
