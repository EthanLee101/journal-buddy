import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function getMoodEmoji(mood: number): string {
  if (mood >= 8) return '😊'
  if (mood >= 6) return '🙂'
  if (mood >= 4) return '😐'
  if (mood >= 2) return '😔'
  return '😢'
}

export function getMoodColor(mood: number): string {
  if (mood >= 8) return 'text-green-600'
  if (mood >= 6) return 'text-blue-600'
  if (mood >= 4) return 'text-yellow-600'
  if (mood >= 2) return 'text-orange-600'
  return 'text-red-600'
} 