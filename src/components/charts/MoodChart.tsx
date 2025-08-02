'use client';

import React from 'react';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

// Mock data for demonstration
const mockMoodData = [
  { date: 'Jan 01', mood: 6, energy: 5, anxiety: 4 },
  { date: 'Jan 02', mood: 7, energy: 6, anxiety: 3 },
  { date: 'Jan 03', mood: 5, energy: 4, anxiety: 6 },
  { date: 'Jan 04', mood: 8, energy: 7, anxiety: 2 },
  { date: 'Jan 05', mood: 7, energy: 6, anxiety: 3 },
  { date: 'Jan 06', mood: 9, energy: 8, anxiety: 2 },
  { date: 'Jan 07', mood: 8, energy: 7, anxiety: 3 },
];

export function MoodChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockMoodData}>
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