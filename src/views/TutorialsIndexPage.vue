<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { loadTutorialSeries } from '@/utils/tutorialLoader'
import { useTutorialAuth } from '@/composables/useTutorialAuth'
import type { TutorialSeries } from '@/types/tutorial'

const { t, locale } = useI18n()
const router = useRouter()
const { isAuthenticated } = useTutorialAuth()

const allSeries = ref<TutorialSeries[]>([])
const loading = ref(true)

async function loadContent() {
  loading.value = true
  allSeries.value = await loadTutorialSeries(locale.value)
  loading.value = false
}

onMounted(loadContent)
watch(locale, loadContent)

function getSeriesIcon(icon: string): string {
  const iconMap: Record<string, string> = {
    terminal: '💻',
    cpu: '🧠',
    book: '📖',
    code: '⚡',
    database: '🗄️',
    cloud: '☁️',
  }
  return iconMap[icon] ?? '📚'
}

function handleSeriesClick(series: TutorialSeries) {
  if (series.meta.isInternal && !isAuthenticated(series.meta.key)) {
    router.push(`/tutorials/${series.meta.key}`)
    return
  }
  const firstTutorial = series.tutorials[0]
  if (firstTutorial) {
    router.push(`/tutorials/${series.meta.key}/${firstTutorial.slug}`)
  }
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'ai-tools': 'AI 工具',
    'ml-training': '模型训练',
    'web-dev': 'Web 开发',
    'devops': 'DevOps',
  }
  return labels[category] ?? category
}
</script>

<template>
  <div class="tutorials-index">
    <header class="tutorials-index__header">
      <h1 class="tutorials-index__title">{{ t('tutorials.title') }}</h1>
      <p class="tutorials-index__desc">{{ t('tutorials.description') }}</p>
    </header>

    <div v-if="loading" class="tutorials-index__loading">
      {{ t('common.loading') }}
    </div>

    <div v-else class="tutorials-index__grid">
      <article
        v-for="series in allSeries"
        :key="series.meta.key"
        class="series-card"
        :class="{ 'series-card--internal': series.meta.isInternal }"
        @click="handleSeriesClick(series)"
      >
        <div class="series-card__icon">
          {{ getSeriesIcon(series.meta.icon) }}
        </div>

        <div class="series-card__content">
          <div class="series-card__meta">
            <span class="series-card__category">
              {{ getCategoryLabel(series.meta.category) }}
            </span>
            <span v-if="series.meta.isInternal" class="series-card__lock">
              🔒 {{ t('tutorials.internal') }}
            </span>
          </div>

          <h2 class="series-card__title">{{ series.meta.title }}</h2>
          <p class="series-card__desc">{{ series.meta.description }}</p>

          <div class="series-card__footer">
            <span class="series-card__count">
              {{ series.tutorials.length }} {{ t('tutorials.lessons') }}
            </span>
            <div class="series-card__tags">
              <span
                v-for="tag in series.meta.tags.slice(0, 3)"
                :key="tag"
                class="series-card__tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div class="series-card__arrow">→</div>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.tutorials-index {
  max-width: $content-wide-width;
  margin: 0 auto;
  padding: $space-16 $space-6;
}

.tutorials-index__header {
  text-align: center;
  margin-bottom: $space-16;
}

.tutorials-index__title {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  color: $color-text;
  margin: 0 0 $space-4;
}

.tutorials-index__desc {
  font-size: $font-size-lg;
  color: $color-text-secondary;
  margin: 0;
}

.tutorials-index__loading {
  text-align: center;
  padding: $space-20 0;
  color: $color-text-secondary;
}

.tutorials-index__grid {
  display: flex;
  flex-direction: column;
  gap: $space-6;
}

.series-card {
  display: flex;
  align-items: center;
  gap: $space-6;
  padding: $space-8;
  background-color: $color-card;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-card-hover;
  }

  &--internal {
    border-left: 4px solid $color-warning;
  }
}

.series-card__icon {
  font-size: 3rem;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $gradient-subtle;
  border-radius: $radius-lg;
}

.series-card__content {
  flex: 1;
  min-width: 0;
}

.series-card__meta {
  display: flex;
  align-items: center;
  gap: $space-3;
  margin-bottom: $space-2;
}

.series-card__category {
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $color-primary;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.series-card__lock {
  font-size: $font-size-xs;
  color: $color-warning;
  font-weight: $font-weight-medium;
}

.series-card__title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text;
  margin: 0 0 $space-2;
}

.series-card__desc {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  line-height: $line-height-normal;
  margin: 0 0 $space-4;
}

.series-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $space-3;
}

.series-card__count {
  font-size: $font-size-sm;
  color: $color-text-muted;
}

.series-card__tags {
  display: flex;
  gap: $space-2;
}

.series-card__tag {
  padding: $space-1 $space-2;
  background-color: $color-bg;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

.series-card__arrow {
  font-size: $font-size-xl;
  color: $color-text-muted;
  flex-shrink: 0;
  transition: transform $transition-fast;

  .series-card:hover & {
    transform: translateX(4px);
    color: $color-primary;
  }
}

@media (max-width: $bp-md) {
  .tutorials-index {
    padding: $space-8 $space-4;
  }

  .tutorials-index__title {
    font-size: $font-size-2xl;
  }

  .series-card {
    flex-direction: column;
    align-items: flex-start;
    padding: $space-6;
  }

  .series-card__arrow {
    display: none;
  }

  .series-card__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
