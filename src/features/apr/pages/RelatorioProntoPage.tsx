import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { Button } from "@/lib/ui/button";
import { Badge } from "@/lib/ui/badge";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { useTriagem } from "@/features/apr/hooks/useTriagem";
import { ShareButtons } from "@/features/apr/components/ShareButtons";
import { generateAprPdf } from "@/features/apr/pdf/generateAprPdf";
import { CheckCircle2, AlertCircle, Home, RotateCcw } from "lucide-react";

export function RelatorioProntoPage() {
  const navigate = useNavigate();
  const { draft, resetApr } = useAprForm();
  const triagem = useTriagem();

  useEffect(() => {
    if (!draft) navigate("/");
  }, [draft, navigate]);

  if (!draft) return null;

  const totalAplicaveis = triagem.totalAplicaveis;
  const totalNA = triagem.naoAplicaveis.length;
  const totalEpis = draft.epis.selecionados.length;
  const temRecusa = draft.status === "recusado";

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3 py-4">
        <div
          className={
            "inline-flex items-center justify-center rounded-full p-4 " +
            (temRecusa ? "bg-destructive/10" : "bg-success/10")
          }
        >
          {temRecusa ? (
            <AlertCircle className="h-10 w-10 text-destructive" />
          ) : (
            <CheckCircle2 className="h-10 w-10 text-success" />
          )}
        </div>
        <h1 className="text-2xl font-bold">
          {temRecusa ? "Recusa registrada" : "APR pronta"}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {temRecusa
            ? "O registro de dever de recusa foi gravado. Baixe ou compartilhe o PDF."
            : "Sua Analise Preliminar de Risco foi gerada com sucesso. Baixe ou compartilhe o PDF."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo do documento</CardTitle>
          <CardDescription>Confira antes de compartilhar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted-foreground min-w-[80px]">Nome:</dt>
              <dd className="font-medium">{draft.contexto.nome || "-"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground min-w-[80px]">Area:</dt>
              <dd className="font-medium">{draft.contexto.area || "-"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground min-w-[80px]">Atividade:</dt>
              <dd className="font-medium">{draft.contexto.atividade || "-"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground min-w-[80px]">Data:</dt>
              <dd className="font-medium">
                {draft.contexto.data} {draft.contexto.horario}
              </dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Badge variant="default">{totalAplicaveis} riscos aplicaveis</Badge>
            {totalNA > 0 && <Badge variant="secondary">{totalNA} riscos N/A</Badge>}
            {totalEpis > 0 && <Badge variant="outline">{totalEpis} EPIs</Badge>}
            {temRecusa && <Badge variant="destructive">Dever de Recusa</Badge>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compartilhar</CardTitle>
          <CardDescription>
            Escolha como enviar o PDF para o seu chefe, equipe ou email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShareButtons
            draft={draft}
            onGeneratePdf={() => generateAprPdf(draft)}
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center pt-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          <Home className="h-4 w-4" />
          Voltar para home
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            resetApr();
            navigate("/contexto");
          }}
        >
          <RotateCcw className="h-4 w-4" />
          Iniciar nova APR
        </Button>
      </div>
    </div>
  );
}
