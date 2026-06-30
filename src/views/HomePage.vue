<script setup lang="ts">
/**
 * HomePage - 首页
 * 组合 HeroSection + FeatureCards + RecentPosts
 */

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HeroSection from '@/components/home/HeroSection.vue'
import FeatureCards from '@/components/home/FeatureCards.vue'
import RecentPosts from '@/components/home/RecentPosts.vue'

const { t, locale } = useI18n()

interface BlogPost {
  title: string
  summary: string
  date: string
  slug: string
}

const recentPosts = computed<BlogPost[]>(() => {
  if (locale.value === 'zh') {
    return [
      {
        title: 'Claude Code 实用技巧分享',
        summary: '分享日常使用 Claude Code 过程中积累的实用技巧，帮你更快上手 AI 编程。',
        date: '2026-06-29',
        slug: '2026-06-29-claude-code-tips',
      },
      {
        title: 'AI 结对编程实践心得',
        summary: '记录与 Claude 协作开发的真实体验，探讨人机协作的最佳实践。',
        date: '2026-06-25',
        slug: '2026-06-25-ai-pair-programming',
      },
    ]
  }
  return [
    {
      title: 'Claude Code Practical Tips',
      summary: 'Practical tips accumulated from daily use of Claude Code to help you get started with AI programming faster.',
      date: '2026-06-29',
      slug: '2026-06-29-claude-code-tips',
    },
    {
      title: 'AI Pair Programming Experience',
      summary: 'Real experience of collaborative development with Claude, exploring best practices for human-machine collaboration.',
      date: '2026-06-25',
      slug: '2026-06-25-ai-pair-programming',
    },
  ]
})
</script>

<template>
  <div class="home-page">
    <HeroSection />
    <FeatureCards />
    <RecentPosts :posts="recentPosts" />
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
