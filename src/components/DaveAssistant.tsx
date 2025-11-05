import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, User, Sparkles, RotateCcw, ExternalLink } from 'lucide-react';
import { ConversationService } from '../services/conversationService';
import { Message } from '../types/conversation';
import { getRandomSuggestions } from '../data/knowledgeBase';
import DAVELOGO from '../img/DAVELOGO.png';

const conversationService = new ConversationService();

export function DaveAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const conversation = conversationService.getCurrentConversation();
    setConversationId(conversation.id);
    setMessages(conversation.messages);

    if (conversation.messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: '👋 Olá! Eu sou o DAVE, seu assistente virtual!\n\nEstou aqui para ajudar com dúvidas sobre administração de bancos de dados, análise de performance, migrações e as ferramentas disponíveis na plataforma.\n\nComo posso ajudar você hoje?',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }

    setSuggestions(getRandomSuggestions(3));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent || isTyping) return;

    const userMessage = conversationService.addMessage(conversationId, 'user', messageContent);
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      const response = await conversationService.getResponse(messageContent);

      let assistantContent = response.content;
      if (response.relatedLinks && response.relatedLinks.length > 0) {
        assistantContent += '\n\n**Links úteis:**';
        response.relatedLinks.forEach(link => {
          assistantContent += `\n• [${link.title}](${link.url})`;
        });
      }

      const assistantMessage = conversationService.addMessage(
        conversationId,
        'assistant',
        assistantContent,
        response.knowledgeBaseId
      );

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setSuggestions(getRandomSuggestions(3));
    }, 800 + Math.random() * 400);
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    conversationService.submitFeedback(messageId, helpful);
    setFeedbackGiven(prev => new Set(prev).add(messageId));
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleNewConversation = () => {
    const newConversation = conversationService.createConversation();
    setConversationId(newConversation.id);
    setMessages([]);
    setFeedbackGiven(new Set());

    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Olá! Eu sou o DAVE, seu assistente virtual!\n\nEstou aqui para ajudar com dúvidas sobre administração de bancos de dados, análise de performance, migrações e as ferramentas disponíveis na plataforma.\n\nComo posso ajudar você hoje?',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setSuggestions(getRandomSuggestions(3));
  };

  const formatMessageContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }

      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const [, text, url] = linkMatch;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
          >
            {text}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group"
          aria-label="Abrir DAVE Assistant"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Fale com o DAVE
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={DAVELOGO} alt="DAVE" className="w-8 h-8 object-contain" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-cyan-600" />
              </div>
              <div>
                <h3 className="font-bold text-white">DAVE</h3>
                <p className="text-xs text-cyan-100">Database Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewConversation}
                className="p-2 hover:bg-cyan-700 rounded-lg transition-colors"
                title="Nova conversa"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1">
                      <img src={DAVELOGO} alt="DAVE" className="w-full h-full object-contain" />
                    </div>
                  </div>
                )}

                <div className={`flex flex-col gap-2 max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl p-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white'
                      : 'bg-slate-800 text-gray-200 border border-slate-700'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {formatMessageContent(message.content)}
                    </p>
                  </div>

                  {message.role === 'assistant' && message.id !== 'welcome' && !feedbackGiven.has(message.id) && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFeedback(message.id, true)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Útil
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, false)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <ThumbsDown className="w-3 h-3" />
                        Não útil
                      </button>
                    </div>
                  )}

                  {feedbackGiven.has(message.id) && (
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Obrigado pelo feedback!
                    </p>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1">
                    <img src={DAVELOGO} alt="DAVE" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="bg-slate-800 rounded-2xl p-3 border border-slate-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {!isTyping && messages.length > 1 && suggestions.length > 0 && (
              <div className="pt-2">
                <p className="text-xs text-gray-400 mb-2">Sugestões:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-full border border-slate-700 hover:border-cyan-500 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua pergunta..."
                className="flex-1 bg-slate-900 text-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
