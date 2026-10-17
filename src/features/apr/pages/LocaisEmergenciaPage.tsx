import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/ui/card";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { Button } from "@/lib/ui/button";
import { useAprForm } from "@/features/apr/hooks/useAprForm";
import { Plus, Trash2 } from "lucide-react";

export function LocaisEmergenciaPage() {
  const {
    draft,
    addRiscoLocal,
    removeRiscoLocal,
    setRiscoLocalCampo,
    setEmergencia,
  } = useAprForm();
  if (!draft) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Riscos da area no local da atividade</CardTitle>
          <CardDescription>
            Liste os perigos especificos do local e as medidas de controle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden sm:grid grid-cols-[1fr_1fr_auto] gap-2 text-xs font-semibold text-muted-foreground px-1">
            <span>Perigo / Risco</span>
            <span>Medida / Acao de controle</span>
            <span className="w-9" />
          </div>
          {draft.riscosLocais.map((risco, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
              <Input
                placeholder="Perigo"
                value={risco.perigo}
                onChange={(e) => setRiscoLocalCampo(idx, "perigo", e.target.value)}
              />
              <Input
                placeholder="Controle"
                value={risco.controle}
                onChange={(e) => setRiscoLocalCampo(idx, "controle", e.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeRiscoLocal(idx)}
                disabled={draft.riscosLocais.length <= 1}
                aria-label="Remover linha"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addRiscoLocal} className="mt-2">
            <Plus className="h-4 w-4" />
            Adicionar linha
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Em caso de emergencia</CardTitle>
          <CardDescription>
            Contatos e assinatura do responsavel pela APR.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bombeiro">Bombeiro</Label>
              <Input
                id="bombeiro"
                placeholder="Ex.: 193"
                value={draft.emergencia.bombeiro}
                onChange={(e) => setEmergencia("bombeiro", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ambulancia">Ambulancia</Label>
              <Input
                id="ambulancia"
                placeholder="Ex.: 192"
                value={draft.emergencia.ambulancia}
                onChange={(e) => setEmergencia("ambulancia", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="assinatura">Assinatura</Label>
            <Input
              id="assinatura"
              placeholder="Nome de quem preencheu"
              value={draft.emergencia.assinatura}
              onChange={(e) => setEmergencia("assinatura", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
