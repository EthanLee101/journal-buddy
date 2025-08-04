'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { createMoodEntrySchema, type CreateMoodEntryInput } from '@/lib/validations/mood';
import { Heart, Zap, Brain, Moon, Sparkles } from 'lucide-react';

export function MoodForm() {
  const queryClient = useQueryClient();
  const [mood, setMood] = useState([5]);
  const [energy, setEnergy] = useState([5]);
  const [anxiety, setAnxiety] = useState([5]);
  const [sleep, setSleep] = useState([8]);

  const form = useForm<CreateMoodEntryInput>({
    resolver: zodResolver(createMoodEntrySchema),
    defaultValues: {
      mood: 5,
      energy: 5,
      anxiety: 5,
      sleep: 8,
      notes: '',
    },
  });

  const createMoodEntry = useMutation({
    mutationFn: async (data: CreateMoodEntryInput) => {
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to create mood entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['mood-entries'] });
      form.reset();
      setMood([5]);
      setEnergy([5]);
      setAnxiety([5]);
      setSleep([8]);
    },
  });

  const onSubmit = (data: CreateMoodEntryInput) => {
    createMoodEntry.mutate({
      ...data,
      mood: mood[0],
      energy: energy[0],
      anxiety: anxiety[0],
      sleep: sleep[0],
    });
  };

  const getMoodIcon = (value: number) => {
    if (value <= 3) return <Heart className="h-5 w-5 text-red-500" />;
    if (value <= 7) return <Heart className="h-5 w-5 text-comic-teal" />;
    return <Heart className="h-5 w-5 text-green-500" />;
  };

  const getEnergyIcon = (value: number) => {
    if (value <= 3) return <Zap className="h-5 w-5 text-gray-400" />;
    if (value <= 7) return <Zap className="h-5 w-5 text-yellow-500" />;
    return <Zap className="h-5 w-5 text-orange-500" />;
  };

  const getAnxietyIcon = (value: number) => {
    if (value <= 3) return <Brain className="h-5 w-5 text-green-500" />;
    if (value <= 7) return <Brain className="h-5 w-5 text-yellow-500" />;
    return <Brain className="h-5 w-5 text-red-500" />;
  };

  const getSleepIcon = (value: number) => {
    if (value <= 4) return <Moon className="h-5 w-5 text-red-500" />;
    if (value <= 7) return <Moon className="h-5 w-5 text-yellow-500" />;
    return <Moon className="h-5 w-5 text-blue-500" />;
  };

  return (
    <div className="comic-card p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-6 w-6 text-comic-purple" />
        <h2 className="text-2xl font-bold text-comic-blue">Track Your Mood</h2>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Mood Slider */}
        <div className="bubble-card p-4">
          <label className="flex items-center space-x-2 text-lg font-medium mb-4">
            {getMoodIcon(mood[0])}
            <span>Overall Mood</span>
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-comic-teal to-comic-cyan text-comic-blue">
              {mood[0]}/10
            </span>
          </label>
          <Slider
            value={mood}
            onValueChange={setMood}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-cool-600 mt-2">
            <span>Very Low</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Energy Slider */}
        <div className="bubble-card p-4">
          <label className="flex items-center space-x-2 text-lg font-medium mb-4">
            {getEnergyIcon(energy[0])}
            <span>Energy Level</span>
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800">
              {energy[0]}/10
            </span>
          </label>
          <Slider
            value={energy}
            onValueChange={setEnergy}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-cool-600 mt-2">
            <span>Exhausted</span>
            <span>Energized</span>
          </div>
        </div>

        {/* Anxiety Slider */}
        <div className="bubble-card p-4">
          <label className="flex items-center space-x-2 text-lg font-medium mb-4">
            {getAnxietyIcon(anxiety[0])}
            <span>Anxiety Level</span>
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800">
              {anxiety[0]}/10
            </span>
          </label>
          <Slider
            value={anxiety}
            onValueChange={setAnxiety}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-cool-600 mt-2">
            <span>Calm</span>
            <span>Very Anxious</span>
          </div>
        </div>

        {/* Sleep Slider */}
        <div className="bubble-card p-4">
          <label className="flex items-center space-x-2 text-lg font-medium mb-4">
            {getSleepIcon(sleep[0])}
            <span>Sleep Quality (hours)</span>
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800">
              {sleep[0]}h
            </span>
          </label>
          <Slider
            value={sleep}
            onValueChange={setSleep}
            max={12}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-cool-600 mt-2">
            <span>0h</span>
            <span>12h</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Textarea
            placeholder="Any additional notes about how you're feeling today? (optional)"
            rows={3}
            {...form.register('notes')}
            className="comic-card border-2 border-cool-300 focus:border-comic-blue focus:ring-comic-blue resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={createMoodEntry.isPending}
          className="comic-button w-full py-3 text-lg"
        >
          <Heart className="h-4 w-4 mr-2" />
          {createMoodEntry.isPending ? 'Saving Your Mood...' : 'Save Mood Entry'}
        </Button>
      </form>
    </div>
  );
}