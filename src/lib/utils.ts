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
  if (mood >= 8) return 'from-green-200 to-green-300 text-green-800'
  if (mood >= 6) return 'from-blue-200 to-blue-300 text-blue-800'
  if (mood >= 4) return 'from-yellow-200 to-yellow-300 text-yellow-800'
  if (mood >= 2) return 'from-orange-200 to-orange-300 text-orange-800'
  return 'from-red-200 to-red-300 text-red-800'
} 