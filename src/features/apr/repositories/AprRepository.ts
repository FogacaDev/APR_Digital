import type { AprDraft } from "@/types/apr";

/**
 * Interface de persistência da APR.
 *
 * Fase 1: implementação local (Dexie/IndexedDB).
 * Fase 3 (nuvem): implementação remota, mesmo contrato.
 *
 * O app NUNCA importa Dexie diretamente — sempre passa por esta interface.
 */

export interface AprRepository {
  save(draft: AprDraft): Promise<void>;
  load(id: string): Promise<AprDraft | null>;
  getCurrentDraft(): Promise<AprDraft | null>;
  clearCurrentDraft(): Promise<void>;
  listAll(): Promise<AprDraft[]>;
}
