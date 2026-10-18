import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/lib/ui/button";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

export function PwaInstallButton() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      globalDeferredPrompt = e as BeforeInstallPromptEvent;
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone) return null;

  const handleInstall = async () => {
    if (globalDeferredPrompt) {
      await globalDeferredPrompt.prompt();
      const { outcome } = await globalDeferredPrompt.userChoice;
      if (outcome === "accepted") {
        globalDeferredPrompt = null;
      }
    } else {
      toast.info(
        "Para instalar: toque no menu do navegador (três pontinhos) e escolha 'Instalar aplicativo' ou 'Adicionar à tela de início'.",
        { duration: 8000 }
      );
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full max-w-md mx-auto flex gap-2 border-primary/30 text-primary hover:bg-primary/5"
      onClick={handleInstall}
    >
      <Smartphone className="h-4 w-4" />
      Instalar App no Dispositivo
    </Button>
  );
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("apr-digital-install-dismissed") === "true") {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      globalDeferredPrompt = e as BeforeInstallPromptEvent;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!show || !deferredPrompt) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
    globalDeferredPrompt = null;
  };

  const handleDismiss = () => {
    localStorage.setItem("apr-digital-install-dismissed", "true");
    setShow(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50 bg-card border border-primary/20 shadow-xl rounded-xl p-4 animate-in slide-in-from-bottom-5">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3 pr-6">
        <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0 text-primary">
          <Download className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Instalar APR Digital</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-3">
            Instale o app no seu dispositivo para acesso rápido e offline.
          </p>
          <Button size="sm" onClick={handleInstall} className="w-full">
            Instalar agora
          </Button>
        </div>
      </div>
    </div>
  );
}
