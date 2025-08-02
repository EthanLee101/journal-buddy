import { z } from 'zod'

export const createMoodEntrySchema = z.object({
  mood: z.number().min(1).max(10),
  energy: z.number().min(1).max(10).optional(),
  anxiety: z.number().min(1).max(10).optional(),
  sleep: z.number().min(0).max(24).optional(),
  notes: z.string().optional(),
})

export const updateMoodEntrySchema = z.object({
  id: z.string(),
  mood: z.number().min(1).max(10),
  energy: z.number().min(1).max(10).optional(),
  anxiety: z.number().min(1).max(10).optional(),
  sleep: z.number().min(0).max(24).optional(),
  notes: z.string().optional(),
})

export type CreateMoodEntryInput = z.infer<typeof createMoodEntrySchema>
export type UpdateMoodEntryInput = z.infer<typeof updateMoodEntrySchema> 