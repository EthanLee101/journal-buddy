'use client';

import React from 'react';
import { formatDate, getMoodEmoji, getMoodColor } from '@/lib/utils';
import { JournalEntry } from '@/types';

interface EntryCardProps {
  entry: JournalEntry;
}

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="comic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
          <span className={`font-bold px-2 py-1 rounded-comic text-sm bg-gradient-to-r ${getMoodColor(entry.mood)}`}>
            {entry.mood}/10
          </span>
        </div>
        <span className="text-sm text-cool-600 font-medium">
          {formatDate(entry.createdAt)}
        </span>
      </div>
      
      {entry.title && (
        <h3 className="text-xl font-bold text-comic-blue mb-3">{entry.title}</h3>
      )}
      
      <p className="text-cool-700 mb-4 leading-relaxed">
        {entry.content.length > 150 ? `${entry.content.substring(0, 150)}...` : entry.content}
      </p>
      
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {entry.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-comic-cyan text-comic-blue text-xs font-bold rounded-comic border-2 border-comic-blue"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {entry.analysis && (
        <div className="border-t-2 border-comic-blue pt-4 mt-4">
          <h4 className="font-bold mb-2 text-comic-purple">✨ AI Insights</h4>
          <p className="text-sm text-cool-600 italic">
            {entry.analysis.insights}
          </p>
        </div>
      )}
    </div>
  );
} 