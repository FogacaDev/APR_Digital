import { useState } from "react";
import { toast } from "sonner";
import type { AprDraft } from "@/types/apr";
import { Button } from "@/lib/ui/button";
import { Checkbox } from "@/lib/ui/checkbox";
import { Label } from "@/lib/ui/label";
import {
  Download,
  Share2,
  MessageCircle,
  Mail,
  Loader2,
  Shield,
} from "lucide-react";
import {
  shareViaWhatsApp,
  shareViaEmail,
  shareNative,
} from "@/features/apr/lib/share";

interface ShareButtonsProps {
  draft: AprDraft;
  onGeneratePdf: () => Promise<Blob>;
  onDownloaded?: () => void;
}

export function ShareButtons({ draft, onGeneratePdf, onDownloaded }: ShareButtonsProps) {
  const [lgpdAceito, setLgpdAceito] = useState(false);
  const [carregando, setCarregando] = useState<string | null>(null);

  const podeCompartilhar = lgpdAceito;

  async function handleBaixar() {
    setCarregando("baixar");
    try {
      const blob = await onGeneratePdf();
      const nomeArquivo = `APR_${
        draft.contexto.nome?.replace(/\s+/g, "_") ?? "analise"
      }_${draft.contexto.data || new Date().toISOString().slice(0, 10)}.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("PDF baixado!");
      onDownloaded?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar PDF.");
    } finally {
      setCarregando(null);
    }
  }

  async function handleCompartilhar() {
    if (!podeCompartilhar) return;
    setCarregando("share");
    try {
      const blob = await onGeneratePdf();
      const ok = await shareNative(draft, blob);
      if (ok) {
        toast.success("Compartilhado!");
        return;
      }
      toast.info(
        "Seu navegador nao suporta compartilhar arquivo. O PDF foi baixado. Anexe-o no WhatsApp ou Email."
      );
      await handleBaixar();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao compartilhar.");
    } finally {
      setCarregando(null);
    }
  }

  function handleWhatsApp() {
    if (!podeCompartilhar) return;
    shareViaWhatsApp(draft);
  }

  function handleEmail() {
    if (!podeCompartilhar) return;
    shareViaEmail(draft);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-semibold">Aviso de privacidade (LGPD)</p>
            <p className="text-xs text-muted-foreground">
              Este PDF contem dados pessoais (nome, matricula, assinatura).
              Compartilhe apenas com pessoas autorizadas.
            </p>
            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="lgpd-share"
                checked={lgpdAceito}
                onCheckedChange={(c) => setLgpdAceito(c === true)}
              />
              <Label
                htmlFor="lgpd-share"
                className="text-sm cursor-pointer leading-tight"
              >
                Estou ciente e assumo a responsabilidade pelo compartilhamento
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          size="lg"
          variant="default"
          onClick={handleBaixar}
          disabled={carregando !== null}
          className="w-full"
        >
          {carregando === "baixar" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Baixar PDF
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={handleCompartilhar}
          disabled={!podeCompartilhar || carregando !== null}
          className="w-full"
        >
          {carregando === "share" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
          Compartilhar
        </Button>

        <Button
          size="lg"
          onClick={handleWhatsApp}
          disabled={!podeCompartilhar}
          className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>

        <Button
          size="lg"
          variant="secondary"
          onClick={handleEmail}
          disabled={!podeCompartilhar}
          className="w-full"
        >
          <Mail className="h-4 w-4" />
          Email
        </Button>
      </div>

      {!podeCompartilhar && (
        <p className="text-xs text-muted-foreground text-center">
          Aceite o aviso de privacidade acima para habilitar compartilhamento.
          O download do PDF continua livre.
        </p>
      )}
    </div>
  );
}
