/**
 * Catálogo declarativo dos riscos fatais e seus controles críticos.
 *
 * ⚠️ Esta é a única fonte de verdade dos riscos.
 * Adicionar um novo risco = editar este arquivo (não um componente).
 *
 * Cada controle deve ter um `id` estável (nunca mude depois de publicado,
 * senão quebra APRs antigas).
 */

export interface ControleCritico {
  id: string;
  texto: string;
  /** Se true, resposta "NÃO" dispara Dever de Recusa */
  obrigatorio: boolean;
  /** Explicação opcional (tooltip "?") */
  ajuda?: string;
}

export interface RiskCategory {
  id: string;
  nome: string;
  descricao: string;
  /** Nome do ícone lucide-react (usado na UI) */
  icone: string;
  controles: ControleCritico[];
}

export const RISK_CATEGORIES: RiskCategory[] = [
  {
    id: "afogamento",
    nome: "Afogamento",
    descricao: "Trabalho próximo ou sobre água, diques, piscinas, rios.",
    icone: "Waves",
    controles: [
      {
        id: "flutuacao",
        texto: "Os dispositivos de flutuação estão disponíveis e em boas condições?",
        obrigatorio: true,
      },
      {
        id: "protecao_queda_agua",
        texto: "Os equipamentos de proteção ou barreiras contra queda estão sendo utilizados?",
        obrigatorio: true,
      },
      {
        id: "superficie_estavel",
        texto:
          "A superfície onde o equipamento móvel está operando é estável e oferece bom suporte?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "espaco_confinado",
    nome: "Espaço Confinado",
    descricao: "Tanques, silos, tubulações, porões, galerias, qualquer espaço com ventilação limitada.",
    icone: "Container",
    controles: [
      {
        id: "teste_atmosferico",
        texto: "Foi realizado teste atmosférico e monitoramento contínuo?",
        obrigatorio: true,
      },
      {
        id: "bloqueio_energias_ec",
        texto: "O bloqueio de energias foi executado conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "exaustao_ventilacao",
        texto: "Existe exaustão/ventilação de acordo com a avaliação da tarefa?",
        obrigatorio: true,
      },
      {
        id: "sucata_porao",
        texto: "(SF) O porão está isento de sucata?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "eletricidade",
    nome: "Contato com Eletricidade",
    descricao: "Trabalho em painéis, linhas vivas, manutenção elétrica, ferramentas energizadas.",
    icone: "Zap",
    controles: [
      {
        id: "pet_ppt",
        texto: "Foi realizada a PET/PPT para esta atividade?",
        obrigatorio: true,
      },
      {
        id: "bloqueio_eletrico",
        texto: "O procedimento de bloqueio foi seguido conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "epi_eletricidade",
        texto: "EPI específico para atividade com eletricidade em boas condições?",
        obrigatorio: true,
      },
      {
        id: "ferramentas_eletroportateis",
        texto: "As ferramentas eletroportáteis estão devidamente inspecionadas e em boas condições?",
        obrigatorio: true,
      },
      {
        id: "dr_testado",
        texto: "Para equipamentos elétricos portáteis existe DR e este foi testado?",
        obrigatorio: true,
      },
      {
        id: "ppt_alta_tensao",
        texto:
          "Para atividades em equipamentos energizados ou linha viva de alta tensão, existe a PPT aprovada?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "veiculos_moveis",
    nome: "Veículos e Equipamentos Móveis",
    descricao: "Operação de veículos, empilhadeiras, caminhões, equipamentos móveis.",
    icone: "Truck",
    controles: [
      {
        id: "inspecao_previa",
        texto: "Foi realizada inspeção prévia do veículo/equipamento antes do uso?",
        obrigatorio: true,
      },
      {
        id: "fadiga_medicacao",
        texto: "Você está bem descansado e livre dos efeitos da fadiga e/ou medicação?",
        obrigatorio: true,
      },
      {
        id: "calcos",
        texto: "Os calços disponíveis estão de acordo com o padrão da CBA?",
        obrigatorio: true,
      },
      {
        id: "cinto_seguranca",
        texto: "Durante a operação/deslocamento, o cinto de segurança está sendo utilizado?",
        obrigatorio: true,
      },
      {
        id: "limite_velocidade",
        texto: "Os limites de velocidade estão sendo cumpridos?",
        obrigatorio: true,
      },
      {
        id: "segregacao",
        texto: "Existe segregação de veículos e pedestres?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "cargas_suspensas",
    nome: "Cargas Suspensas",
    descricao: "Içamento com guindaste, guindauto, ponte rolante, movimentação de cargas.",
    icone: "Package",
    controles: [
      {
        id: "linha_de_fogo",
        texto: "As pessoas estão fora da linha de fogo da carga?",
        obrigatorio: true,
      },
      {
        id: "isolamento_360",
        texto:
          "O isolamento para a atividade tem cobertura de 360 graus para evitar acesso não intencional de pessoas?",
        obrigatorio: true,
      },
      {
        id: "dispositivos_icamento",
        texto: "Os equipamentos e dispositivos de içamento estão inspecionados e em boas condições de uso?",
        obrigatorio: true,
      },
      {
        id: "guindaste_solo",
        texto: "O guindaste/guindauto está operando em solo com condição estável?",
        obrigatorio: true,
      },
      {
        id: "plano_carga_rigging",
        texto: "Foi realizado um plano de carga/rigging para a atividade de içamento?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "metais_fundidos",
    nome: "Metais Fundidos",
    descricao: "Operação de fornos, drenagem, escumação, contato com metal líquido.",
    icone: "Flame",
    controles: [
      {
        id: "veiculo_cabinado",
        texto: "Veículo totalmente cabinado para atividades nos fornos?",
        obrigatorio: true,
      },
      {
        id: "zona_restrita",
        texto: "Zona de acesso restrito durante as atividades: drenar, escumar, raspar, carregar fornos?",
        obrigatorio: true,
      },
      {
        id: "pre_aquecimento",
        texto: "Pré-aquecimento das ferramentas antes de entrar em contato com metal?",
        obrigatorio: true,
      },
      {
        id: "fornos_isentos",
        texto: "(SF) Os fornos estão isentos de fogo no topo e não há camisa avermelhada?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "escavacao",
    nome: "Escavação",
    descricao: "Abertura de valas, cavas, poços, trincheiras, movimentação de terra.",
    icone: "Shovel",
    controles: [
      {
        id: "protecao_desmoronamento",
        texto: "A proteção contra desmoronamentos foi implementada?",
        obrigatorio: true,
      },
      {
        id: "controle_acesso_escavacao",
        texto: "Existe controle de acesso para as áreas de escavação?",
        obrigatorio: true,
      },
      {
        id: "planejamento_resgate",
        texto: "Existe um planejamento de resgate?",
        obrigatorio: true,
      },
      {
        id: "permissao_trabalho",
        texto: "A permissão de trabalho foi preenchida e validada?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "protecao_maquinas",
    nome: "Proteção de Máquinas",
    descricao: "Operação, limpeza ou manutenção de máquinas com partes móveis.",
    icone: "Cog",
    controles: [
      {
        id: "bloqueio_maquinas",
        texto: "O procedimento de bloqueio foi seguido conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "botoeiras_emergencia",
        texto: "Você sabe onde ficam as botoeiras de emergência?",
        obrigatorio: true,
      },
      {
        id: "barreiras_fisicas",
        texto: "Existem barreiras físicas e enclausuramento de partes móveis?",
        obrigatorio: true,
      },
      {
        id: "sensores_funcionando",
        texto: "Os sensores dos equipamentos estão funcionando corretamente?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "energia_inesperada",
    nome: "Liberação Inesperada de Energia",
    descricao: "Sistemas pressurizados, molas, contrapesos, fluidos sob pressão.",
    icone: "Gauge",
    controles: [
      {
        id: "bloqueio_energia",
        texto: "O procedimento de bloqueio foi seguido conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "alta_pressao_inspecao",
        texto: "Os equipamentos de alta pressão foram inspecionados antes do uso?",
        obrigatorio: true,
      },
      {
        id: "valvula_alivio",
        texto: "Os equipamentos de alta pressão possuem válvula de alívio em boas condições?",
        obrigatorio: true,
      },
      {
        id: "manometros_limites",
        texto: "Os manômetros mostram claramente os limites de operação?",
        obrigatorio: true,
      },
      {
        id: "anti_chicoteamento",
        texto: "Existem dispositivos de proteção anti-chicoteamento nas mangueiras?",
        obrigatorio: true,
      },
      {
        id: "estouro_temperatura",
        texto: "Para risco de estouro de pneus, a temperatura está dentro da margem de segurança?",
        obrigatorio: true,
      },
      {
        id: "estouro_barreiras",
        texto: "Para risco de estouro de pneus, existem barreiras de segurança antes de encher os pneus?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "quimicos",
    nome: "Substâncias Químicas Perigosas",
    descricao: "Manuseio, transporte, armazenamento de produtos químicos perigosos.",
    icone: "FlaskConical",
    controles: [
      {
        id: "epi_quimicos",
        texto: "EPIs específicos para atividades com produtos químicos estão sendo utilizados?",
        obrigatorio: true,
      },
      {
        id: "bloqueio_quimico",
        texto: "Foi realizado o processo de Bloqueio, Teste e Verificação do Sistema/Equipamento?",
        obrigatorio: true,
      },
      {
        id: "fds_acesso",
        texto: "Os produtos químicos estão identificados e você tem acesso à FDS do produto?",
        obrigatorio: true,
      },
      {
        id: "emergencia_quimica",
        texto: "Você sabe o que fazer em caso de emergência com o produto químico que está usando?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "queda_altura",
    nome: "Queda de Altura",
    descricao: "Trabalho acima de 2m, andaimes, plataformas, escadas, telhados.",
    icone: "TrendingUp",
    controles: [
      {
        id: "barreira_quedas",
        texto: "Existem barreiras físicas de prevenção de quedas (guarda-corpo, limitador de acesso)?",
        obrigatorio: true,
      },
      {
        id: "epi_altura",
        texto: "Os EPIs de trabalho em altura foram inspecionados e estão em boas condições?",
        obrigatorio: true,
      },
      {
        id: "cinto_ancoragem",
        texto: "100% do tempo com o cinto de segurança fixado em ponto de ancoragem adequado?",
        obrigatorio: true,
      },
      {
        id: "ppt_altura",
        texto: "Foi realizada a PPT para esta atividade?",
        obrigatorio: true,
      },
      {
        id: "andaime_liberado",
        texto: "O andaime está liberado para uso?",
        obrigatorio: true,
      },
      {
        id: "equipamentos_altura",
        texto: "Os equipamentos de trabalho em altura foram previamente inspecionados?",
        obrigatorio: true,
      },
    ],
  },
];

// =============================================================================
// Helpers
// =============================================================================

const RISK_MAP = new Map<string, RiskCategory>(
  RISK_CATEGORIES.map((r) => [r.id, r])
);

export function getRiskById(id: string): RiskCategory | undefined {
  return RISK_MAP.get(id);
}

export const TOTAL_RISKS = RISK_CATEGORIES.length;
export const TOTAL_CONTROLES = RISK_CATEGORIES.reduce(
  (acc, r) => acc + r.controles.length,
  0
);