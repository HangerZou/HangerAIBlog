<script setup lang="ts">
/**
 * SearchModal - 搜索弹窗
 * 支持搜索博客和教程内容
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

interface SearchItem {
  title: string
  description: string
  path: string
  tags: string[]
  type: 'blog' | 'tutorial'
}

const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// 搜索数据源
const searchItems: SearchItem[] = [
  // 博客
  {
    title: 'Claude Code 实用技巧分享',
    description: '用了一段时间 Claude Code，总结一些真正好用的技巧',
    path: '/blog/2026-06-29-claude-code-tips',
    tags: ['claude', '技巧', '经验分享'],
    type: 'blog',
  },
  {
    title: 'AI 结对编程实践心得',
    description: '记录与 Claude 协作开发的真实体验',
    path: '/blog/2026-06-25-ai-pair-programming',
    tags: ['claude', 'ai', '结对编程'],
    type: 'blog',
  },
  // 教程
  {
    title: '什么是 Claude？AI 编程助手入门介绍',
    description: '了解 Claude 是什么，以及它如何成为你的 AI 编程搭档',
    path: '/tutorials/claude/01-what-is-claude',
    tags: ['claude', 'ai', '入门', '教程'],
    type: 'tutorial',
  },
  {
    title: '第一个 AI 辅助项目',
    description: '手把手教你用 Claude Code 完成第一个项目',
    path: '/tutorials/claude/02-first-ai-project',
    tags: ['claude', '教程', '实战', '入门'],
    type: 'tutorial',
  },
  {
    title: 'Rules 指南：如何用 rules 规范 AI 行为',
    description: '学会使用 Claude Code 的 Rules 功能，让 AI 按照你的编码规范工作',
    path: '/tutorials/claude/03-rules-guide',
    tags: ['claude', 'rules', '规范', '教程'],
    type: 'tutorial',
  },
  {
    title: 'Skills 指南：如何用 skills 扩展 AI 能力',
    description: '了解 Claude Code 的 Skills 机制，学会自定义技能',
    path: '/tutorials/claude/04-skills-guide',
    tags: ['claude', 'skills', '扩展', '教程'],
    type: 'tutorial',
  },
  {
    title: '高效工作流：AI 辅助编程最佳实践',
    description: '掌握 AI 辅助编程的高效工作流',
    path: '/tutorials/claude/05-workflow-tips',
    tags: ['claude', '工作流', '最佳实践', '教程'],
    type: 'tutorial',
  },
  {
    title: '环境搭建与配置',
    description: 'Claude Code 的安装、配置和环境准备',
    path: '/tutorials/claude/06-environment-setup',
    tags: ['claude', '环境', '配置', '教程'],
    type: 'tutorial',
  },
  {
    title: 'CLAUDE.md 高级用法',
    description: '深入掌握 CLAUDE.md 的高级配置技巧',
    path: '/tutorials/claude/07-claude-md-advanced',
    tags: ['claude', 'claude.md', '高级', '教程'],
    type: 'tutorial',
  },
  {
    title: '常见问题与调试技巧',
    description: '解决 Claude Code 使用中的常见问题',
    path: '/tutorials/claude/08-troubleshooting',
    tags: ['claude', '问题', '调试', '教程'],
    type: 'tutorial',
  },
  {
    title: '实战案例：从零搭建博客',
    description: '用 Claude Code 从零搭建一个完整的博客项目',
    path: '/tutorials/claude/09-blog-project',
    tags: ['claude', '实战', '博客', '教程'],
    type: 'tutorial',
  },
  {
    title: '进阶技巧与性能优化',
    description: 'Claude Code 的进阶使用技巧和性能优化建议',
    path: '/tutorials/claude/10-advanced-tips',
    tags: ['claude', '进阶', '优化', '教程'],
    type: 'tutorial',
  },
]

// 搜索结果
const results = computed(() => {
  if (!query.value.trim()) return []
  const q = query.value.toLowerCase()
  return searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q))
  )
})

function open() {
  isOpen.value = true
  query.value = ''
  setTimeout(() => inputRef.value?.focus(), 100)
}

function close() {
  isOpen.value = false
  query.value = ''
}

function handleSelect(path: string) {
  router.push(path)
  close()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    open()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

defineExpose({ open })
</script>

<template>
  <!-- 搜索触发按钮 -->
  <button class="search-trigger" @click="open" aria-label="搜索">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  </button>

  <!-- 搜索弹窗 -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="search-overlay" @click.self="close">
        <div class="search-modal">
          <!-- 搜索输入框 -->
          <div class="search-modal__input-wrapper">
            <svg class="search-modal__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              class="search-modal__input"
              placeholder="搜索博客和教程..."
              @keydown.esc="close"
            />
            <kbd class="search-modal__kbd">ESC</kbd>
          </div>

          <!-- 搜索结果 -->
          <div class="search-modal__results">
            <div v-if="query && results.length === 0" class="search-modal__empty">
              没有找到相关内容
            </div>
            <button
              v-for="item in results"
              :key="item.path"
              class="search-modal__item"
              @click="handleSelect(item.path)"
            >
              <div class="search-modal__item-type">
                {{ item.type === 'blog' ? '博客' : '教程' }}
              </div>
              <div class="search-modal__item-content">
                <div class="search-modal__item-title">{{ item.title }}</div>
                <div class="search-modal__item-desc">{{ item.description }}</div>
              </div>
            </button>
            <div v-if="!query" class="search-modal__hint">
              输入关键词开始搜索
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.search-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: $radius-full;
  color: $color-text-secondary;
  transition: color $transition-fast, background-color $transition-fast;

  &:hover {
    color: $color-text;
    background-color: rgba($color-primary, 0.06);
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.search-overlay {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 120px;
}

.search-modal {
  width: 90%;
  max-width: 600px;
  background: $color-bg-elevated;
  border-radius: $radius-xl;
  box-shadow: $shadow-xl;
  overflow: hidden;

  &__input-wrapper {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-4 $space-5;
    border-bottom: 1px solid $color-border-light;
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: $color-text-muted;
    flex-shrink: 0;
  }

  &__input {
    flex: 1;
    border: none;
    outline: none;
    font-size: $font-size-base;
    color: $color-text;
    background: transparent;

    &::placeholder {
      color: $color-text-muted;
    }
  }

  &__kbd {
    padding: $space-1 $space-2;
    font-size: $font-size-xs;
    font-family: $font-mono;
    color: $color-text-muted;
    background: $color-bg;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
  }

  &__results {
    max-height: 400px;
    overflow-y: auto;
    padding: $space-2;
  }

  &__empty,
  &__hint {
    padding: $space-8 $space-4;
    text-align: center;
    color: $color-text-muted;
    font-size: $font-size-sm;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    width: 100%;
    padding: $space-3 $space-4;
    border: none;
    background: transparent;
    border-radius: $radius-md;
    cursor: pointer;
    text-align: left;
    transition: background-color $transition-fast;

    &:hover {
      background-color: rgba($color-primary, 0.06);
    }
  }

  &__item-type {
    flex-shrink: 0;
    padding: $space-1 $space-2;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-primary;
    background: rgba($color-primary, 0.08);
    border-radius: $radius-sm;
    margin-top: 2px;
  }

  &__item-content {
    flex: 1;
    min-width: 0;
  }

  &__item-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text;
    margin-bottom: $space-1;
  }

  &__item-desc {
    font-size: $font-size-xs;
    color: $color-text-secondary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-base;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
