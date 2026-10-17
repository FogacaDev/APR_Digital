import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { aprRepository } from "@/features/apr/repositories";
import {
  RISK_CATEGORIES,
  TOTAL_RISKS,
  TOTAL_CONTROLES,
} from "@/features/apr/data/risks";
import { EPIS_CATALOGO } from "@/features/apr/data/epis";
import {
  aprDraftSchema,
  validateForPdf,
} from "@/features/apr/schemas/aprSchema";
import type { AprDraft } from "@/types/apr";

/**
 * ⚠️ PAINEL DE DEBUG TEMPORÁRIO — Bloco 2.
 * Será substituído pelo router do wizard no Bloco 4.
 */

function createEmptyDraft(): AprDraft {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    schemaVersion: 1,
    createdAt: now,
    updatedAt: now,
    status: "rascunho",
    contexto: {
      nome: "",
      area: "",
      atividade: "",
      matricula: "",
      data: "",
      horario: "",
    },
    controlesTopo: [
      {
        id: "sinto_bem",
        texto: "Sinto-me bem para realizar essa atividade?",
        resposta: null,
      },
      {
        id: "sabem_onde",
        texto: "As pessoas sabem onde eu estou?",
        resposta: null,
      },
      {
        id: "afeta_outros",
        texto: "Alguém pode ser afetado por essa atividade?",
        resposta: null,
      },
    ],
    triagem: {},
    respostas: {},
    epis: { selecionados: [], luvas: "", outros: "" },
    riscosLocais: [],
    emergencia: { bombeiro: "", ambulancia: "", assinatura: "" },
    recusa: null,
  };
}

export default function App() {
  const [status, setStatus] = useState<"idle" | "running" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string>("");
  const [draft, setDraft] = useState<AprDraft | null>(null);

  useEffect(() => {
    async function testRepository() {
      setStatus("running");
      try {
        const novo = createEmptyDraft();
        novo.contexto.nome = "Teste Bloco 2";
        novo.contexto.area = "Área de teste";

        await aprRepository.save(novo);
        setMessage(`Salvou draft id=${novo.id.slice(0, 8)}...`);

        const recuperado = await aprRepository.getCurrentDraft();
        if (!recuperado || recuperado.id !== novo.id) {
          throw new Error("Draft recuperado não confere com o salvo");
        }
        setMessage(
          `Salvou e recuperou draft id=${recuperado.id.slice(0, 8)}...`,
        );

        const validado = aprDraftSchema.safeParse(recuperado);
        if (!validado.success) {
          throw new Error("Schema Zod rejeitou o draft");
        }

        const issues = validateForPdf(recuperado);
        setMessage(
          `Salvou, recuperou, validou. Pendências p/ PDF: ${issues.length} (esperado, contexto vazio)`,
        );

        setDraft(recuperado);
        setStatus("ok");
      } catch (e) {
        setMessage(e instanceof Error ? e.message : String(e));
        setStatus("error");
      }
    }
    testRepository();
  }, []);

  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">
            APR Digital — Bloco 2
          </h1>
          <p className="text-muted-foreground">
            Teste do domínio, riscos declarativos e repositório.
          </p>
        </header>

        {/* Status do teste de repositório */}
        <section className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            {status === "running" && (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
            {status === "ok" && (
              <CheckCircle2 className="h-5 w-5 text-success" />
            )}
            {status === "error" && (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )}
            <h2 className="font-semibold">Teste do repositório</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{message}</p>
        </section>

        {/* Métricas */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm text-muted-foreground">
              Riscos cadastrados
            </div>
            <div className="text-3xl font-bold text-primary">{TOTAL_RISKS}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm text-muted-foreground">
              Controles críticos
            </div>
            <div className="text-3xl font-bold text-primary">
              {TOTAL_CONTROLES}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm text-muted-foreground">
              EPIs no catálogo
            </div>
            <div className="text-3xl font-bold text-primary">
              {EPIS_CATALOGO.length}
            </div>
          </div>
        </section>

        {/* Lista de riscos */}
        <section className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-semibold mb-3">Categorias de risco</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {RISK_CATEGORIES.map((risk) => (
              <li
                key={risk.id}
                className="flex items-center justify-between rounded-md border border-border/50 px-3 py-2 text-sm"
              >
                <span>{risk.nome}</span>
                <span className="text-xs text-muted-foreground">
                  {risk.controles.length} controles
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Draft atual */}
        {draft && (
          <section className="rounded-lg border border-border bg-card p-4">
            <h2 className="font-semibold mb-2">Draft atual (resumo)</h2>
            <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
              {JSON.stringify(
                {
                  id: draft.id,
                  status: draft.status,
                  contexto: draft.contexto,
                  schemaVersion: draft.schemaVersion,
                },
                null,
                2,
              )}
            </pre>
          </section>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Painel temporário — será removido no Bloco 4.
        </p>
      </div>
    </main>
  );
}
