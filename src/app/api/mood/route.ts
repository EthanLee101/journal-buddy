import { NextRequest, NextResponse } from 'next/server';
import { createMoodEntrySchema } from '@/lib/validations/mood';
import { z } from 'zod';

// Mock mood data for demo purposes
const mockMoodEntries = [
  {
    id: '1',
    mood: 8,
    energy: 7,
    anxiety: 3,
    sleep: 8,
    notes: 'Feeling really good today!',
    userId: 'demo-user',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    mood: 6,
    energy: 5,
    anxiety: 5,
    sleep: 6,
    notes: 'Average day, nothing special',
    userId: 'demo-user',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  // Demo mode - return mock data
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '30');

  return NextResponse.json({ data: mockMoodEntries });
}

export async function POST(request: NextRequest) {
  // Demo mode - validate and return mock mood entry
  try {
    const body = await request.json();
    const validatedData = createMoodEntrySchema.parse(body);

    const newMoodEntry = {
      id: Date.now().toString(),
      ...validatedData,
      userId: 'demo-user',
      createdAt: new Date().toISOString(),
    };

    // Add to mock data (in real app, this would be saved to database)
    mockMoodEntries.unshift(newMoodEntry);

    return NextResponse.json({ data: newMoodEntry }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
      { status: 500 }
    );
  }
} 