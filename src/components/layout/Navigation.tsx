'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, BarChart3, Sparkles } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-cool-50 to-cool-100 border-b-2 border-black shadow-comic">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-comic-blue rounded-comic border-2 border-black shadow-comic group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-200">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-comic-blue">
              JournalBuddy
            </span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="flex items-center space-x-1 text-cool-700 hover:text-comic-blue transition-colors">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/entries" className="flex items-center space-x-1 text-cool-700 hover:text-comic-blue transition-colors">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Journal</span>
            </Link>
            <Button className="comic-button px-4 py-2 flex items-center space-x-1">
              <Sparkles className="h-4 w-4" />
              <span>Get Started</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 