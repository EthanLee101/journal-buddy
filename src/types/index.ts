export interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  mood: number;
  tags: string[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  analysis?: EntryAnalysis;
  attachments?: EntryAttachment[];
}

export interface EntryAnalysis {
  id: string;
  sentiment: number;
  emotions: EmotionScores;
  keywords: string[];
  insights?: string;
  createdAt: Date;
}

export interface EmotionScores {
  joy: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  disgust: number;
}

export interface MoodEntry {
  id: string;
  mood: number;
  energy?: number;
  anxiety?: number;
  sleep?: number;
  notes?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  id: string;
  theme: string;
  reminderEnabled: boolean;
  reminderTime?: string;
  aiInsightsEnabled: boolean;
  exportFormat: string;
}

export interface EntryAttachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: Date;
}

export interface MoodTrend {
  date: string;
  mood: number;
  energy?: number;
  anxiety?: number;
}

export interface CreateEntryInput {
  title?: string;
  content: string;
  mood: number;
  tags?: string[];
  isPrivate?: boolean;
}

export interface CreateMoodEntryInput {
  mood: number;
  energy?: number;
  anxiety?: number;
  sleep?: number;
  notes?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
} 