import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { Checkbox } from "@/lib/ui/checkbox";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { EPIS_CATALOGO } from "@/features/apr/data/epis";

export function EpisPage() {
  const { draft, toggleEpi, setEpiCampoLivre } = useAprForm();
  if (!draft) return null;

  const selecionados = draft.epis.selecionados;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>EPIs necessarios</CardTitle>
          <CardDescription>
            Assinale somente os EPIs aplicaveis a esta atividade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EPIS_CATALOGO.map((epi) => {
              const checked = selecionados.includes(epi.id);
              return (
                <div
                  key={epi.id}
                  className="rounded-lg border p-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`epi-${epi.id}`}
                      checked={checked}
                      onCheckedChange={() => toggleEpi(epi.id)}
                    />
                    <Label htmlFor={`epi-${epi.id}`} className="cursor-pointer text-sm">
                      {epi.nome}
                    </Label>
                  </div>
                  {epi.campoLivre && (
                    <Input
                      placeholder={
                        epi.id === "luvas" ? "Especifique o tipo de luva" : "Especifique"
                      }
                      value={epi.id === "luvas" ? draft.epis.luvas : draft.epis.outros}
                      onChange={(e) =>
                        setEpiCampoLivre(
                          epi.id === "luvas" ? "luvas" : "outros",
                          e.target.value
                        )
                      }
                      disabled={!checked}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
