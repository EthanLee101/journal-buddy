'use client';

import React from 'react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// Fetch mood data
const fetchMoodData = async () => {
  const response = await fetch('/api/mood?days=14');
  if (!response.ok) {
    throw new Error('Failed to fetch mood data');
  }
  const data = await response.json();
  return data.data || [];
};

export function MoodChart() {
  const { data: moodEntries, isLoading, error } = useQuery({
    queryKey: ['mood-chart'],
    queryFn: fetchMoodData,
  });

  const chartData = useMemo(() => {
    if (!moodEntries || moodEntries.length === 0) {
      return [];
    }

    return moodEntries
      .map((entry: any) => ({
        date: format(new Date(entry.created_at), 'MMM dd'),
        mood: entry.mood,
        energy: entry.energy || 0,
        anxiety: entry.anxiety || 0,
      }))
      .reverse() // Show oldest to newest
      .slice(-7); // Show last 7 entries
  }, [moodEntries]);

  if (isLoading) {
    return (
      <div className="h-80 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-comic-blue"></div>
          <p className="mt-2 text-cool-600">Loading mood data...</p>
        </div>
      </div>
    );
  }

  if (error || chartData.length === 0) {
    return (
      <div className="h-80 w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-cool-600 mb-4">No mood data available yet</p>
          <p className="text-sm text-cool-500">Start tracking your mood to see trends!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
          <XAxis 
            dataKey="date" 
            stroke="#64748B"
            fontSize={12}
            fontWeight="bold"
          />
          <YAxis 
            domain={[1, 10]} 
            stroke="#64748B"
            fontSize={12}
            fontWeight="bold"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#F0F9FF',
              border: '2px solid #0EA5E9',
              borderRadius: '12px',
              boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.8)',
              fontWeight: 'bold',
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#3B82F6"
            strokeWidth={3}
            name="Mood"
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: '#3B82F6', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#06B6D4"
            strokeWidth={3}
            name="Energy"
            dot={{ fill: '#06B6D4', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: '#06B6D4', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="anxiety"
            stroke="#8B5CF6"
            strokeWidth={3}
            name="Anxiety"
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: '#8B5CF6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 