import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/lib/ui/dialog";
import { Button } from "@/lib/ui/button";
import { Shield, Lock, Smartphone, UserCheck, Trash2 } from "lucide-react";

export interface PrivacyNoticeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyNotice({ open, onOpenChange }: PrivacyNoticeProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Aviso de Privacidade (LGPD)
          </DialogTitle>
          <DialogDescription>
            Como tratamos seus dados pessoais neste aplicativo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-sm">
          <section>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              1. Onde os dados ficam armazenados
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Seus dados ficam apenas neste dispositivo</strong> (navegador/celular),
              armazenados localmente no IndexedDB. Eles <strong>não são enviados
              para servidores do desenvolvedor, nuvem ou qualquer terceiro</strong>.
              O aplicativo funciona 100% offline.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              2. Quais dados são coletados
            </h3>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 leading-relaxed">
              <li>Nome, area, atividade, matricula, data e horario</li>
              <li>Respostas dos controles criticos de risco</li>
              <li>EPIs selecionados e riscos locais</li>
              <li>Contatos de emergencia (bombeiro, ambulancia)</li>
              <li>Assinatura (desenho ou nome digitado)</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-primary" />
              3. Para que servem
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Os dados sao usados <strong>exclusivamente</strong> para gerar
              o documento APR (Analise Preliminar de Risco) em PDF, permitindo
              que voce compartilhe com sua equipe e chefia.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-primary" />
              4. Compartilhamento
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Nenhum dado é compartilhado automaticamente.</strong>
              O PDF só é gerado e compartilhado quando <strong>você</strong> clica
              nos botões correspondentes. Você é o único responsável pelo
              compartilhamento após gerar o PDF.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">5. Seus direitos (LGPD)</h3>
            <ul className="text-muted-foreground list-disc list-inside space-y-1 leading-relaxed">
              <li>Voce pode apagar seus dados a qualquer momento</li>
              <li>Nao ha coleta para publicidade ou perfilamento</li>
              <li>Nao ha cookies de rastreamento</li>
              <li>Para apagar: use "Nova APR" na home ou limpe os dados do navegador</li>
            </ul>
          </section>

          <section className="border-t pt-3">
            <h3 className="font-semibold mb-1">Base legal</h3>
            <p className="text-muted-foreground leading-relaxed">
              Consentimento (Art. 7o, I) e execucao de contrato (Art. 7o, V) da
              Lei 13.709/2018 - a APR e parte do procedimento de seguranca do
              trabalho da empresa.
            </p>
          </section>

          <section className="border-t pt-3">
            <h3 className="font-semibold mb-1">Responsavel pelo app</h3>
            <p className="text-muted-foreground leading-relaxed">
              Renan Fogaça - renan.fogaca@hotmail.com
            </p>
          </section>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Entendi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
