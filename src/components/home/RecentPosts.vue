<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Post {
  title: string
  summary: string
  date: string
  slug: string
}

defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <section class="recent-posts">
    <div class="recent-posts__container">
      <div class="recent-posts__header">
        <h2 class="recent-posts__title">{{ t('blog.title') }}</h2>
        <router-link to="/blog" class="recent-posts__link">
          {{ t('blog.readMore') }} →
        </router-link>
      </div>
      <div class="recent-posts__grid">
        <router-link
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="post-card"
        >
          <div class="post-card__content">
            <h3 class="post-card__title">{{ post.title }}</h3>
            <p class="post-card__summary">{{ post.summary }}</p>
          </div>
          <time class="post-card__date">{{ post.date }}</time>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.recent-posts {
  padding: 80px 0;
  background-color: #ffffff;
}

.recent-posts__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.recent-posts__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.recent-posts__title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.recent-posts__link {
  font-size: 1rem;
  font-weight: 600;
  color: #E8722A;
  text-decoration: none;
  transition: color 0.2s;
}

.recent-posts__link:hover {
  color: #C45D1E;
}

.recent-posts__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.post-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: #FFF8F0;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px -4px rgba(232, 114, 42, 0.12);
}

.post-card__content {
  flex: 1;
}

.post-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px;
  line-height: 1.4;
}

.post-card__summary {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__date {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-top: 16px;
}

@media (max-width: 1024px) {
  .recent-posts__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .recent-posts {
    padding: 60px 0;
  }

  .recent-posts__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .recent-posts__grid {
    grid-template-columns: 1fr;
  }
}
</style>
