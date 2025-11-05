import { Message, Conversation, Feedback, LearningPattern } from '../types/conversation';
import { searchKnowledge, KnowledgeEntry } from '../data/knowledgeBase';

const STORAGE_KEY_CONVERSATIONS = 'dave_conversations';
const STORAGE_KEY_FEEDBACK = 'dave_feedback';
const STORAGE_KEY_PATTERNS = 'dave_patterns';

export class ConversationService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('dave_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('dave_session_id', sessionId);
    }
    return sessionId;
  }

  createConversation(): Conversation {
    const conversation: Conversation = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId: this.sessionId,
      messages: [],
      startedAt: new Date(),
      lastActivityAt: new Date(),
    };

    this.saveConversation(conversation);
    return conversation;
  }

  getConversation(conversationId: string): Conversation | null {
    const conversations = this.getAllConversations();
    return conversations.find(c => c.id === conversationId) || null;
  }

  getCurrentConversation(): Conversation {
    const conversations = this.getAllConversations();
    const sessionConversations = conversations.filter(c => c.sessionId === this.sessionId);

    if (sessionConversations.length > 0) {
      return sessionConversations[sessionConversations.length - 1];
    }

    return this.createConversation();
  }

  private getAllConversations(): Conversation[] {
    const stored = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((c: Conversation) => ({
      ...c,
      startedAt: new Date(c.startedAt),
      lastActivityAt: new Date(c.lastActivityAt),
      messages: c.messages.map(m => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }))
    }));
  }

  private saveConversation(conversation: Conversation): void {
    const conversations = this.getAllConversations();
    const index = conversations.findIndex(c => c.id === conversation.id);

    if (index >= 0) {
      conversations[index] = conversation;
    } else {
      conversations.push(conversation);
    }

    const maxConversations = 50;
    if (conversations.length > maxConversations) {
      conversations.sort((a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime());
      conversations.splice(maxConversations);
    }

    localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(conversations));
  }

  addMessage(conversationId: string, role: 'user' | 'assistant', content: string, knowledgeBaseId?: string): Message {
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      knowledgeBaseId,
    };

    conversation.messages.push(message);
    conversation.lastActivityAt = new Date();

    this.saveConversation(conversation);

    if (role === 'user') {
      this.recordPattern(content);
    }

    return message;
  }

  async getResponse(userMessage: string): Promise<{ content: string; knowledgeBaseId?: string; relatedLinks?: KnowledgeEntry['relatedLinks'] }> {
    const results = searchKnowledge(userMessage);

    if (results.length > 0) {
      const best = results[0];
      return {
        content: best.answer,
        knowledgeBaseId: best.id,
        relatedLinks: best.relatedLinks,
      };
    }

    return {
      content: `Desculpe, não encontrei uma resposta específica para sua pergunta. Estou aprendendo continuamente!\n\nVocê pode tentar perguntar de outra forma ou explorar estas opções:\n\n• "O que é o DAVE?"\n• "Quais ferramentas estão disponíveis?"\n• "Como analisar performance de queries?"\n• "Como usar o Estimador de Migração?"\n\nSua pergunta foi registrada para melhorar minhas respostas futuras.`,
    };
  }

  submitFeedback(messageId: string, wasHelpful: boolean, comment?: string): void {
    const feedback: Feedback = {
      messageId,
      wasHelpful,
      comment,
      timestamp: new Date(),
    };

    const allFeedback = this.getAllFeedback();
    allFeedback.push(feedback);

    const maxFeedback = 500;
    if (allFeedback.length > maxFeedback) {
      allFeedback.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      allFeedback.splice(maxFeedback);
    }

    localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(allFeedback));
  }

  private getAllFeedback(): Feedback[] {
    const stored = localStorage.getItem(STORAGE_KEY_FEEDBACK);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((f: Feedback) => ({
      ...f,
      timestamp: new Date(f.timestamp)
    }));
  }

  private recordPattern(question: string): void {
    const normalized = question.toLowerCase().trim();
    if (normalized.length < 3) return;

    const patterns = this.getAllPatterns();
    const existing = patterns.find(p => p.pattern === normalized);

    if (existing) {
      existing.frequency += 1;
      existing.lastSeen = new Date();
    } else {
      patterns.push({
        pattern: normalized,
        frequency: 1,
        firstSeen: new Date(),
        lastSeen: new Date(),
      });
    }

    patterns.sort((a, b) => b.frequency - a.frequency);
    const maxPatterns = 200;
    if (patterns.length > maxPatterns) {
      patterns.splice(maxPatterns);
    }

    localStorage.setItem(STORAGE_KEY_PATTERNS, JSON.stringify(patterns));
  }

  private getAllPatterns(): LearningPattern[] {
    const stored = localStorage.getItem(STORAGE_KEY_PATTERNS);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((p: LearningPattern) => ({
      ...p,
      firstSeen: new Date(p.firstSeen),
      lastSeen: new Date(p.lastSeen)
    }));
  }

  getTopPatterns(limit: number = 10): LearningPattern[] {
    return this.getAllPatterns()
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limit);
  }

  clearHistory(): void {
    const conversations = this.getAllConversations();
    const filtered = conversations.filter(c => c.sessionId !== this.sessionId);
    localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(filtered));
  }
}
