'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, BarChart3, LogIn, LogOut, User } from 'lucide-react';

export function Navigation() {
  const { data: session, status } = useSession();
  const [showLoading, setShowLoading] = React.useState(true);

  // Set a timeout to stop showing loading state after 500ms
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    if (status !== 'loading') {
      setShowLoading(false);
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [status]);

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // Show loading state only for first second or until session loads
  if (status === 'loading' && showLoading) {
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
              <Button 
                disabled
                className="comic-button px-4 py-2 flex items-center space-x-1 opacity-75"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

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
            {session ? (
              <>
                <Link href="/dashboard" className="flex items-center space-x-1 text-cool-700 hover:text-comic-blue transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link href="/entries" className="flex items-center space-x-1 text-cool-700 hover:text-comic-blue transition-colors">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">Journal</span>
                </Link>
                <div className="flex items-center space-x-2 text-cool-700">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{session.user?.name}</span>
                </div>
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="border-2 border-comic-blue text-comic-blue hover:bg-comic-blue hover:text-white px-3 py-2 rounded-comic font-bold flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleSignIn}
                className="comic-button px-4 py-2 flex items-center space-x-1"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 