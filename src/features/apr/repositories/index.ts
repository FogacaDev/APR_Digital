import { LocalAprRepository } from "./LocalAprRepository";
import type { AprRepository } from "./AprRepository";

/**
 * Fábrica do repositório.
 * Fase 1: sempre local.
 * Fase 3: ler de import.meta.env.VITE_BACKEND e escolher entre Local e Remote.
 */
export const aprRepository: AprRepository = new LocalAprRepository();

export type { AprRepository };
export { LocalAprRepository };
