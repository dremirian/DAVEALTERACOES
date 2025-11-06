import { Database, Activity, Link, FileText, Brain, Download } from 'lucide-react';
import { DaveAssistant } from './components/DaveAssistant';
import DAVELOGO from './img/DAVELOGO.png';
import { ClipboardList } from 'lucide-react';
import { Gauge } from 'lucide-react';

function App() {
  const handleDownloadHealthCheck = async () => {
    const docId = '1HyvcwozYYHXS7-dN2meL-0X0vB9P2_Dm';
   const url = https://docs.google.com/document/d/${docId}/export?format=docx;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'Health_Check_SQL_Server.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      const docUrl = https://docs.google.com/document/d/${docId}/edit?usp=drive_link;
      window.open(docUrl, '_blank');
    }
  };

  const tools = [
    {
      icon: ClipboardList,
      title: 'Estimador de Migração SQL Server',
      description: 'Planeje e estime projetos de migração com base em discos, instâncias e bancos de dados.',
      link: 'https://relatoriomigracao.vercel.app/',
      color: 'from-blue-500 to-blue-600',
      isExternal: true,
      isLocked: false
    },
    {
      icon: Activity,
      title: 'Analisador de Performance SQL Server',
      description: 'Compare estatísticas antes e depois da otimização de queries. Ideal para validar melhorias em tempo de execução e I/O.',
      link: 'https://analise-query.vercel.app/',
      color: 'from-green-500 to-green-600',
      isExternal: true,
      isLocked: false
    },
    {
      icon: Database,
      title: 'Conversor de scripts SQL Server → PostgreSQL',
      description: 'Converta automaticamente seus scripts de SQL Server para PostgreSQL com inteligência e precisão.',
      link: '#',
      color: 'from-purple-500 to-purple-600',
      isExternal: false,
      isLocked: true
    },
    {
      icon: Gauge,
      title: 'Assistente de tuning automático',
      description: 'Analise e otimize automaticamente suas queries com sugestões inteligentes de melhoria de performance.',
      link: '#',
      color: 'from-red-500 to-red-600',
      isExternal: false,
      isLocked: true
    },
    {
      icon: FileText,
      title: 'Health Check SQL Server',
      description: 'Modelo em Word para documentar fases de implantação, escopo técnico, cronograma e riscos.',
      link: null,
      color: 'from-orange-500 to-orange-600',
      isDownload: true,
      isLocked: false,
      onDownload: handleDownloadHealthCheck
    },
    {
      icon: FileText,
      title: 'Health Check PostgreSQL',
      description: 'Modelo em Word para documentar fases de implantação, escopo técnico, cronograma e riscos.',
      link: null,
      color: 'from-yellow-500 to-yellow-600',
      isDownload: true,
      isLocked: false,
      onDownload: handleDownloadHealthCheck
    }
  ];

  const comingSoon = [
    'Conversor de scripts SQL Server → PostgreSQL',
    'Gerador de scripts de criação de tabelas',
    'Monitor de queries em tempo real',
    'Central de logs e auditoria',
    'Assistente de tuning automático'
  ];

  return (
    <>
      <DaveAssistant />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <img src={DAVELOGO} alt="Logo DAVE" className="w-48 h-52"/>
            </div>          
            <p className="text-2xl text-cyan-400 mb-4 tracking-wide font-light">
              <span className="text-white font-bold text-3xl animate-pulse">D</span><span className="ml-1">atabase </span>
              <span className="text-white font-bold text-3xl animate-pulse">A</span><span className="ml-1">ssistant </span>
              <span className="text-white font-bold text-3xl animate-pulse">V</span><span className="ml-1">irtual </span>
              <span className="text-white font-bold text-3xl animate-pulse">E</span><span className="ml-1">ngine</span>
            </p>

            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Administre melhor, analise mais, evolua sempre.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Database className="w-8 h-8 mr-3 text-cyan-400" />
              Ferramentas Disponíveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                const Component = tool.isLocked ? 'div' : (tool.isDownload ? 'button' : 'a');
                const props = tool.isLocked
                  ? {}
                  : tool.isDownload
                  ? {
                      onClick: tool.onDownload,
                      type: 'button'
                    }
                  : {
                      href: tool.link,
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    };

                return (
                  <Component
                    key={index}
                    {...props}
                    className={`group relative bg-slate-800 rounded-xl p-6 border border-slate-700 overflow-hidden
                      ${tool.isLocked 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:transform hover:scale-105 transition-all duration-300 hover:border-cyan-400 cursor-pointer'
                      }`}
                  >
                    <div className={absolute inset-0 bg-gradient-to-br ${tool.color} ${tool.isLocked ? 'opacity-5' : 'opacity-0 group-hover:opacity-10'} transition-opacity duration-300} />
                    <div className="relative z-10 text-left">
                      <div className={inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.color} mb-4 ${tool.isLocked ? 'opacity-60' : ''}}>
                        <Icon className="w-6 h-6 text-white block shrink-0 align-middle leading-none" />
                      </div>
                      <h3 className={text-xl font-bold text-white mb-3 ${tool.isLocked ? '' : 'group-hover:text-cyan-400'} transition-colors}>
                        {tool.title}
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {tool.description}
                      </p>
                      {tool.isLocked ? (
                        <div className="flex items-center text-gray-500 text-sm font-semibold">
                          <span className="w-4 h-4 mr-2">🔒</span>
                          Em desenvolvimento
                        </div>
                      ) : (
                        <div className="flex items-center text-cyan-400 text-sm font-semibold">
                          {tool.isDownload ? (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Baixar modelo
                            </>
                          ) : (
                            <>
                              <Link className="w-4 h-4 mr-2" />
                              Abrir ferramenta
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </Component>
                );
              })}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Activity className="w-8 h-8 mr-3 text-cyan-400" />
              Em Breve no DAVE
            </h2>
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comingSoon.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Sobre o DAVE</h2>
              <p className="text-gray-300 leading-relaxed">
                DAVE foi criado por <span className="text-cyan-400 font-semibold">Andressa Mirian</span> como uma plataforma modular e extensível
                para facilitar o dia a dia de quem trabalha com dados. Cada ferramenta foi pensada para resolver problemas reais
                com praticidade e inteligência. Novas funcionalidades serão adicionadas conforme a evolução dos projetos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;