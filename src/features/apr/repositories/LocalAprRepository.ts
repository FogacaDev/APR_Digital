import type { AprDraft } from "@/types/apr";
import { db } from "@/lib/db";
import type { AprRepository } from "./AprRepository";

/**
 * Implementação local (IndexedDB).
 * Fase 1: apenas o draft mais recente é relevante para a UI.
 */
export class LocalAprRepository implements AprRepository {
  async save(draft: AprDraft): Promise<void> {
    await db.drafts.put(draft);
  }

  async load(id: string): Promise<AprDraft | null> {
    const record = await db.drafts.get(id);
    return record ?? null;
  }

  async getCurrentDraft(): Promise<AprDraft | null> {
    const latest = await db.drafts
      .orderBy("updatedAt")
      .reverse()
      .first();
    return latest ?? null;
  }

  async clearCurrentDraft(): Promise<void> {
    const current = await this.getCurrentDraft();
    if (current) {
      await db.drafts.delete(current.id);
    }
  }

  async listAll(): Promise<AprDraft[]> {
    return db.drafts.orderBy("updatedAt").reverse().toArray();
  }
}
