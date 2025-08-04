'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { EntryForm } from '@/components/forms/EntryForm';
import { MoodChart } from '@/components/charts/MoodChart';
import { TrendingUp, Calendar, Heart, BookOpen, Sparkles, Target } from 'lucide-react';

// Mock data for demonstration
const mockStats = {
  entriesThisWeek: 5,
  averageMood: 7.2,
  streakDays: 12,
  totalEntries: 47,
};

const mockInsights = [
  "You've been consistently journaling for 12 days! Keep it up! 🌟",
  "Your mood has improved by 15% this week compared to last week! 📈",
  "You tend to write longer entries on weekends. Great for reflection! 📝",
];

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-comic-blue"></div>
          <p className="mt-2 text-cool-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-comic-blue mb-4">
            Please sign in to access your dashboard
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-comic-blue mb-2">
          Welcome Back, {session.user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-cool-600 text-lg">
          Ready to capture today&apos;s thoughts and feelings?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="comic-card p-4 text-center">
          <Calendar className="h-8 w-8 text-comic-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-comic-blue">{mockStats.entriesThisWeek}</div>
          <div className="text-sm text-cool-600">Entries This Week</div>
        </div>
        
        <div className="comic-card p-4 text-center">
          <Heart className="h-8 w-8 text-comic-teal mx-auto mb-2" />
          <div className="text-2xl font-bold text-comic-teal">{mockStats.averageMood}/10</div>
          <div className="text-sm text-cool-600">Average Mood</div>
        </div>
        
        <div className="comic-card p-4 text-center">
          <Target className="h-8 w-8 text-comic-purple mx-auto mb-2" />
          <div className="text-2xl font-bold text-comic-purple">{mockStats.streakDays}</div>
          <div className="text-sm text-cool-600">Day Streak</div>
        </div>
        
        <div className="comic-card p-4 text-center">
          <BookOpen className="h-8 w-8 text-comic-indigo mx-auto mb-2" />
          <div className="text-2xl font-bold text-comic-indigo">{mockStats.totalEntries}</div>
          <div className="text-sm text-cool-600">Total Entries</div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="comic-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-comic-purple" />
          <h2 className="text-2xl font-bold text-comic-blue">Your Personal Insights</h2>
        </div>
        <div className="grid gap-3">
          {mockInsights.map((insight, index) => (
            <div key={index} className="bubble-card p-3 border-l-4 border-comic-teal">
              <p className="text-cool-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <EntryForm />
        </div>

        <div className="comic-card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-6 w-6 text-comic-blue" />
            <h2 className="text-2xl font-bold text-comic-blue">Your Mood Journey</h2>
          </div>
          <MoodChart />
        </div>
      </div>
    </div>
  );
} 