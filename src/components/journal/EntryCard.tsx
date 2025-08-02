'use client';

import React from 'react';
import { formatDate, getMoodEmoji, getMoodColor } from '@/lib/utils';
import { JournalEntry } from '@/types';

interface EntryCardProps {
  entry: JournalEntry;
}

export function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
          <span className={`font-semibold ${getMoodColor(entry.mood)}`}>
            {entry.mood}/10
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(entry.createdAt)}
        </span>
      </div>
      
      {entry.title && (
        <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
      )}
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {entry.content}
      </p>
      
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {entry.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {entry.analysis && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">AI Insights</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {entry.analysis.insights}
          </p>
        </div>
      )}
    </div>
  );
} 