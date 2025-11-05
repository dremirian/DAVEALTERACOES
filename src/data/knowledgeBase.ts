export interface KnowledgeEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedLinks?: { title: string; url: string; isExternal?: boolean }[];
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: '1',
    category: 'geral',
    question: 'O que é o DAVE?',
    answer: 'DAVE significa Database Assistant Virtual Engine. Sou um assistente virtual criado para ajudar você com dúvidas sobre administração de bancos de dados, análise de performance, migrações e uso das ferramentas disponíveis nesta plataforma.',
    keywords: ['dave', 'assistente', 'o que é', 'sobre', 'plataforma'],
  },
  {
    id: '2',
    category: 'geral',
    question: 'Quais ferramentas estão disponíveis?',
    answer: 'No momento, temos três ferramentas principais:\n\n1. **Estimador de Migração SQL Server** - Para planejar projetos de migração\n2. **Analisador de Performance SQL Server** - Para comparar estatísticas de queries\n3. **Modelo de Health Check SQL Server** - Documento para documentar implantações\n\nEm breve teremos mais ferramentas, incluindo conversores de scripts, geradores de tabelas e monitores em tempo real.',
    keywords: ['ferramentas', 'disponíveis', 'lista', 'tools', 'recursos'],
    relatedLinks: [
      { title: 'Estimador de Migração', url: 'https://relatoriomigracao.vercel.app/', isExternal: true },
      { title: 'Analisador de Performance', url: 'https://analise-query.vercel.app/', isExternal: true }
    ]
  },
  {
    id: '3',
    category: 'migracao',
    question: 'Como usar o Estimador de Migração?',
    answer: 'O Estimador de Migração SQL Server ajuda você a planejar projetos de migração. Para usar:\n\n1. Acesse a ferramenta clicando no card correspondente\n2. Informe o número de discos, instâncias e bancos de dados\n3. O sistema calculará automaticamente estimativas de tempo e recursos\n4. Você pode exportar o relatório gerado\n\nÉ ideal para apresentar propostas e dimensionar projetos.',
    keywords: ['migração', 'estimador', 'migration', 'como usar', 'planejamento'],
    relatedLinks: [
      { title: 'Abrir Estimador', url: 'https://relatoriomigracao.vercel.app/', isExternal: true }
    ]
  },
  {
    id: '4',
    category: 'performance',
    question: 'Como analisar performance de queries?',
    answer: 'O Analisador de Performance permite comparar estatísticas antes e depois de otimizações:\n\n1. Acesse o Analisador de Performance\n2. Insira as estatísticas ANTES da otimização (tempo de execução, leituras lógicas, etc.)\n3. Insira as estatísticas DEPOIS da otimização\n4. O sistema calculará automaticamente as melhorias percentuais\n5. Você pode visualizar gráficos comparativos e exportar o relatório\n\nÉ perfeito para validar melhorias e apresentar resultados para stakeholders.',
    keywords: ['performance', 'query', 'otimização', 'análise', 'estatísticas', 'io'],
    relatedLinks: [
      { title: 'Abrir Analisador', url: 'https://analise-query.vercel.app/', isExternal: true }
    ]
  },
  {
    id: '5',
    category: 'sql-server',
    question: 'O que é um Health Check SQL Server?',
    answer: 'O Health Check é uma avaliação completa do ambiente SQL Server que inclui:\n\n- Análise de configurações e recursos\n- Identificação de gargalos de performance\n- Verificação de segurança e compliance\n- Recomendações de melhorias\n- Documentação de riscos e oportunidades\n\nO modelo disponível na plataforma ajuda você a estruturar e documentar todas as fases desse processo.',
    keywords: ['health check', 'diagnóstico', 'avaliação', 'análise', 'sql server'],
  },
  {
    id: '6',
    category: 'sql-server',
    question: 'Como fazer download do modelo de Health Check?',
    answer: 'Para baixar o modelo:\n\n1. Na página inicial, localize o card "Modelo de Health Check SQL Server"\n2. Clique no botão "Baixar modelo"\n3. O documento será baixado automaticamente em formato Word (.docx)\n4. Se houver problemas no download, o sistema abrirá o Google Docs automaticamente\n\nO modelo inclui seções para escopo técnico, cronograma, riscos e recomendações.',
    keywords: ['download', 'modelo', 'health check', 'baixar', 'documento'],
  },
  {
    id: '7',
    category: 'postgresql',
    question: 'Vocês têm ferramentas para PostgreSQL?',
    answer: 'Atualmente, nossas ferramentas focam principalmente em SQL Server, mas estamos trabalhando em recursos para PostgreSQL, incluindo:\n\n- Conversor de scripts SQL Server → PostgreSQL\n- Analisador de performance PostgreSQL\n- Comparador de schemas\n- Gerador de migrations\n\nEssas ferramentas serão adicionadas em breve ao DAVE.',
    keywords: ['postgresql', 'postgres', 'pg', 'ferramentas', 'suporte'],
  },
  {
    id: '8',
    category: 'performance',
    question: 'Como interpretar estatísticas de I/O?',
    answer: 'Estatísticas de I/O do SQL Server mostram o impacto das operações de disco:\n\n**Leituras Lógicas**: Páginas lidas da memória (mais rápido)\n**Leituras Físicas**: Páginas lidas do disco (mais lento)\n**Tempo de CPU**: Processamento usado pela query\n**Tempo Decorrido**: Tempo total incluindo esperas\n\nIdeal é ter:\n- Poucas leituras físicas (dados em cache)\n- Leituras lógicas reduzidas (melhor plano de execução)\n- Tempo de CPU próximo ao tempo decorrido (sem esperas)',
    keywords: ['io', 'leituras', 'físicas', 'lógicas', 'estatísticas', 'set statistics io'],
  },
  {
    id: '9',
    category: 'migracao',
    question: 'Quanto tempo leva uma migração SQL Server?',
    answer: 'O tempo de migração depende de vários fatores:\n\n**Tamanho dos dados**: Pode variar de horas a dias\n**Complexidade**: Scripts, procedures, jobs, etc.\n**Downtime permitido**: Migração online vs offline\n**Recursos disponíveis**: Rede, storage, CPU\n\nUse o Estimador de Migração para calcular tempos específicos baseados em:\n- Número de instâncias\n- Quantidade de bancos de dados\n- Volume de dados total\n\nO estimador considera práticas recomendadas e médias de mercado.',
    keywords: ['tempo', 'duração', 'migração', 'quanto tempo', 'prazo'],
    relatedLinks: [
      { title: 'Calcular Estimativa', url: 'https://relatoriomigracao.vercel.app/', isExternal: true }
    ]
  },
  {
    id: '10',
    category: 'geral',
    question: 'Como entrar em contato ou reportar problemas?',
    answer: 'Para suporte, sugestões ou reportar problemas:\n\n- Esta plataforma foi criada por **Andressa Mirian**\n- Você pode usar o feedback nas respostas do DAVE para melhorar o assistente\n- Em breve teremos uma seção de contato direta\n\nSuas interações ajudam o DAVE a aprender e melhorar continuamente!',
    keywords: ['contato', 'suporte', 'ajuda', 'problemas', 'bug', 'reportar'],
  },
  {
    id: '11',
    category: 'sql-server',
    question: 'O que são índices e por que são importantes?',
    answer: 'Índices são estruturas que aceleram consultas no banco de dados, funcionando como um "índice de livro".\n\n**Tipos principais**:\n- **Clustered**: Define a ordem física dos dados (1 por tabela)\n- **Non-clustered**: Ponteiros para os dados (múltiplos permitidos)\n- **Columnstore**: Otimizado para analytics\n\n**Benefícios**:\n✓ Queries mais rápidas\n✓ Menos leituras de disco\n✓ Melhor uso de recursos\n\n**Cuidados**:\n✗ Ocupam espaço\n✗ Podem tornar INSERT/UPDATE mais lentos\n✗ Exigem manutenção periódica',
    keywords: ['índice', 'index', 'performance', 'otimização', 'clustered', 'non-clustered'],
  },
  {
    id: '12',
    category: 'geral',
    question: 'Quais ferramentas estão em desenvolvimento?',
    answer: 'Estamos trabalhando em várias ferramentas novas:\n\n🔄 **Conversor SQL Server → PostgreSQL**: Traduz scripts automaticamente\n📊 **Gerador de tabelas**: Cria DDL a partir de especificações\n⚡ **Monitor de queries em tempo real**: Acompanha execuções ativas\n📝 **Central de logs**: Auditoria e rastreamento de mudanças\n🎯 **Assistente de tuning**: Sugestões automáticas de otimização\n\nTodas serão integradas ao DAVE quando estiverem prontas!',
    keywords: ['futuro', 'em breve', 'desenvolvimento', 'novidades', 'roadmap'],
  }
];

export function searchKnowledge(query: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(' ').filter(w => w.length > 2);

  const scored = knowledgeBase.map(entry => {
    let score = 0;

    for (const word of words) {
      if (entry.question.toLowerCase().includes(word)) score += 10;
      if (entry.answer.toLowerCase().includes(word)) score += 5;
      if (entry.keywords.some(k => k.toLowerCase().includes(word))) score += 15;
      if (entry.category.toLowerCase().includes(word)) score += 8;
    }

    return { entry, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ entry }) => entry);
}

export function getRandomSuggestions(count: number = 3): string[] {
  const suggestions = [
    'O que é o DAVE?',
    'Quais ferramentas estão disponíveis?',
    'Como usar o Estimador de Migração?',
    'Como analisar performance de queries?',
    'O que são índices?',
    'Quanto tempo leva uma migração?',
    'Como fazer download do modelo de Health Check?',
    'Quais ferramentas estão em desenvolvimento?',
  ];

  const shuffled = [...suggestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
