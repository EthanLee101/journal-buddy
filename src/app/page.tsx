import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain, Shield, Sparkles, BarChart3, Heart, BookOpen, Users, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-comic-blue rounded-comic border-4 border-black shadow-comic">
              <Brain className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-comic-blue mb-6 leading-tight">
            Welcome to
            <span className="block text-comic-teal">JournalBuddy!</span>
          </h1>
          
          <p className="text-2xl text-cool-700 mb-8 leading-relaxed">
            Your personal space for thoughts, feelings, and mental wellness 🌈
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="comic-button px-8 py-4 text-xl">
                <Sparkles className="h-6 w-6 mr-2" />
                Start Journaling
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="outline" 
                className="border-2 border-comic-blue text-comic-blue hover:bg-comic-blue hover:text-white px-8 py-4 text-xl rounded-comic font-bold"
              >
                <BookOpen className="h-6 w-6 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="comic-card p-8 text-center">
            <div className="bg-comic-teal rounded-comic border-2 border-black p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-comic-blue mb-4">Private & Secure</h3>
            <p className="text-cool-700 text-lg">
              Your thoughts are yours alone! We use top-notch security to keep your data safe and sound. 🔒
            </p>
          </div>
          
          <div className="comic-card p-8 text-center">
            <div className="bg-comic-purple rounded-comic border-2 border-black p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-comic-blue mb-4">AI Insights</h3>
            <p className="text-cool-700 text-lg">
              Get gentle, personalized insights about your mood patterns and emotional well-being! ✨
            </p>
          </div>
          
          <div className="comic-card p-8 text-center">
            <div className="bg-comic-indigo rounded-comic border-2 border-black p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-comic-blue mb-4">Track Progress</h3>
            <p className="text-cool-700 text-lg">
              Watch your mental health journey unfold with beautiful charts and progress tracking! 📈
            </p>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-comic-blue mb-8">
            Join Thousands of Happy Journalers! 
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bubble-card p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-cool-700 italic mb-4">
                &ldquo;JournalBuddy has completely changed how I approach my mental health. The AI insights are incredibly helpful!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-comic-teal rounded-full flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-comic-blue">- Sarah M.</span>
              </div>
            </div>
            
            <div className="bubble-card p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-cool-700 italic mb-4">
                &ldquo;I love the comic book style! It makes journaling feel fun and approachable instead of intimidating.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-comic-purple rounded-full flex items-center justify-center mr-3">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-comic-blue">- Alex K.</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center comic-card p-12">
          <h2 className="text-4xl font-bold text-comic-blue mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-cool-700 mb-8">
            Begin your mental wellness adventure today - it&apos;s free to get started! 🚀
          </p>
          <Link href="/dashboard">
            <Button className="comic-button px-10 py-5 text-2xl">
              <Sparkles className="h-6 w-6 mr-2" />
              Start Your First Entry
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 