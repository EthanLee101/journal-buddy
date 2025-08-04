'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { EntryForm } from '@/components/forms/EntryForm';
import { MoodForm } from '@/components/forms/MoodForm';
import { MoodChart } from '@/components/charts/MoodChart';
import { TrendingUp, Calendar, Heart, BookOpen, Sparkles, Target } from 'lucide-react';
import { useState } from 'react';

// Fetch dashboard stats
const fetchDashboardStats = async () => {
  const [entriesRes, moodRes] = await Promise.all([
    fetch('/api/entries?limit=100'),
    fetch('/api/mood?days=30')
  ]);
  
  if (!entriesRes.ok || !moodRes.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  
  const entriesData = await entriesRes.json();
  const moodData = await moodRes.json();
  
  return {
    entries: entriesData.data || [],
    moods: moodData.data || []
  };
};

const calculateStats = (entries: any[], moods: any[]) => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const entriesThisWeek = entries.filter(entry => 
    new Date(entry.created_at) >= weekAgo
  ).length;
  
  const totalEntries = entries.length;
  
  const averageMood = entries.length > 0 
    ? entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length
    : 0;
  
  // Simple streak calculation - consecutive days with entries
  const streakDays = calculateStreak(entries);
  
  return {
    entriesThisWeek,
    averageMood: Math.round(averageMood * 10) / 10,
    streakDays,
    totalEntries,
  };
};

const calculateStreak = (entries: any[]) => {
  if (entries.length === 0) return 0;
  
  const sortedEntries = entries.sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.created_at);
    entryDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff === streak + 1) {
      streak++;
      currentDate = entryDate;
    } else {
      break;
    }
  }
  
  return streak;
};

const generateInsights = (stats: any, entries: any[]) => {
  const insights = [];
  
  if (stats.streakDays > 0) {
    insights.push(`You've been consistently journaling for ${stats.streakDays} days! Keep it up! 🌟`);
  }
  
  if (stats.averageMood >= 7) {
    insights.push(`Your average mood is ${stats.averageMood}/10 - you're doing great! 😊`);
  } else if (stats.averageMood >= 5) {
    insights.push(`Your average mood is ${stats.averageMood}/10 - remember to be kind to yourself! 💙`);
  }
  
  if (stats.entriesThisWeek > 3) {
    insights.push(`${stats.entriesThisWeek} entries this week shows great commitment to self-reflection! 📝`);
  }
  
  if (insights.length === 0) {
    insights.push("Start your journaling journey today and discover insights about your mental wellness! 🚀");
  }
  
  return insights;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<'journal' | 'mood'>('journal');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    enabled: !!session,
  });

  if (status === 'loading' || isLoading) {
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error loading dashboard
          </h1>
          <p className="text-cool-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const stats = data ? calculateStats(data.entries, data.moods) : {
    entriesThisWeek: 0,
    averageMood: 0,
    streakDays: 0,
    totalEntries: 0,
  };
  
  const insights = data ? generateInsights(stats, data.entries) : [];

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
          <div className="text-2xl font-bold text-comic-blue">{stats.entriesThisWeek}</div>
          <div className="text-sm text-cool-600">Entries This Week</div>
        </div>
        
        <div className="comic-card p-4 text-center">
          <Heart className="h-8 w-8 text-comic-teal mx-auto mb-2" />
          <div className="text-2xl font-bold text-comic-teal">{stats.averageMood}/10</div>
          <div className="text-sm text-cool-600">Average Mood</div>
        </div>
        
        <div className="comic-card p-4 text-center">
          <Target className="h-8 w-8 text-comic-purple mx-auto mb-2" />
          <div className="text-2xl font-bold text-comic-purple">{stats.streakDays}</div>
          <div className="text-sm text-cool-600">Day Streak</div>
        </div>
        
        <div className="comic-card p-4 text-center">
          <BookOpen className="h-8 w-8 text-comic-indigo mx-auto mb-2" />
          <div className="text-2xl font-bold text-comic-indigo">{stats.totalEntries}</div>
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
          {insights.map((insight, index) => (
            <div key={index} className="bubble-card p-3 border-l-4 border-comic-teal">
              <p className="text-cool-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-cool-100 p-1 rounded-comic border-2 border-cool-300">
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex-1 px-4 py-2 text-sm font-bold rounded-comic transition-all ${
                activeTab === 'journal'
                  ? 'bg-comic-blue text-white shadow-comic'
                  : 'text-comic-blue hover:bg-cool-200'
              }`}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Journal Entry
            </button>
            <button
              onClick={() => setActiveTab('mood')}
              className={`flex-1 px-4 py-2 text-sm font-bold rounded-comic transition-all ${
                activeTab === 'mood'
                  ? 'bg-comic-teal text-white shadow-comic'
                  : 'text-comic-teal hover:bg-cool-200'
              }`}
            >
              <Heart className="h-4 w-4 inline mr-2" />
              Mood Tracker
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'journal' ? <EntryForm /> : <MoodForm />}
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