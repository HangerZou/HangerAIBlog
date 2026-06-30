<script setup lang="ts">
/**
 * BlogPage - 博客列表页
 * 卡片网格布局，标签筛选，每张卡片展示标题、摘要、日期、标签
 */

import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

interface BlogPost {
  title: string
  summary: string
  date: string
  slug: string
  tags: string[]
}

const posts = computed<BlogPost[]>(() => {
  if (locale.value === 'zh') {
    return [
      {
        title: 'Claude Code 实用技巧分享',
        summary: '分享日常使用 Claude Code 过程中积累的实用技巧，帮你更快上手 AI 编程。',
        date: '2026-06-29',
        slug: '2026-06-29-claude-code-tips',
        tags: ['claude', '技巧', '经验分享'],
      },
      {
        title: 'AI 结对编程实践心得',
        summary: '记录与 Claude 协作开发的真实体验，探讨人机协作的最佳实践。',
        date: '2026-06-25',
        slug: '2026-06-25-ai-pair-programming',
        tags: ['claude', 'ai', '结对编程'],
      },
    ]
  }
  return [
    {
      title: 'Claude Code Practical Tips',
      summary: 'Practical tips accumulated from daily use of Claude Code to help you get started with AI programming faster.',
      date: '2026-06-29',
      slug: '2026-06-29-claude-code-tips',
      tags: ['claude', 'tips', 'experience'],
    },
    {
      title: 'AI Pair Programming Experience',
      summary: 'Real experience of collaborative development with Claude, exploring best practices for human-machine collaboration.',
      date: '2026-06-25',
      slug: '2026-06-25-ai-pair-programming',
      tags: ['claude', 'ai', 'pair-programming'],
    },
  ]
})

const allTags = computed(() => {
  const tagSet = new Set<string>()
  posts.value.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
})

const selectedTag = ref<string | null>(null)

const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts.value
  return posts.value.filter((post) => post.tags.includes(selectedTag.value!))
})

const toggleTag = (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? null : tag
}
</script>

<template>
  <div class="blog-page">
    <header class="blog-page__header">
      <h1 class="blog-page__title">{{ t('blog.title') }}</h1>
      <p class="blog-page__desc">{{ t('blog.description') }}</p>
    </header>

    <div class="blog-page__tags">
      <button
        class="blog-page__tag"
        :class="{ 'blog-page__tag--active': !selectedTag }"
        @click="selectedTag = null"
      >
        全部
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="blog-page__tag"
        :class="{ 'blog-page__tag--active': selectedTag === tag }"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <div class="blog-page__grid">
      <router-link
        v-for="post in filteredPosts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="blog-card"
      >
        <div class="blog-card__content">
          <h2 class="blog-card__title">{{ post.title }}</h2>
          <p class="blog-card__summary">{{ post.summary }}</p>
        </div>
        <div class="blog-card__meta">
          <div class="blog-card__tags">
            <span v-for="tag in post.tags" :key="tag" class="blog-card__tag">
              {{ tag }}
            </span>
          </div>
          <time class="blog-card__date">{{ post.date }}</time>
        </div>
      </router-link>
    </div>

    <p v-if="filteredPosts.length === 0" class="blog-page__empty">
      没有找到相关文章
    </p>
  </div>
</template>

<style scoped lang="scss">
.blog-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.blog-page__header {
  margin-bottom: 40px;
}

.blog-page__title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #3d2c1e;
  margin: 0 0 8px;
}

.blog-page__desc {
  font-size: 1.1rem;
  color: #8b7355;
  margin: 0;
}

.blog-page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.blog-page__tag {
  padding: 6px 16px;
  border: 1px solid #e8ded3;
  border-radius: 20px;
  background-color: #ffffff;
  color: #8b7355;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #e8722a;
    color: #e8722a;
  }

  &--active {
    background-color: #e8722a;
    border-color: #e8722a;
    color: #ffffff;
  }
}

.blog-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.blog-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(61, 44, 30, 0.06);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(232, 114, 42, 0.12),
                0 4px 8px rgba(61, 44, 30, 0.06);
  }
}

.blog-card__content {
  flex: 1;
  padding: 24px 24px 16px;
}

.blog-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #3d2c1e;
  margin: 0 0 12px;
  line-height: 1.4;
}

.blog-card__summary {
  font-size: 0.9rem;
  color: #8b7355;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__meta {
  padding: 16px 24px;
  border-top: 1px solid #e8ded3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.blog-card__tag {
  padding: 2px 8px;
  background-color: #fff8f0;
  border-radius: 4px;
  font-size: 12px;
  color: #e8722a;
}

.blog-card__date {
  font-size: 13px;
  color: #b3a08a;
}

.blog-page__empty {
  text-align: center;
  padding: 60px 0;
  font-size: 1.1rem;
  color: #8b7355;
}

@media (max-width: 1024px) {
  .blog-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .blog-page {
    padding: 24px 16px;
  }

  .blog-page__title {
    font-size: 2rem;
  }

  .blog-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>
