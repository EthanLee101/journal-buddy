'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Brain, Chrome } from 'lucide-react';

export default function SignInPage() {
  const handleGoogleSignIn = async () => {
    await signIn('google', {
      callbackUrl: '/dashboard',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-comic-blue rounded-comic border-4 border-black shadow-comic">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-comic-blue">
            Welcome to Your Mental Health Journal
          </h2>
          <p className="mt-2 text-cool-700 text-lg">
            Start your wellness journey with secure Google sign-in ✨
          </p>
        </div>
        
        <div className="comic-card p-8">
          <Button 
            onClick={handleGoogleSignIn}
            className="comic-button w-full py-3 text-lg"
          >
            <Chrome className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>
          
          <div className="mt-6 text-center bubble-card p-4">
            <p className="text-sm text-cool-700 font-medium">
              🔐 Secure authentication powered by Google OAuth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 