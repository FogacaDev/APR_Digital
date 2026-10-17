import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/lib/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { StepProgress } from "@/features/apr/components/StepProgress";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { useTriagem } from "@/features/apr/hooks/useTriagem";
import { Loader2 } from "lucide-react";

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
  return idx >= 0 ? idx + 1 : 1;
}

function Layout() {
  const { draft, hydrated, hydrate } = useAprForm();
  const navigate = useNavigate();
  const location = useLocation();
  const triagem = useTriagem();
  const currentStep = stepIndexFromPath(location.pathname);

  useEffect(() => {
    hydrate().catch(() => {});
  }, [hydrate]);

  if (!hydrated || !draft) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Carregando APR...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-primary">APR Digital</h1>
            <p className="text-xs text-muted-foreground">Gerenciamento de Risco Critico</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {triagem.totalAplicaveis} risco(s) aplicavel(is)
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <StepProgress
          current={currentStep}
          total={STEPS.length}
          label={STEPS[currentStep - 1]?.label}
        />

        <Outlet />

        <div className="flex items-center justify-between gap-3 pt-4 border-t">
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
      </main>
    </div>
  );
}

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Esta tela sera construida no Bloco 4b. Por enquanto, use os botoes
          <strong> Voltar </strong> e <strong>Proximo</strong> para navegar pelo wizard.
        </p>
      </CardContent>
    </Card>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Placeholder
            title="Bem-vindo ao APR Digital"
            description="Use 'Proximo' para comecar pelo contexto."
          />
        ),
      },
      {
        path: "contexto",
        element: (
          <Placeholder
            title="Contexto"
            description="Nome, area, atividade, matricula, data, horario + 3 controles de topo."
          />
        ),
      },
      {
        path: "triagem",
        element: (
          <Placeholder
            title="Triagem de riscos"
            description="Grid de 11 cards: Aplicavel / Nao aplicavel / Nao selecionado."
          />
        ),
      },
      {
        path: "risco",
        element: (
          <Placeholder
            title="Checklist por risco"
            description="Uma tela por risco aplicavel, com os controles criticos (SIM / NAO / N/A)."
          />
        ),
      },
      {
        path: "epis",
        element: (
          <Placeholder title="EPIs" description="Grid de checkboxes dos EPIs necessarios." />
        ),
      },
      {
        path: "locais",
        element: (
          <Placeholder
            title="Riscos locais + Emergencia"
            description="Tabela de perigos/controles + bombeiro, ambulancia, assinatura."
          />
        ),
      },
      {
        path: "revisao",
        element: (
          <Placeholder
            title="Revisao"
            description="Resumo da APR + botao Gerar PDF (desabilitado se Dever de Recusa ativo)."
          />
        ),
      },
      {
        path: "recusa",
        element: (
          <Placeholder
            title="Dever de Recusa"
            description="Textarea + botao Registrar Recusa."
          />
        ),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
