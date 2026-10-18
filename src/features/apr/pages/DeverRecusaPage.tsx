import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { Badge } from "@/lib/ui/badge";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { useDeverRecusa } from "@/features/apr/hooks/useDeverRecusa";
import { AlertCircle, CheckCircle2, RotateCcw, FileText, Loader2 } from "lucide-react";

export function DeverRecusaPage() {
  const navigate = useNavigate();
  const { draft, registrarRecusa, resetApr } = useAprForm();
  const recusa = useDeverRecusa();
  const [motivo, setMotivo] = useState(draft?.recusa?.motivo ?? "");
  const [assinatura, setAssinatura] = useState("");
  const [gerando, setGerando] = useState(false);

  if (!draft) return null;

  const jaRegistrada = draft.status === "recusado" && draft.recusa !== null;

  async function handleBaixarPDF() {
    if (!draft) return;
    setGerando(true);
    try {
      const { downloadAprPdf } = await import("@/features/apr/pdf/generateAprPdf");
      await downloadAprPdf(draft);
      toast.success("PDF de recusa baixado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar PDF.");
    } finally {
      setGerando(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Dever de Recusa</CardTitle>
          <CardDescription>
            Use este formulario para registrar formalmente que a atividade foi
            interrompida por um controle critico ausente. O registro sera
            preservado mesmo apos recarregar a pagina.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {jaRegistrada ? (
            <div className="rounded-lg border border-success bg-success/10 p-4 flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-success">Dever de recusa registrado</p>
                <p className="text-sm mt-1">
                  Status: <strong>{draft.status}</strong> - Registrado em{" "}
                  {new Date(draft.recusa!.registradoEm).toLocaleString("pt-BR")}
                </p>
                <p className="text-sm mt-1">
                  Motivo: <em>{draft.recusa!.motivo}</em>
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button
                    variant="default"
                    size="sm"
                    disabled={gerando}
                    onClick={handleBaixarPDF}
                  >
                    {gerando ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        Baixar PDF de Recusa
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetApr}>
                    <RotateCcw className="h-4 w-4" />
                    Iniciar nova APR
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {recusa.temRecusa && (
                <div className="rounded-lg border-2 border-destructive bg-destructive/10 p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-destructive text-sm">
                        Controles com resposta NEGATIVA ({recusa.detalhes.length}):
                      </p>
                      <ul className="text-sm text-destructive/90 list-disc list-inside mt-1 space-y-0.5">
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

              {!recusa.temRecusa && (
                <div className="rounded-lg border border-warning bg-warning/10 p-3 text-sm">
                  Nenhum controle critico negativo foi detectado. Se voce quer
                  registrar uma recusa mesmo assim, descreva o motivo abaixo.
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="motivo">
                  Motivo da recusa
                  <span className="text-destructive ml-0.5">*</span>
                </Label>
                <textarea
                  id="motivo"
                  rows={5}
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Descreva por que a atividade nao pode ser executada com seguranca..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="assinatura-recusa">Assinatura (quem registra)</Label>
                <Input
                  id="assinatura-recusa"
                  value={assinatura}
                  onChange={(e) => setAssinatura(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <Button
                variant="destructive"
                size="lg"
                disabled={motivo.trim().length < 10}
                onClick={() => {
                  registrarRecusa({
                    motivo: motivo.trim(),
                    registradoEm: Date.now(),
                    controlesComFalha: recusa.controlesComFalha,
                  });
                }}
              >
                <AlertCircle className="h-4 w-4" />
                Registrar Dever de Recusa
              </Button>

              <p className="text-xs text-muted-foreground">
                Ao registrar, a APR sera marcada como <strong>recusada</strong> e
                o PDF podera ser gerado em seguida.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {jaRegistrada && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="destructive">Status: recusado</Badge>
          <Badge variant="outline">
            {draft.recusa!.controlesComFalha.length} controle(s) em falta
          </Badge>
        </div>
      )}

      <div className="flex justify-end">
        <Button variant="outline" onClick={() => navigate("/revisao")}>
          Voltar para Revisao
        </Button>
      </div>
    </div>
  );
}
