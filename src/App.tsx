import { Database, Activity, Link, FileText, Download } from 'lucide-react';
import { DaveAssistant } from './components/DaveAssistant';
import DAVELOGO from './img/DAVELOGO.png';
import { ClipboardList, Gauge } from 'lucide-react';

function App() {
  const handleDownloadHealthCheck = async () => {
    const docId = '1HyvcwozYYHXS7-dN2meL-0X0vB9P2_Dm';
    const url = `https://docs.google.com/document/d/${docId}/export?format=docx`;

    try {
      const response = await fetch(url);
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
    } catch {
      window.open(`https://docs.google.com/document/d/${docId}/edit?usp=drive_link`, '_blank');
    }
  };

  const tools = [
    {
      icon: ClipboardList,
      title: 'Estimador de Migração SQL Server',
      description: 'Planeje e estime projetos de migração com base em discos, instâncias e bancos de dados.',
      link: 'https://relatoriomigracao.vercel.app/',
      color: 'from-blue-500 to-blue-600',
      isExternal: true
    },
    {
      icon: Activity,
      title: 'Analisador de Performance SQL Server',
      description: 'Compare estatísticas antes e depois da otimização de queries. Ideal para validar melhorias em tempo de execução e I/O.',
      link: 'https://dba-boost.vercel.app/',
      color: 'from-green-500 to-green-600',
      isExternal: true
    },
    {
      icon: Database,
      title: 'Conversor de scripts SQL Server → PostgreSQL',
      description: 'Planeje e estime projetos de migração com base em discos, instâncias e bancos de dados.',
      link: 'EM BREVE',
      color: 'from-purple-500 to-purple-600',
      isExternal: true
    },
    {
      icon: Gauge,
      title: 'Assistente de tuning automático',
      description: 'Planeje e estime projetos de migração com base em discos, instâncias e bancos de dados.',
      link: 'EM BREVE',
      color: 'from-red-500 to-red-600',
      isExternal: true
    },
     {
      icon: RefreshCcw,
      title: 'TurnoLink',
      description: 'Plataforma inteligente para gestão e visibilidade de tickets, garantindo repasse eficiente entre turnos na operação 24x7.',
      link: 'https://turnolink.vercel.app/',
      color: 'from-blue-500 to-blue-600',
      isExternal: true
    },
    {
      icon: FileText,
      title: 'Health Check SQL Server',
      description: 'Modelo em Word para documentar fases de implantação, escopo técnico, cronograma e riscos.',
      link: null,
      color: 'from-orange-500 to-orange-600',
      isDownload: true,
      onDownload: handleDownloadHealthCheck
    },
    {
      icon: FileText,
      title: 'Health Check PostgreSQL',
      description: 'Modelo em Word para documentar fases de implantação, escopo técnico, cronograma e riscos.',
      link: 'EM BREVE',
      color: 'from-yellow-500 to-yellow-600',
      isDownload: true,
      onDownload: null
    }
  ];

  return (
    <>
      <DaveAssistant />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <img src={DAVELOGO} alt="Logo DAVE" className="w-48 h-52" />
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
                const Component = tool.isDownload ? 'button' : 'a';
                const isComingSoon = tool.link === 'EM BREVE';
                const props = tool.isDownload
                  ? {
                      onClick: tool.onDownload,
                      type: 'button'
                    }
                  : {
                      href: !isComingSoon ? tool.link : undefined,
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    };

                return (
                  <Component
                    key={index}
                    {...props}
                    className={`group relative bg-slate-800 rounded-xl p-6 transition-all duration-300 border border-slate-700 overflow-hidden ${
                      isComingSoon
                        ? 'opacity-40 pointer-events-none cursor-default'
                        : 'hover:transform hover:scale-105 hover:border-cyan-400 cursor-pointer'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative z-10 text-left">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.color} mb-4`}>
                        <Icon className="w-6 h-6 text-white block shrink-0 align-middle leading-none" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-cyan-400 text-sm font-semibold">
                        {tool.isDownload && !isComingSoon ? (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Baixar modelo
                          </>
                        ) : isComingSoon ? (
                          <span className="text-xs bg-purple-700 text-white px-2 py-1 rounded">
                            EM BREVE
                          </span>
                        ) : (
                          <>
                            <Link className="w-4 h-4 mr-2" />
                            Abrir ferramenta
                          </>
                        )}
                      </div>
                    </div>
                  </Component>
                );
              })}
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
