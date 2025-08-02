'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Sparkles } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/dashboard');
    }
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
            Welcome Back! 
          </h2>
          <p className="mt-2 text-cool-700 text-lg">
            Ready to continue your journaling journey? ✨
          </p>
        </div>
        
        <div className="comic-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-comic-blue mb-2">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter any username"
                className="comic-card border-2 border-cool-300 focus:border-comic-blue focus:ring-comic-blue text-base p-3"
                required
              />
            </div>
            
            <div>
              <label className="block text-lg font-bold text-comic-blue mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password"
                className="comic-card border-2 border-cool-300 focus:border-comic-blue focus:ring-comic-blue text-base p-3"
                required
              />
            </div>
            
            <Button type="submit" className="comic-button w-full py-3 text-lg">
              <Sparkles className="h-5 w-5 mr-2" />
              Start Journaling!
            </Button>
          </form>
          
          <div className="mt-6 text-center bubble-card p-4">
            <p className="text-sm text-cool-700 font-medium">
              🎯 Demo Mode: Enter any username and password to get started!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 