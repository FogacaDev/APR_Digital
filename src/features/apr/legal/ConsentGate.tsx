import { useState } from "react";
import { Button } from "@/lib/ui/button";
import { Card, CardContent } from "@/lib/ui/card";
import { Checkbox } from "@/lib/ui/checkbox";
import { Label } from "@/lib/ui/label";
import { Shield, ExternalLink } from "lucide-react";
import { PrivacyNotice } from "@/features/apr/legal/PrivacyNotice";

const STORAGE_KEY = "apr-digital-lgpd-consent";

export function ConsentGate({ children }: { children: React.ReactNode }) {
  const [consentido, setConsentido] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [checkboxMarcado, setCheckboxMarcado] = useState(false);

  if (consentido) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-4">
      <Card className="max-w-lg w-full">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Antes de começar</h1>
              <p className="text-sm text-muted-foreground">
                Precisamos do seu consentimento (LGPD)
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>
              Este app coleta dados pessoais (<strong>nome, matricula,
              assinatura</strong>) para gerar o documento APR.
            </p>
            <p>
              <strong>Os dados ficam apenas neste dispositivo</strong> e nao
              sao enviados para nenhum servidor, nuvem ou terceiro.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
            <Checkbox
              id="lgpd-consent"
              checked={checkboxMarcado}
              onCheckedChange={(checked) => setCheckboxMarcado(checked === true)}
              className="mt-0.5"
            />
            <Label htmlFor="lgpd-consent" className="text-sm cursor-pointer">
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

          <Button
            className="w-full"
            size="lg"
            disabled={!checkboxMarcado}
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, "true");
              setConsentido(true);
            }}
          >
            Começar
          </Button>
        </CardContent>
      </Card>

      <PrivacyNotice open={mostrarAviso} onOpenChange={setMostrarAviso} />
    </div>
  );
}
