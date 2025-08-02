'use client';

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { createEntrySchema, type CreateEntryInput } from '@/lib/validations/entry';
import { Heart, Sparkles, Cloud, Sun } from 'lucide-react';

export function EntryForm() {
  const queryClient = useQueryClient();
  const [mood, setMood] = useState([5]);

  const form = useForm<CreateEntryInput>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      title: '',
      content: '',
      mood: 5,
      tags: [],
      isPrivate: true,
    },
  });

  const createEntry = useMutation({
    mutationFn: async (data: CreateEntryInput) => {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to create entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
      form.reset();
      setMood([5]);
    },
  });

  const onSubmit = (data: CreateEntryInput) => {
    createEntry.mutate({ ...data, mood: mood[0] });
  };

  const getMoodIcon = (value: number) => {
    if (value <= 3) return <Cloud className="h-5 w-5 text-cool-400" />;
    if (value <= 7) return <Heart className="h-5 w-5 text-comic-teal" />;
    return <Sun className="h-5 w-5 text-yellow-400" />;
  };

  const getMoodColor = (value: number) => {
    if (value <= 3) return 'from-cool-200 to-cool-300';
    if (value <= 7) return 'from-comic-teal to-comic-cyan';
    return 'from-yellow-200 to-yellow-300';
  };

  return (
    <div className="comic-card p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-6 w-6 text-comic-purple" />
        <h2 className="text-2xl font-bold text-comic-blue">Share Your Thoughts</h2>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            placeholder="Give your entry a title..."
            {...form.register('title')}
            className="comic-card border-2 border-cool-300 focus:border-comic-blue focus:ring-comic-blue"
          />
        </div>

        <div className="bubble-card p-4">
          <label className="flex items-center space-x-2 text-lg font-medium mb-4">
            {getMoodIcon(mood[0])}
            <span>How are you feeling today?</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getMoodColor(mood[0])} text-cool-800`}>
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
            <span>Not great</span>
            <span>Amazing!</span>
          </div>
        </div>

        <div>
          <Textarea
            placeholder="What's on your mind? Share your thoughts, feelings, or anything that's important to you today..."
            rows={8}
            {...form.register('content')}
            className="comic-card border-2 border-cool-300 focus:border-comic-blue focus:ring-comic-blue resize-none text-base"
          />
          {form.formState.errors.content && (
            <p className="text-sm text-destructive mt-2 font-medium">
              {form.formState.errors.content.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={createEntry.isPending}
          className="comic-button w-full py-3 text-lg"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {createEntry.isPending ? 'Saving Your Thoughts...' : 'Save Journal Entry'}
        </Button>
      </form>
    </div>
  );
} 