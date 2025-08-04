'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { EntryCard } from '@/components/journal/EntryCard';
import { BookOpen, Sparkles, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EntriesPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-comic-blue"></div>
          <p className="mt-2 text-cool-600">Loading your entries...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-comic-blue mb-4">
            Please sign in to view your journal entries
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-comic-teal rounded-comic border-4 border-black shadow-comic">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-comic-blue mb-4">
          Your Journal Entries
        </h1>
        <p className="text-cool-700 text-lg">
          Explore your thoughts, feelings, and insights! 📚
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for entries - would be populated with actual entries from the API */}
        <div className="comic-card p-8 text-center col-span-full">
          <Sparkles className="h-16 w-16 text-comic-purple mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-comic-blue mb-4">
            Ready to Start Writing?
          </h3>
          <p className="text-cool-700 mb-6 text-lg">
            Your journal entries will appear here as you create them. 
            Start your first entry and begin your mental wellness journey!
          </p>
          <Link href="/dashboard">
            <Button className="comic-button px-8 py-3 text-lg">
              <Plus className="h-5 w-5 mr-2" />
              Write Your First Entry
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 