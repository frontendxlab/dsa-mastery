import type { Article } from './articles'

export interface CurriculumChapter {
  slug: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  focus?: string
  description?: string
}

export interface CurriculumPart {
  title: string
  color: string
  chapters: CurriculumChapter[]
}

export interface Curriculum {
  slug: string
  emoji: string
  title: string
  tagline: string
  description: string
  parts: CurriculumPart[]
}

const curricula: Curriculum[] = []

export function getCurriculum(slug: string): Curriculum | undefined {
  return curricula.find(c => c.slug === slug)
}

export function countCurriculumChapters(curriculum: Curriculum): number {
  return curriculum.parts.reduce((sum, part) => sum + part.chapters.length, 0)
}

export function getAllCurricula(): Curriculum[] {
  return curricula
}
