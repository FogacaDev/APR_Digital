import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/lib/ui/button";
import { StepProgress } from "@/features/apr/components/StepProgress";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { useTriagem } from "@/features/apr/hooks/useTriagem";
import { useDeverRecusa } from "@/features/apr/hooks/useDeverRecusa";
import { Loader2, AlertCircle } from "lucide-react";

import { ContextoPage } from "@/features/apr/pages/ContextoPage";
import { TriagemRiscosPage } from "@/features/apr/pages/TriagemRiscosPage";
import { ChecklistRiscoPage } from "@/features/apr/pages/ChecklistRiscoPage";
import { EpisPage } from "@/features/apr/pages/EpisPage";
import { LocaisEmergenciaPage } from "@/features/apr/pages/LocaisEmergenciaPage";
import { RevisaoPage } from "@/features/apr/pages/RevisaoPage";
import { DeverRecusaPage } from "@/features/apr/pages/DeverRecusaPage";

const STEPS = [
  { path: "/contexto", label: "Contexto" },
  { path: "/triagem", label: "Triagem de riscos" },
  { path: "/risco", label: "Checklist por risco" },
  { path: "/epis", label: "EPIs" },
  { path: "/locais", label: "Riscos locais + Emergencia" },
  { path: "/revisao", label: "Revisao" },
  { path: "/recusa", label: "Dever de Recusa" },
];

function stepIndexFromPath(pathname: string): number {
  if (pathname.startsWith("/risco")) return 3;
  const idx = STEPS.findIndex((s) => s.path === pathname);
  if (idx >= 0) return idx + 1;
  if (pathname === "/") return 1;
  return 1;
}

function Layout() {
  const { draft, hydrated, hydrate } = useAprForm();
  const navigate = useNavigate();
  const location = useLocation();
  const triagem = useTriagem();
  const recusa = useDeverRecusa();
  const currentStep = stepIndexFromPath(location.pathname);

  useEffect(() => {
    hydrate().catch(() => {});
  }, [hydrate]);

  if (!hydrated || !draft) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Carregando APR...</span>
        </div>
      </div>
    );
  }

  const isRecusaPage = location.pathname === "/recusa";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-primary leading-tight">APR Digital</h1>
            <p className="text-[10px] text-muted-foreground">
              Gerenciamento de Risco Critico
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              {triagem.totalAplicaveis} risco(s) aplicavel(is)
            </span>
            {recusa.temRecusa && (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 text-destructive-foreground font-semibold">
                <AlertCircle className="h-3 w-3" />
                Recusa
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24">
        <StepProgress
          current={currentStep}
          total={STEPS.length}
          label={STEPS[currentStep - 1]?.label}
        />

        <Outlet />

        {!isRecusaPage && (
          <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur border-t">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep === 1) return;
                  navigate(STEPS[currentStep - 2]?.path ?? "/contexto");
                }}
                disabled={currentStep === 1}
              >
                Voltar
              </Button>
              <Button
                onClick={() => {
                  if (currentStep >= STEPS.length) {
                    navigate("/recusa");
                    return;
                  }
                  navigate(STEPS[currentStep]?.path ?? "/contexto");
                }}
              >
                {currentStep >= STEPS.length ? "Ir para Recusa" : "Proximo"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ContextoPage /> },
      { path: "contexto", element: <ContextoPage /> },
      { path: "triagem", element: <TriagemRiscosPage /> },
      { path: "risco/:riskId", element: <ChecklistRiscoPage /> },
      { path: "risco", element: <ChecklistRiscoPage /> },
      { path: "epis", element: <EpisPage /> },
      { path: "locais", element: <LocaisEmergenciaPage /> },
      { path: "revisao", element: <RevisaoPage /> },
      { path: "recusa", element: <DeverRecusaPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
