<script setup lang="ts">
/**
 * AppSidebar - 教程侧边栏
 * 接收教程列表 prop、当前高亮、完成进度、移动端可折叠
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export interface TutorialItem {
  slug: string
  title: string
  completed?: boolean
}

const props = defineProps<{
  tutorials: TutorialItem[]
  currentSlug: string
}>()

const { t } = useI18n()

const isCollapsed = ref(false)

const completedCount = computed(() =>
  props.tutorials.filter((item) => item.completed).length,
)

const progressPercent = computed(() => {
  if (props.tutorials.length === 0) return 0
  return Math.round((completedCount.value / props.tutorials.length) * 100)
})

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': isCollapsed }">
    <!-- Mobile Toggle -->
    <button
      class="app-sidebar__toggle"
      :aria-expanded="!isCollapsed"
      @click="toggleCollapse"
    >
      <span class="app-sidebar__toggle-text">
        {{ t('tutorials.tableOfContents') }}
      </span>
      <svg
        class="app-sidebar__toggle-icon"
        :class="{ 'app-sidebar__toggle-icon--collapsed': isCollapsed }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Sidebar Content -->
    <Transition name="collapse">
      <div v-show="!isCollapsed" class="app-sidebar__content">
        <!-- Progress -->
        <div class="app-sidebar__progress">
          <div class="app-sidebar__progress-header">
            <span class="app-sidebar__progress-label">
              {{ t('sidebar.progress') }}
            </span>
            <span class="app-sidebar__progress-count">
              {{ completedCount }}/{{ tutorials.length }}
            </span>
          </div>
          <div class="app-sidebar__progress-bar">
            <div
              class="app-sidebar__progress-fill"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
          <span class="app-sidebar__progress-percent">
            {{ progressPercent }}%
          </span>
        </div>

        <!-- Tutorial List -->
        <nav class="app-sidebar__nav" aria-label="Tutorial navigation">
          <ul class="app-sidebar__list">
            <li
              v-for="item in tutorials"
              :key="item.slug"
              class="app-sidebar__item"
            >
              <router-link
                :to="`/tutorials/${item.slug}`"
                class="app-sidebar__link"
                :class="{
                  'app-sidebar__link--active': item.slug === currentSlug,
                  'app-sidebar__link--completed': item.completed,
                }"
              >
                <span class="app-sidebar__status">
                  <svg
                    v-if="item.completed"
                    class="app-sidebar__check"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span v-else class="app-sidebar__dot" />
                </span>
                <span class="app-sidebar__link-text">{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>
  </aside>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.app-sidebar {
  width: 260px;
  flex-shrink: 0;

  @media (max-width: $bp-md) {
    width: 100%;
  }

  // ---------- Toggle (Mobile) ----------
  &__toggle {
    display: none;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: $space-3 $space-4;
    background: $color-card;
    border: 1px solid $color-border-light;
    border-radius: $radius-md;
    cursor: pointer;
    transition: background-color $transition-fast;

    &:hover {
      background-color: rgba($color-primary, 0.04);
    }

    @media (max-width: $bp-md) {
      display: flex;
    }
  }

  &__toggle-text {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__toggle-icon {
    width: 16px;
    height: 16px;
    color: $color-text-muted;
    transition: transform $transition-base;

    &--collapsed {
      transform: rotate(-90deg);
    }
  }

  // ---------- Content ----------
  &__content {
    @media (max-width: $bp-md) {
      margin-top: $space-2;
    }
  }

  // ---------- Progress ----------
  &__progress {
    padding: $space-4;
    background: $color-card;
    border: 1px solid $color-border-light;
    border-radius: $radius-lg;
    margin-bottom: $space-4;
  }

  &__progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-2;
  }

  &__progress-label {
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__progress-count {
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text;
  }

  &__progress-bar {
    height: 4px;
    background: $color-border-light;
    border-radius: $radius-full;
    overflow: hidden;
    margin-bottom: $space-1;
  }

  &__progress-fill {
    height: 100%;
    background: $gradient-primary;
    border-radius: $radius-full;
    transition: width $transition-slow;
  }

  &__progress-percent {
    display: block;
    text-align: right;
    font-size: $font-size-xs;
    color: $color-text-muted;
  }

  // ---------- Nav List ----------
  &__nav {
    background: $color-card;
    border: 1px solid $color-border-light;
    border-radius: $radius-lg;
    overflow: hidden;
  }

  &__list {
    padding: $space-2;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: $space-1;
    }
  }

  // ---------- Links ----------
  &__link {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    padding: $space-2 $space-3;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    text-decoration: none;
    border-radius: $radius-md;
    transition: color $transition-fast, background-color $transition-fast;

    &:hover {
      color: $color-text;
      background-color: rgba($color-primary, 0.04);
    }

    &--active {
      color: $color-primary;
      background-color: rgba($color-primary, 0.08);
      font-weight: $font-weight-semibold;
    }

    &--completed {
      color: $color-text-muted;
    }

    &--completed#{&}--active {
      color: $color-primary;
    }
  }

  &__link-text {
    line-height: $line-height-tight;
    padding-top: 1px;
  }

  // ---------- Status Icons ----------
  &__status {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    margin-top: 1px;
  }

  &__check {
    width: 14px;
    height: 14px;
    color: $color-success;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: $radius-full;
    border: 1.5px solid $color-border;
    background: transparent;
  }

  &__link--active &__dot {
    border-color: $color-primary;
    background: $color-primary;
  }
}

// ---------- Collapse Transition ----------
.collapse-enter-active,
.collapse-leave-active {
  transition: opacity $transition-base, max-height $transition-base;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  opacity: 1;
  max-height: 600px;
}
</style>
