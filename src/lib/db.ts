import Dexie, { type Table } from "dexie";
import type { AprDraft } from "@/types/apr";

/**
 * Banco local (IndexedDB via Dexie).
 * Guarda os drafts de APR.
 *
 * Fase 1: apenas 1 draft por vez (mas a tabela suporta N).
 * Fase 3 (nuvem): esta tabela continua existindo para offline-first.
 */

export interface DraftRecord extends AprDraft {
  // O AprDraft já tem id, createdAt, updatedAt — perfeito para indexar
}

export class AprDatabase extends Dexie {
  drafts!: Table<DraftRecord, string>;

  constructor() {
    super("apr-digital-db");
    this.version(1).stores({
      drafts: "id, createdAt, updatedAt, status",
    });
  }
}

export const db = new AprDatabase();
