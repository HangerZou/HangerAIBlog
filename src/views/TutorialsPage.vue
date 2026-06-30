<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import AppSidebar from '@/components/sidebar/AppSidebar.vue'
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue'
import PasswordGate from '@/components/common/PasswordGate.vue'
import { renderMarkdown } from '@/utils/markdown'
import { loadTutorialSeries } from '@/utils/tutorialLoader'
import { useTutorialAuth } from '@/composables/useTutorialAuth'
import type { TutorialSeries } from '@/types/tutorial'

const { t, locale } = useI18n()
const route = useRoute()
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

const seriesKey = computed(() => route.params.seriesKey as string)
const currentSlug = computed(() => route.params.slug as string)

const currentSeries = computed(() =>
  allSeries.value.find((s) => s.meta.key === seriesKey.value)
)

const needsAuth = computed(() =>
  currentSeries.value?.meta.isInternal && !isAuthenticated(seriesKey.value)
)

const currentTutorial = computed(() =>
  currentSeries.value?.tutorials.find((t) => t.slug === currentSlug.value)
)

const currentIndex = computed(() =>
  currentSeries.value?.tutorials.findIndex((t) => t.slug === currentSlug.value) ?? -1
)

const prevTutorial = computed(() =>
  currentSeries.value && currentIndex.value > 0
    ? currentSeries.value.tutorials[currentIndex.value - 1]
    : null
)

const nextTutorial = computed(() =>
  currentSeries.value && currentIndex.value < currentSeries.value.tutorials.length - 1
    ? currentSeries.value.tutorials[currentIndex.value + 1]
    : null
)

const sidebarItems = computed(() =>
  currentSeries.value?.tutorials.map((t) => ({
    slug: t.slug,
    title: t.title,
  })) ?? []
)

function handleSelect(slug: string) {
  router.push(`/tutorials/${seriesKey.value}/${slug}`)
}

function handleAuthenticated() {
  // 认证通过后刷新状态
}
</script>

<template>
  <div class="tutorials-page">
    <PasswordGate
      v-if="needsAuth"
      :series-key="seriesKey"
      :password-hash="currentSeries?.meta.passwordHash ?? ''"
      @authenticated="handleAuthenticated"
    />

    <template v-else>
      <AppSidebar
        :items="sidebarItems"
        :current-slug="currentSlug"
        @select="handleSelect"
      />

      <main class="tutorials-page__content">
        <div v-if="loading" class="tutorials-page__loading">
          {{ t('common.loading') }}
        </div>

        <div v-else-if="currentTutorial" class="tutorials-page__article">
          <div class="tutorials-page__series-badge">
            {{ currentSeries?.meta.title }}
          </div>

          <MarkdownRenderer :content="renderMarkdown(currentTutorial.content)" />

          <nav class="tutorials-page__nav">
            <router-link
              v-if="prevTutorial"
              :to="`/tutorials/${seriesKey}/${prevTutorial.slug}`"
              class="tutorials-page__nav-link tutorials-page__nav-link--prev"
            >
              <span class="tutorials-page__nav-label">{{ t('tutorials.prev') }}</span>
              <span class="tutorials-page__nav-title">{{ prevTutorial.title }}</span>
            </router-link>
            <div v-else class="tutorials-page__nav-link tutorials-page__nav-link--placeholder" />

            <router-link
              v-if="nextTutorial"
              :to="`/tutorials/${seriesKey}/${nextTutorial.slug}`"
              class="tutorials-page__nav-link tutorials-page__nav-link--next"
            >
              <span class="tutorials-page__nav-label">{{ t('tutorials.next') }}</span>
              <span class="tutorials-page__nav-title">{{ nextTutorial.title }}</span>
            </router-link>
            <div v-else class="tutorials-page__nav-link tutorials-page__nav-link--placeholder" />
          </nav>
        </div>

        <div v-else class="tutorials-page__not-found">
          <p>{{ t('tutorials.notFound') }}</p>
          <router-link to="/tutorials">{{ t('tutorials.backToList') }}</router-link>
        </div>
      </main>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.tutorials-page {
  display: flex;
  min-height: 100vh;
}

.tutorials-page__content {
  flex: 1;
  padding: $space-10;
  max-width: $content-max-width;
  margin: 0 auto;
}

.tutorials-page__loading {
  text-align: center;
  padding: $space-20 0;
  color: $color-text-secondary;
}

.tutorials-page__article {
  background-color: $color-card;
  border-radius: $radius-xl;
  padding: $space-10;
  box-shadow: $shadow-card;
}

.tutorials-page__series-badge {
  display: inline-block;
  padding: $space-1 $space-3;
  background: $gradient-primary;
  color: $color-text-inverse;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  border-radius: $radius-full;
  margin-bottom: $space-6;
}

.tutorials-page__nav {
  display: flex;
  justify-content: space-between;
  gap: $space-4;
  margin-top: $space-12;
  padding-top: $space-6;
  border-top: 1px solid $color-divider;
}

.tutorials-page__nav-link {
  display: flex;
  flex-direction: column;
  gap: $space-1;
  padding: $space-4 $space-5;
  background-color: $color-bg;
  border-radius: $radius-lg;
  text-decoration: none;
  transition: all $transition-base;
  flex: 1;
  max-width: 50%;

  &:hover {
    background-color: rgba($color-primary, 0.06);
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }

  &--next {
    text-align: right;
  }

  &--placeholder {
    flex: 1;
    max-width: 50%;
    visibility: hidden;
  }
}

.tutorials-page__nav-label {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tutorials-page__nav-title {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text;
}

.tutorials-page__not-found {
  text-align: center;
  padding: $space-20 0;
  background-color: $color-card;
  border-radius: $radius-xl;

  p {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    margin-bottom: $space-4;
  }

  a {
    color: $color-primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: $bp-md) {
  .tutorials-page {
    flex-direction: column;
  }

  .tutorials-page__content {
    padding: $space-4;
  }

  .tutorials-page__article {
    padding: $space-5;
  }

  .tutorials-page__nav {
    flex-direction: column;
  }

  .tutorials-page__nav-link {
    max-width: 100%;
  }
}
</style>
