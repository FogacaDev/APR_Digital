/**
 * Catálogo de EPIs disponíveis.
 * Ids são estáveis — não mude depois de publicado.
 */

export interface Epi {
  id: string;
  nome: string;
  /** Se true, tem campo de texto livre associado (ex.: "Luvas: ___") */
  campoLivre?: boolean;
}

export const EPIS_CATALOGO: Epi[] = [
  { id: "capacete_jugular", nome: "Capacete c/ jugular" },
  { id: "oculos", nome: "Óculos de segurança" },
  { id: "protetor_auditivo", nome: "Proteção auditiva" },
  { id: "protetor_respiratorio", nome: "Proteção respiratória" },
  { id: "capuz_fuga", nome: "Capuz de fuga" },
  { id: "vestimenta_termica", nome: "Vestimenta de prot. térmica" },
  { id: "calcado", nome: "Calçado de segurança" },
  { id: "protetor_facial", nome: "Protetor facial" },
  { id: "balaclava", nome: "Balaclava/Capuz" },
  { id: "macacao_tychem", nome: "Macacão Tychem" },
  { id: "macacao_tyvek", nome: "Macacão de Tyvek" },
  { id: "avental", nome: "Avental" },
  { id: "luvas", nome: "Luvas", campoLivre: true },
  { id: "perneira", nome: "Perneira" },
  { id: "cinto_seguranca", nome: "Cinto de segurança" },
  { id: "conjunto_solda", nome: "Conjunto de solda" },
  { id: "mascara_solda", nome: "Máscara de solda" },
  { id: "vestimenta_eletricista", nome: "Vestimenta de eletricista" },
  { id: "diphoterine", nome: "Diphoterine" },
  { id: "outros", nome: "Outros", campoLivre: true },
];

export function getEpiById(id: string): Epi | undefined {
  return EPIS_CATALOGO.find((e) => e.id === id);
}
