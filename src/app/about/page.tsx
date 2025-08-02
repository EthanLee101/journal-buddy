import React from 'react';
import { Shield, Sparkles, Heart, Brain, Phone, AlertTriangle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-comic-blue rounded-comic border-4 border-black shadow-comic">
              <Brain className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-comic-blue mb-4">
            About JournalBuddy
          </h1>
          <p className="text-xl text-cool-700 leading-relaxed">
            Your friendly companion for mental wellness and mindful journaling! 🌟
          </p>
        </div>
        
        {/* Mission Statement */}
        <div className="comic-card p-8 mb-8">
          <p className="text-lg text-cool-700 leading-relaxed text-center">
            JournalBuddy is a private, secure space for you to reflect on your thoughts, 
            feelings, and experiences. Our mission is to provide a supportive environment for 
            mental wellness through mindful journaling and AI-powered insights! ✨
          </p>
        </div>

        {/* Features Section */}
        <div className="comic-card p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-comic-purple" />
            <h2 className="text-3xl font-bold text-comic-blue">Amazing Features</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bubble-card p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-comic-teal" />
                <span className="font-bold text-comic-blue">Private & Encrypted</span>
              </div>
              <p className="text-cool-700">Your journal entries are completely secure! 🔒</p>
            </div>
            <div className="bubble-card p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-comic-purple" />
                <span className="font-bold text-comic-blue">AI-Powered Insights</span>
              </div>
              <p className="text-cool-700">Get gentle sentiment analysis and emotional insights! 🤖</p>
            </div>
            <div className="bubble-card p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="h-5 w-5 text-comic-teal" />
                <span className="font-bold text-comic-blue">Mood Tracking</span>
              </div>
              <p className="text-cool-700">Beautiful charts to visualize your emotional journey! 📈</p>
            </div>
            <div className="bubble-card p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-5 w-5 text-comic-indigo" />
                <span className="font-bold text-comic-blue">Mindful Design</span>
              </div>
              <p className="text-cool-700">Comic-inspired UI that makes journaling fun! 🎨</p>
            </div>
          </div>
        </div>
        
        {/* Privacy & Security */}
        <div className="comic-card p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-comic-teal" />
            <h2 className="text-3xl font-bold text-comic-blue">Privacy & Security</h2>
          </div>
          <p className="text-lg text-cool-700 leading-relaxed mb-4">
            Your privacy is our top priority! All journal entries are encrypted and stored securely. 
            We use industry-standard security practices to protect your data. You have complete 
            control over your information and can export or delete your data at any time. 🛡️
          </p>
        </div>
        
        {/* AI Ethics */}
        <div className="comic-card p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-comic-purple" />
            <h2 className="text-3xl font-bold text-comic-blue">AI Ethics</h2>
          </div>
          <p className="text-lg text-cool-700 leading-relaxed">
            Our AI features are designed to provide gentle, supportive insights. We do not provide 
            medical diagnoses or treatment recommendations. The AI analysis is meant to help you 
            reflect on your patterns and emotions, not replace professional mental health care. 🤝
          </p>
        </div>
        
        {/* Getting Help */}
        <div className="comic-card p-8">
          <div className="flex items-center space-x-2 mb-6">
            <Phone className="h-8 w-8 text-comic-blue" />
            <h2 className="text-3xl font-bold text-comic-blue">Getting Help</h2>
          </div>
          <p className="text-lg text-cool-700 mb-6">
            If you&apos;re experiencing mental health challenges, please reach out to professional help:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bubble-card p-4 text-center">
              <Phone className="h-6 w-6 text-comic-teal mx-auto mb-2" />
              <p className="font-bold text-comic-blue">Crisis Text Line</p>
              <p className="text-cool-700">Text HOME to 741741</p>
            </div>
            <div className="bubble-card p-4 text-center">
              <Phone className="h-6 w-6 text-comic-purple mx-auto mb-2" />
              <p className="font-bold text-comic-blue">Suicide Prevention</p>
              <p className="text-cool-700">1-800-273-8255</p>
            </div>
            <div className="bubble-card p-4 text-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="font-bold text-comic-blue">Emergency</p>
              <p className="text-cool-700">911</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-300 p-6 rounded-comic shadow-comic">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-orange-800 mb-2">Important Reminder:</p>
                <p className="text-orange-700">
                  This application is not a substitute for professional mental health care. 
                  If you&apos;re in crisis or need immediate help, please contact emergency services 
                  or a mental health professional right away! 💙
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 