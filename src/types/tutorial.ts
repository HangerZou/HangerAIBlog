export interface TutorialSeriesMeta {
  key: string
  title: string
  description: string
  icon: string
  category: string
  order: number
  isInternal: boolean
  passwordHash: string | null
  tags: string[]
}

export interface TutorialFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  order?: number
  isInternal?: boolean
  passwordHash?: string | null
}

export interface TutorialItem {
  slug: string
  seriesKey: string
  title: string
  description: string
  date: string
  tags: string[]
  order: number
  isInternal: boolean
  passwordHash: string | null
  content: string
}

export interface TutorialSeries {
  meta: TutorialSeriesMeta
  tutorials: TutorialItem[]
}
