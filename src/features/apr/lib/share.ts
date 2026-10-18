import type { AprDraft } from "@/types/apr";

export function buildShareMessage(draft: AprDraft): string {
  const nome = draft.contexto.nome || "(sem nome)";
  const area = draft.contexto.area || "(sem area)";
  const atividade = draft.contexto.atividade || "(sem atividade)";
  const data = draft.contexto.data || "";
  const horario = draft.contexto.horario || "";
  const totalAplicaveis = Object.values(draft.triagem).filter(
    (e) => e === "aplicavel"
  ).length;
  const totalNA = Object.values(draft.triagem).filter(
    (e) => e === "nao_aplicavel"
  ).length;

  const linhas: string[] = [
    "APR Digital - Analise Preliminar de Risco",
    "",
    `Colaborador: ${nome}`,
    `Area: ${area}`,
    `Atividade: ${atividade}`,
    `Data: ${data} ${horario}`.trim(),
    `Riscos aplicaveis: ${totalAplicaveis}`,
    `Riscos N/A: ${totalNA}`,
  ];

  if (draft.recusa) {
    linhas.push("");
    linhas.push("*** DEVER DE RECUSA REGISTRADO ***");
    linhas.push(`Motivo: ${draft.recusa.motivo}`);
  }

  linhas.push("");
  linhas.push(
    "O PDF completo foi gerado no dispositivo do colaborador e deve ser anexado a esta conversa."
  );

  return linhas.join("\n");
}

export function shareViaWhatsApp(draft: AprDraft): void {
  const mensagem = buildShareMessage(draft);
  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function shareViaEmail(draft: AprDraft): void {
  const mensagem = buildShareMessage(draft);
  const assunto = `APR - ${draft.contexto.nome || "Analise de Risco"} - ${
    draft.contexto.data || ""
  }`.trim();
  const url = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(
    mensagem
  )}`;
  window.location.href = url;
}

export async function shareNative(
  draft: AprDraft,
  blob: Blob
): Promise<boolean> {
  if (typeof navigator === "undefined" || !("share" in navigator)) {
    return false;
  }

  const nomeArquivo = `APR_${
    draft.contexto.nome?.replace(/\s+/g, "_") ?? "analise"
  }_${draft.contexto.data || new Date().toISOString().slice(0, 10)}.pdf`;

  const file = new File([blob], nomeArquivo, { type: "application/pdf" });

  if (
    "canShare" in navigator &&
    typeof navigator.canShare === "function" &&
    !navigator.canShare({ files: [file] })
  ) {
    return false;
  }

  try {
    await navigator.share({
      title: "APR Digital",
      text: buildShareMessage(draft),
      files: [file],
    });
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return true;
    console.error("Erro no share nativo:", error);
    return false;
  }
}
