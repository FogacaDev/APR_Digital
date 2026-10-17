import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { TopControls } from "@/features/apr/components/TopControls";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import type { ContextoData } from "@/types/apr";

const CAMPOS: Array<{ id: keyof ContextoData; label: string; type: string }> = [
  { id: "nome", label: "Nome", type: "text" },
  { id: "area", label: "Area", type: "text" },
  { id: "atividade", label: "Atividade", type: "text" },
  { id: "matricula", label: "Matricula", type: "text" },
  { id: "data", label: "Data", type: "date" },
  { id: "horario", label: "Horario", type: "time" },
];

export function ContextoPage() {
  const { draft, setContexto } = useAprForm();
  if (!draft) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contexto da atividade</CardTitle>
          <CardDescription>
            Identifique quem esta executando a APR, onde, o que e quando.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAMPOS.map((campo) => (
              <div key={campo.id} className="space-y-1.5">
                <Label htmlFor={campo.id}>
                  {campo.label}
                  <span className="text-destructive ml-0.5">*</span>
                </Label>
                <Input
                  id={campo.id}
                  type={campo.type}
                  value={draft.contexto[campo.id]}
                  onChange={(e) => setContexto(campo.id, e.target.value)}
                  placeholder={`Informe ${campo.label.toLowerCase()}`}
                  autoComplete="off"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <TopControls />
        </CardContent>
      </Card>
    </div>
  );
}
