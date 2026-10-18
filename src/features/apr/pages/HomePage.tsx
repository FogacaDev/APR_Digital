import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/lib/ui/button";
import { Card, CardContent } from "@/lib/ui/card";
import { Checkbox } from "@/lib/ui/checkbox";
import { Label } from "@/lib/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/lib/ui/dialog";
import { PrivacyNotice } from "@/features/apr/legal/PrivacyNotice";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { FileText, ClipboardList, RotateCcw, ArrowRight, Shield, ExternalLink } from "lucide-react";

const CONSENT_KEY = "apr-digital-lgpd-consent";

export function HomePage() {
  const navigate = useNavigate();
  const { draft, resetApr } = useAprForm();
  const [mostrarConsent, setMostrarConsent] = useState(false);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [checkboxMarcado, setCheckboxMarcado] = useState(false);

  const temRascunho =
    draft &&
    (draft.contexto.nome ||
      draft.contexto.area ||
      Object.keys(draft.triagem).length > 0 ||
      draft.controlesTopo.some((c) => c.resposta !== null));

  const jaConsentiu = () => localStorage.getItem(CONSENT_KEY) === "true";

  const iniciarApr = () => {
    if (jaConsentiu()) {
      navigate("/contexto");
    } else {
      setMostrarConsent(true);
    }
  };

  const confirmarConsentimento = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setMostrarConsent(false);
    navigate("/contexto");
  };

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-5">
          <ClipboardList className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary">APR Digital</h1>
        <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Faca sua Analise Preliminar de Risco de forma rapida e segura.
          Identifique os riscos da sua atividade, responda os controles
          criticos e gere o documento em PDF para compartilhar com sua equipe.
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 space-y-4">
          {temRascunho ? (
            <>
              <div className="text-sm text-center">
                <p className="font-semibold">Voce tem uma APR em andamento</p>
                <p className="text-muted-foreground">
                  Continue de onde parou ou comece uma nova.
                </p>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={iniciarApr}
              >
                <FileText className="h-4 w-4" />
                Continuar APR
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (confirm("Isso vai apagar o rascunho atual. Tem certeza?")) {
                    resetApr();
                  }
                }}
              >
                <RotateCcw className="h-4 w-4" />
                Comecar nova APR
              </Button>
            </>
          ) : (
            <Button
              className="w-full"
              size="lg"
              onClick={iniciarApr}
            >
              Iniciar nova APR
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground max-w-md mx-auto">
        <p>
          O preenchimento leva cerca de 5 a 10 minutos.
          Suas respostas sao salvas automaticamente.
        </p>
      </div>

      <Dialog open={mostrarConsent} onOpenChange={setMostrarConsent}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Antes de comecar
            </DialogTitle>
            <DialogDescription>
              Precisamos do seu consentimento (LGPD)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground leading-relaxed">
              Este app coleta dados pessoais (<strong>nome, matricula,
              assinatura</strong>) para gerar o documento APR.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Os dados ficam apenas neste dispositivo</strong> e nao
              sao enviados para nenhum servidor, nuvem ou terceiro.
            </p>

            <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
              <Checkbox
                id="lgpd-consent-inline"
                checked={checkboxMarcado}
                onCheckedChange={(checked) => setCheckboxMarcado(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="lgpd-consent-inline" className="text-sm cursor-pointer">
                Li e concordo com o Aviso de Privacidade
              </Label>
            </div>

            <Button
              variant="link"
              className="text-xs px-0 h-auto"
              onClick={() => setMostrarAviso(true)}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Ver aviso completo
            </Button>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMostrarConsent(false)}
            >
              Cancelar
            </Button>
            <Button
              disabled={!checkboxMarcado}
              onClick={confirmarConsentimento}
            >
              Aceitar e comecar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PrivacyNotice open={mostrarAviso} onOpenChange={setMostrarAviso} />
    </div>
  );
}
