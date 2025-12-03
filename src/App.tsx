import { Database, Activity, Link, FileText, Download, ClipboardList, Gauge, RefreshCcw, Heart, Phone } from 'lucide-react';
import { DaveAssistant } from './components/DaveAssistant';
import DAVELOGO from './img/DAVELOGO.png';

// Função genérica para download de documentos
const handleDownload = async (docId: string, fileName: string) => {
  const url = `https://docs.google.com/document/d/${docId}/export?format=docx`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Download failed');

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  } catch {
    window.open(`https://docs.google.com/document/d/${docId}/edit?usp=drive_link`, '_blank');
  }
};

function App() {
  const tools = [
    {
      icon: ClipboardList,
      title: 'MigraTimer',
      description: 'Estimador de Migração SQL Server: Planeje e estime projetos de migração com base em discos, instâncias e bancos de dados.',
      link: 'https://relatoriomigracao.vercel.app/',
      color: 'from-pink-500 to-pink-600',
      isExternal: true
    },
    {
      icon: Activity,
      title: 'DBABoost',
      description: 'Analisador de Performance SQL Server: Compare estatísticas antes e depois da otimização de queries.',
      link: 'https://dba-boost.vercel.app/',
      color: 'from-green-500 to-green-600',
      isExternal: true
    },
    {
      icon: RefreshCcw,
      title: 'TurnoLink',
      description: 'Repasse de Ticket: Gestão e visibilidade de tickets entre turnos na operação 24x7.',
      link: 'https://turnolink.vercel.app/',
      color: 'from-blue-500 to-blue-600',
      isExternal: true
    },
    {
      icon: FileText,
      title: 'DBHealth360 SQL Server',
      description: 'Modelo em Word para documentar a visão completa da saúde do banco.',
      color: 'from-orange-500 to-orange-600',
      isDownload: true,
      onDownload: () => handleDownload('1HyvcwozYYHXS7-dN2meL-0X0vB9P2_Dm', 'Health_Check_SQL_Server.docx')
    },
    {
      icon: FileText,
      title: 'DBHealth360 PostgreSQL',
      description: 'Modelo em Word para documentar a visão completa da saúde do banco.',
      color: 'from-yellow-500 to-yellow-600',
      isDownload: true,
      onDownload: () => handleDownload('1Xs18pGBtb9qCeiZnI3uFlrAhdX_MQ4i7', 'Health_Check_PostgreSQL.docx')
    },
    {
      icon: Heart,
      title: 'Pulse',
      description: 'Batimento da operação, mostrando quem está ativo ou ausente.',
      link: 'https://pulsedba.vercel.app/',
      color: 'from-red-500 to-red-600',
      isExternal: true
    },
    {
      icon: Database,
      title: 'Conversor de scripts SQL Server → PostgreSQL',
      description: 'Ferramenta em desenvolvimento.',
      link: 'EM BREVE',
      color: 'from-purple-500 to-purple-600',
      isExternal: true
    },
   {
      icon: Phone,
      title: 'CoreBridge',
      description: 'Ferramenta em desenvolvimento.',
      link: 'EM BREVE',
      color: 'from-purple-500 to-purple-600',
      isExternal: true
    },
    {
      icon: Gauge,
      title: 'Assistente de tuning automático',
      description: 'Ferramenta em desenvolvimento.',
      link: 'EM BREVE',
      color: 'from-brown-500 to-brown-600',
      isExternal: true
    }
  ];

  return (
    <>
      <DaveAssistant />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <img src={DAVELOGO} alt="Logo DAVE" className="w-40 h-44" />
            </div>
            <p className="text-xl text-cyan-400 mb-2 tracking-wide font-light">
              <span className="text-white font-bold text-2xl animate-pulse">D</span>atabase 
              <span className="text-white font-bold text-2xl animate-pulse"> A</span>ssistant 
              <span className="text-white font-bold text-2xl animate-pulse"> V</span>irtual 
              <span className="text-white font-bold text-2xl animate-pulse"> E</span>ngine
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto text-base">
              Administre melhor, analise mais, evolua sempre.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Database className="w-6 h-6 mr-2 text-cyan-400" />
              Ferramentas Disponíveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                const Component = tool.isDownload ? 'button' : 'a';
                const isComingSoon = tool.link === 'EM BREVE';
                const props = tool.isDownload
                  ? { onClick: tool.onDownload, type: 'button' }
                  : { href: !isComingSoon ? tool.link : undefined, target: '_blank', rel: 'noopener noreferrer' };

                return (
                  <Component
                    key={index}
                    {...props}
                    className={`group relative bg-slate-800 rounded-lg p-4 transition-all duration-300 border border-slate-700 overflow-hidden ${
                      isComingSoon
                        ? 'opacity-40 pointer-events-none cursor-default'
                        : 'hover:transform hover:scale-105 hover:border-cyan-400 cursor-pointer'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative z-10 text-left">
                      <div className={`inline-flex p-2 rounded-md bg-gradient-to-br ${tool.color} mb-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-gray-300 mb-2 text-xs leading-snug">{tool.description}</p>
                      <div className="flex items-center text-cyan-400 text-xs font-medium">
                        {tool.isDownload && !isComingSoon ? (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            Baixar modelo
                          </>
                        ) : isComingSoon ? (
                          <span className="text-[10px] bg-purple-700 text-white px-2 py-0.5 rounded">EM BREVE</span>
                        ) : (
                          <>
                            <Link className="w-3 h-3 mr-1" />
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
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-3">Sobre o DAVE</h2>
              <p className="text-gray-300 text-sm leading-snug">
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
