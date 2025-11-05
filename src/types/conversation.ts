export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  knowledgeBaseId?: string;
}

export interface Conversation {
  id: string;
  sessionId: string;
  messages: Message[];
  startedAt: Date;
  lastActivityAt: Date;
}

export interface Feedback {
  messageId: string;
  wasHelpful: boolean;
  comment?: string;
  timestamp: Date;
}

export interface LearningPattern {
  pattern: string;
  frequency: number;
  firstSeen: Date;
  lastSeen: Date;
}
