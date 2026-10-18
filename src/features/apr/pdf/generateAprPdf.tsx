import { pdf } from "@react-pdf/renderer";
import type { AprDraft } from "@/types/apr";
import { AprDocument } from "./AprDocument";

/**
 * Gera o PDF da APR e retorna como Blob.
 * Quem chama decide o que fazer: baixar, compartilhar, etc.
 */
export async function generateAprPdf(draft: AprDraft): Promise<Blob> {
  const doc = <AprDocument draft={draft} />;
  const blob = await pdf(doc).toBlob();
  return blob;
}

/**
 * Gera o PDF e dispara download com nome amigavel.
 */
export async function downloadAprPdf(draft: AprDraft): Promise<void> {
  const blob = await generateAprPdf(draft);
  const dataStr = draft.contexto.data || new Date().toISOString().slice(0, 10);
  const nome = draft.contexto.nome
    ? `APR_${draft.contexto.nome.replace(/\s+/g, "_")}_${dataStr}.pdf`
    : `APR_${dataStr}.pdf`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
