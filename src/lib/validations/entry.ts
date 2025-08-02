import { z } from 'zod'

export const createEntrySchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  mood: z.number().min(1).max(10),
  tags: z.array(z.string()).optional(),
  isPrivate: z.boolean().optional(),
})

export const updateEntrySchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  mood: z.number().min(1).max(10),
  tags: z.array(z.string()).optional(),
  isPrivate: z.boolean().optional(),
})

export type CreateEntryInput = z.infer<typeof createEntrySchema>
export type UpdateEntryInput = z.infer<typeof updateEntrySchema> 