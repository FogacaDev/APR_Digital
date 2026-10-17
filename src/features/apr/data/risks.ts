export interface ControleCritico {
  id: string;
  texto: string;
  obrigatorio: boolean;
  ajuda?: string;
}

export interface RiskCategory {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  controles: ControleCritico[];
}

export const RISK_CATEGORIES: RiskCategory[] = [
  {
    id: "afogamento",
    nome: "Afogamento",
    descricao: "Trabalho proximo ou sobre agua, diques, piscinas, rios.",
    icone: "Waves",
    controles: [
      {
        id: "flutuacao",
        texto: "Os dispositivos de flutuacao estao disponiveis e em boas condicoes?",
        obrigatorio: true,
      },
      {
        id: "protecao_queda_agua",
        texto: "Os equipamentos de protecao ou barreiras contra queda estao sendo utilizados?",
        obrigatorio: true,
      },
      {
        id: "superficie_estavel",
        texto:
          "A superficie onde o equipamento movel esta operando e estavel e oferece um bom suporte para evitar escorregamentos, atolamento e deslizamentos?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "espaco_confinado",
    nome: "Espaco Confinado",
    descricao: "Tanques, silos, tubulacoes, poroes, galerias e espacos com ventilacao limitada.",
    icone: "Container",
    controles: [
      {
        id: "teste_atmosferico",
        texto: "Foi realizado teste atmosferico e monitoramento continuo?",
        obrigatorio: true,
      },
      {
        id: "bloqueio_de_energias_ec",
        texto: "O bloqueio de energias foi executado conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "exaustao_ventilacao",
        texto: "Existe exaustao/ventilacao de acordo com a avaliacao da tarefa?",
        obrigatorio: true,
      },
      {
        id: "sucata_porao",
        texto: "(SF) O porao esta isento de sucata?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "eletricidade",
    nome: "Contato com Eletricidade",
    descricao: "Trabalho em paineis, linhas vivas, manutencao eletrica, ferramentas energizadas.",
    icone: "Zap",
    controles: [
      {
        id: "pet_ppt",
        texto: "Foi realizada a PET/PPT para esta atividade?",
        obrigatorio: true,
      },
      {
        id: "procedimento_bloqueio_eletrico",
        texto: "O procedimento de bloqueio foi seguido conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "epi_eletricidade",
        texto: "EPI especifico para atividade com eletricidade em boas condicoes?",
        obrigatorio: true,
      },
      {
        id: "ferramentas_eletroportateis",
        texto: "As ferramentas eletroportateis estao devidamente inspecionadas e em boas condicoes?",
        obrigatorio: true,
      },
      {
        id: "dr_testado",
        texto: "Para equipamentos eletricos portateis existe DR e este foi testado?",
        obrigatorio: true,
      },
      {
        id: "ppt_alta_tensao",
        texto:
          "Para atividades em equipamentos energizados ou linha viva de alta tensao, existe a PPT aprovada?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "veiculos_moveis",
    nome: "Veiculos e equipamentos Moveis",
    descricao: "Operacao de veiculos, empilhadeiras, caminhoes e equipamentos moveis.",
    icone: "Truck",
    controles: [
      {
        id: "inspecao_previa",
        texto: "Foi realizada inspecao previa do veiculo/equipamento antes do uso?",
        obrigatorio: true,
      },
      {
        id: "fadiga_medicacao",
        texto: "Voce esta bem descansado e livre dos efeitos da fadiga e/ou medicacao?",
        obrigatorio: true,
      },
      {
        id: "calcos",
        texto: "Os calcos disponiveis estao de acordo com o padrao da CBA?",
        obrigatorio: true,
      },
      {
        id: "cinto_seguranca",
        texto: "Durante a operacao/deslocamento, o cinto de seguranca esta sendo utilizado?",
        obrigatorio: true,
      },
      {
        id: "limite_velocidade",
        texto: "Os limites de velocidade estao sendo cumpridos?",
        obrigatorio: true,
      },
      {
        id: "segregacao",
        texto: "Existe segregacao de veiculos e pedestres?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "cargas_suspensas",
    nome: "Cargas Suspensas",
    descricao: "Icamento com guindaste, guindauto, ponte rolante e movimentacao de cargas.",
    icone: "Package",
    controles: [
      {
        id: "linha_de_fogo",
        texto: "As pessoas estao fora da linha de fogo da carga?",
        obrigatorio: true,
      },
      {
        id: "isolamento_360",
        texto:
          "O isolamento para a atividade tem uma cobertura de 360 graus para evitar acesso nao intencional de pessoas?",
        obrigatorio: true,
      },
      {
        id: "dispositivos_de_icamento",
        texto:
          "Os equipamentos e dispositivos de icamento estao inspecionados e em boas condicoes de uso?",
        obrigatorio: true,
      },
      {
        id: "guindaste_guindauto",
        texto: "O guindaste/guindauto esta operando em solo com condicao estavel?",
        obrigatorio: true,
      },
      {
        id: "carga_rigging",
        texto: "Foi realizado um plano de carga/rigging para a atividade de icamento?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "metais_fundidos",
    nome: "Metais Fundidos",
    descricao: "Operacao de fornos, drenagem, escumacao e contato com metal liquido.",
    icone: "Flame",
    controles: [
      {
        id: "veiculo_cabinado",
        texto: "Veiculo totalmente cabinado para atividades nos fornos?",
        obrigatorio: true,
      },
      {
        id: "zona_acesso_restrito",
        texto:
          "Zona de acesso restrito durante as atividades: drenar, escumar, raspar, carregamento de fornos?",
        obrigatorio: true,
      },
      {
        id: "pre_aquecimento",
        texto: "Pre aquecimento das ferramentas antes de entrar em contato com metal?",
        obrigatorio: true,
      },
      {
        id: "fornos_isentos_fogo",
        texto: "(SF) Os fornos estao isentos de fogo no topo e nao ha camisa avermelhada?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "escavacao",
    nome: "Escavacao",
    descricao: "Abertura de valas, cavas, pocos, trincheiras e movimentacao de terra.",
    icone: "Shovel",
    controles: [
      {
        id: "protecao_desmoronamento",
        texto: "A protecao contra desmoronamentos foi implementada?",
        obrigatorio: true,
      },
      {
        id: "controle_acesso_escavacao",
        texto: "Existe controle de acesso para as areas de escavacao?",
        obrigatorio: true,
      },
      {
        id: "planejamento_resgate",
        texto: "Existe um planejamento de resgate?",
        obrigatorio: true,
      },
      {
        id: "permissao_trabalho",
        texto: "A permissao de trabalho foi preenchida e validada?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "protecao_maquinas",
    nome: "Protecao de Maquinas",
    descricao: "Operacao, limpeza ou manutencao de maquinas com partes moveis.",
    icone: "Cog",
    controles: [
      {
        id: "procedimento_bloqueio_maquinas",
        texto: "O procedimento de bloqueio foi seguido conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "botoeiras_emergencia",
        texto: "Voce sabe onde ficam as botoeiras de emergencia?",
        obrigatorio: true,
      },
      {
        id: "barreiras_fisicas",
        texto: "Existem barreiras fisicas e enclausuramento de partes moveis?",
        obrigatorio: true,
      },
      {
        id: "sensores_equipamentos",
        texto: "Os sensores dos equipamentos estao funcionando corretamente?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "energia_inesperada",
    nome: "Liberacao Inesperada de Energia",
    descricao: "Sistemas pressurizados, molas, contrapesos e fluidos sob pressao.",
    icone: "Gauge",
    controles: [
      {
        id: "procedimento_bloqueio_energia",
        texto: "O procedimento de bloqueio foi seguido conforme matriz?",
        obrigatorio: true,
      },
      {
        id: "equipamentos_alta_pressao",
        texto: "Os equipamentos de alta pressao foram inspecionados antes do uso?",
        obrigatorio: true,
      },
      {
        id: "equipamentos_valvula_alivio",
        texto:
          "Os equipamentos de alta pressao possuem valvula de alivio e estas estao em boas condicoes?",
        obrigatorio: true,
      },
      {
        id: "manometros_limites",
        texto: "Os manometros mostram claramente os limites de operacao?",
        obrigatorio: true,
      },
      {
        id: "dispositivos_protecao",
        texto: "Existem dispositivos de protecao anti-chicoteamento nas mangueiras?",
        obrigatorio: true,
      },
      {
        id: "risco_estouro_temperatura",
        texto:
          "Para risco de estouro de pneus, foi verificado se a temperatura esta dentro da margem de seguranca?",
        obrigatorio: true,
      },
      {
        id: "risco_estouro_barreiras",
        texto:
          "Para risco de estouro de pneus, existem barreiras de seguranca aprovada antes de encher os pneus?",
        obrigatorio: true,
      },
    ],
  },
  {
    id: "quimicos",
    nome: "Substancias Quimicas Perigosas",
    descricao: "Manuseio, transporte e armazenamento de produtos quimicos perigosos.",
    icone: "FlaskConical",
    controles: [
      {
        id: "epis_produtos_quimicos",
        texto: "EPIs especificos para atividades com produtos quimicos estao sendo utilizados?",
        obrigatorio: true,
      },
      {
        id: "bloqueio_teste_verificacao",
        texto: "Foi realizado o processo de Bloqueio, Teste e Verificacao do Sistema/Equipamento?",
        obrigatorio: true,
      },
      {
        id: "produtos_quimicos_identificados",
        texto: "Os produtos quimicos estao identificados e voce tem acesso a FDS do produto?",
        obrigatorio: true,
      },
      {
        id: "emergencia_produto_quimico",
        texto:
          "Voce sabe o que fazer em caso de emergencia com o produto quimico que esta usando?",
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
        id: "barreira_preventiva_quedas",
        texto:
          "Existem barreira fisica de prevencao de quedas (Ex: Guarda-corpo e limitador de acesso)?",
        obrigatorio: true,
      },
      {
        id: "epis_trabalho_altura",
        texto:
          "Os EPIs de trabalho em altura foram previamente inspecionados e estao em boas condicoes de uso?",
        obrigatorio: true,
      },
      {
        id: "cinto_ancoragem",
        texto:
          "100% do tempo com o cinto de seguranca fixado em ponto de ancoragem adequado?",
        obrigatorio: true,
      },
      {
        id: "ppt_realizada",
        texto: "Foi realizada a PPT para esta atividade?",
        obrigatorio: true,
      },
      {
        id: "andaime_liberado",
        texto: "O andaime esta liberado para uso?",
        obrigatorio: true,
      },
      {
        id: "equipamentos_trabalho_altura",
        texto:
          "Os equipamentos de trabalho em altura (plataformas, escadas, etc.) foram previsamente inspecionados e estao em boas condicoes de uso?",
        obrigatorio: true,
      },
    ],
  },
];

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
