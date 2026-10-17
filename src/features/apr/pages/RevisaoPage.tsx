import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { Button } from "@/lib/ui/button";
import { Badge } from "@/lib/ui/badge";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { useTriagem } from "@/features/apr/hooks/useTriagem";
import { useDeverRecusa } from "@/features/apr/hooks/useDeverRecusa";
import { AlertCircle, CheckCircle2, FileText } from "lucide-react";
import { getEpiById } from "@/features/apr/data/epis";

export function RevisaoPage() {
  const navigate = useNavigate();
  const { draft } = useAprForm();
  const triagem = useTriagem();
  const recusa = useDeverRecusa();
  if (!draft) return null;

  const contextoOk = Object.values(draft.contexto).every((v) => v.trim().length > 0);
  const topOk = draft.controlesTopo.every((c) => c.resposta !== null);

  return (
    <div className="space-y-6">
      {recusa.temRecusa && (
        <div className="rounded-lg border-2 border-destructive bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-destructive">
                GERACAO DE PDF BLOQUEADA
              </p>
              <p className="text-sm text-destructive/90 mt-1">
                {recusa.detalhes.length} controle(s) critico(s) com resposta NEGATIVA.
                Use o Dever de Recusa para registrar formalmente a interrupcao da atividade.
              </p>
              <Button
                variant="destructive"
                className="mt-3"
                onClick={() => navigate("/recusa")}
              >
                Ir para Dever de Recusa
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Resumo da APR</CardTitle>
          <CardDescription>
            Confira as informacoes antes de gerar o PDF.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              Contexto
              {contextoOk ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {Object.entries(draft.contexto).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="text-muted-foreground capitalize min-w-[80px]">{k}:</dt>
                  <dd className="font-medium">{v || <span className="text-destructive">nao preenchido</span>}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              Controles de topo
              {topOk ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
            </h3>
            <ul className="space-y-1 text-sm">
              {draft.controlesTopo.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2">
                  <span>{c.texto}</span>
                  <Badge
                    variant={
                      c.resposta === "sim"
                        ? "success"
                        : c.resposta === "nao"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {c.resposta === "sim" ? "SIM" : c.resposta === "nao" ? "NAO" : "—"}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">
              Triagem — {triagem.totalAplicaveis} aplicavel(is), {triagem.naoAplicaveis.length} N/A
            </h3>
            <ul className="space-y-1 text-sm">
              {triagem.aplicaveis.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2">
                  <span>{r.nome}</span>
                  <Badge variant="default">Aplicavel</Badge>
                </li>
              ))}
              {triagem.naoAplicaveis.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">{r.nome}</span>
                  <Badge variant="secondary">N/A</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">
              EPIs — {draft.epis.selecionados.length} selecionado(s)
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {draft.epis.selecionados.map((id) => {
                const epi = getEpiById(id);
                return epi ? (
                  <Badge key={id} variant="outline">
                    {epi.nome}
                  </Badge>
                ) : null;
              })}
              {draft.epis.selecionados.length === 0 && (
                <span className="text-sm text-muted-foreground">Nenhum EPI selecionado.</span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Emergencia</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Bombeiro:</dt>
                <dd className="font-medium">{draft.emergencia.bombeiro || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Ambulancia:</dt>
                <dd className="font-medium">{draft.emergencia.ambulancia || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Assinatura:</dt>
                <dd className="font-medium">{draft.emergencia.assinatura || "—"}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 justify-end">
        <Button
          variant="outline"
          onClick={() => navigate("/recusa")}
        >
          Registrar Dever de Recusa
        </Button>
        <Button
          size="lg"
          disabled={!contextoOk || !topOk || recusa.temRecusa}
          onClick={() => {
            alert(
              "Geracao de PDF sera implementada no Bloco 5.\n\n" +
                "No momento, todos os dados estao validados e salvos no IndexedDB."
            );
          }}
        >
          <FileText className="h-4 w-4" />
          Gerar PDF
        </Button>
      </div>
    </div>
  );
}
