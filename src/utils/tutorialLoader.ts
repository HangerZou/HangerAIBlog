import type {
  TutorialSeries,
  TutorialItem,
  TutorialSeriesMeta,
  TutorialFrontmatter,
} from '@/types/tutorial'

const metaModules = import.meta.glob<{ default: TutorialSeriesMeta }>(
  '/src/content/*/tutorials/**/_meta.json',
  { eager: true }
)

const mdModules = import.meta.glob<string>('/src/content/*/tutorials/**/*.md', {
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw: string): { attrs: TutorialFrontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { attrs: {} as TutorialFrontmatter, body: raw }

  const lines = match[1].split('\n')
  const attrs: Record<string, unknown> = {}

  for (const line of lines) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val: unknown = line.slice(idx + 1).trim()
    if (typeof val === 'string' && val.startsWith('[')) {
      try {
        val = JSON.parse(val)
      } catch {
        /* keep as string */
      }
    }
    attrs[key] = val
  }

  return { attrs: attrs as TutorialFrontmatter, body: match[2] }
}

export async function loadTutorialSeries(locale: string): Promise<TutorialSeries[]> {
  const seriesMap = new Map<string, TutorialSeries>()

  for (const [path, mod] of Object.entries(metaModules)) {
    const match = path.match(/\/content\/([^/]+)\/tutorials\/([^/]+)\/_meta\.json$/)
    if (!match || match[1] !== locale) continue
    seriesMap.set(match[2], { meta: mod.default, tutorials: [] })
  }

  for (const [path, loader] of Object.entries(mdModules)) {
    const match = path.match(/\/content\/([^/]+)\/tutorials\/([^/]+)\/(.+)\.md$/)
    if (!match || match[1] !== locale) continue
    const [, , seriesKey, slug] = match
    if (slug === '_meta') continue

    const series = seriesMap.get(seriesKey)
    if (!series) continue

    const raw = await (loader as () => Promise<string>)()
    const { attrs, body } = parseFrontmatter(raw)
    const orderFromSlug = parseInt(slug.match(/^(\d+)/)?.[1] ?? '0', 10)

    series.tutorials.push({
      slug,
      seriesKey,
      title: attrs.title ?? slug,
      description: attrs.description ?? '',
      date: attrs.date ?? '',
      tags: attrs.tags ?? [],
      order: attrs.order ?? orderFromSlug,
      isInternal: attrs.isInternal ?? series.meta.isInternal,
      passwordHash: attrs.passwordHash ?? series.meta.passwordHash,
      content: body,
    })
  }

  for (const series of seriesMap.values()) {
    series.tutorials.sort((a, b) => a.order - b.order)
  }

  return Array.from(seriesMap.values()).sort((a, b) => a.meta.order - b.meta.order)
}
