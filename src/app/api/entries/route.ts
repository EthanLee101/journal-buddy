import { NextRequest, NextResponse } from 'next/server';
import { createEntrySchema } from '@/lib/validations/entry';
import { z } from 'zod';

// Mock data for demo purposes
const mockEntries = [
  {
    id: '1',
    title: 'Feeling Great Today!',
    content: 'Had an amazing day with lots of positive energy. Feeling grateful for all the good things in my life.',
    mood: 9,
    tags: 'positive,gratitude,energy',
    isPrivate: true,
    userId: 'demo-user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Reflection Time',
    content: 'Taking some time to reflect on my goals and what I want to achieve. Feeling motivated to make positive changes.',
    mood: 7,
    tags: 'reflection,goals,motivation',
    isPrivate: true,
    userId: 'demo-user',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  // Demo mode - return mock data
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  return NextResponse.json({
    data: mockEntries,
    pagination: {
      page,
      limit,
      total: mockEntries.length,
      pages: Math.ceil(mockEntries.length / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  // Demo mode - validate and return mock entry
  try {
    const body = await request.json();
    const validatedData = createEntrySchema.parse(body);

    const newEntry = {
      id: Date.now().toString(),
      ...validatedData,
      userId: 'demo-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock data (in real app, this would be saved to database)
    mockEntries.unshift(newEntry);

    return NextResponse.json({ data: newEntry }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    );
  }
} 