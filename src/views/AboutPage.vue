<script setup lang="ts">
/**
 * AboutPage - 关于页
 * 个人介绍（Hanger Zou）、技术栈展示、联系方式、暖色调卡片布局
 */

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface TechItem {
  name: string
  icon: string
  category: string
}

const techStack: TechItem[] = [
  { name: 'TypeScript', icon: '📘', category: '语言' },
  { name: 'Python', icon: '🐍', category: '语言' },
  { name: 'Java', icon: '☕', category: '语言' },
  { name: 'Vue 3', icon: '💚', category: '前端' },
  { name: 'React', icon: '⚛️', category: '前端' },
  { name: 'Element Plus', icon: '🎨', category: '前端' },
  { name: 'Node.js', icon: '🟩', category: '后端' },
  { name: 'Spring Boot', icon: '🍃', category: '后端' },
  { name: 'FastAPI', icon: '⚡', category: '后端' },
  { name: 'MySQL', icon: '🗄️', category: '数据库' },
  { name: 'Redis', icon: '🔴', category: '数据库' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
  { name: 'Git', icon: '📦', category: '工具' },
  { name: 'Claude Code', icon: '🧠', category: 'AI' },
]

interface ContactItem {
  label: string
  value: string
  icon: string
  link?: string
}

const contacts: ContactItem[] = [
  { label: 'GitHub', value: 'hangerzou', icon: '🐙', link: 'https://github.com/hangerzou' },
  { label: 'Email', value: 'hangerzou@example.com', icon: '📧', link: 'mailto:hangerzou@example.com' },
  { label: 'Blog', value: 'hangerzou.github.io/blog', icon: '📝', link: '/' },
]
</script>

<template>
  <div class="about-page">
    <header class="about-page__header">
      <div class="about-page__avatar">HZ</div>
      <h1 class="about-page__name">Hanger Zou</h1>
      <p class="about-page__bio">{{ t('about.intro') }}</p>
    </header>

    <section class="about-page__section">
      <h2 class="about-page__section-title">{{ t('about.skills') }}</h2>
      <div class="about-page__tech-grid">
        <div v-for="tech in techStack" :key="tech.name" class="tech-card">
          <span class="tech-card__icon">{{ tech.icon }}</span>
          <span class="tech-card__name">{{ tech.name }}</span>
          <span class="tech-card__category">{{ tech.category }}</span>
        </div>
      </div>
    </section>

    <section class="about-page__section">
      <h2 class="about-page__section-title">{{ t('about.contact') }}</h2>
      <div class="about-page__contact-grid">
        <a
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.link"
          class="contact-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="contact-card__icon">{{ contact.icon }}</span>
          <div class="contact-card__info">
            <span class="contact-card__label">{{ contact.label }}</span>
            <span class="contact-card__value">{{ contact.value }}</span>
          </div>
        </a>
      </div>
    </section>

    <section class="about-page__section">
      <div class="about-page__quote">
        <p>
          热爱编程与 AI 的开发者，致力于探索人机协作的无限可能。
          通过这个博客，分享 Claude 辅助编程的学习心得与实践经验。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
}

.about-page__header {
  text-align: center;
  margin-bottom: 48px;
}

.about-page__avatar {
  width: 96px;
  height: 96px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #e8722a, #f5a623);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(232, 114, 42, 0.3);
}

.about-page__name {
  font-size: 2.5rem;
  font-weight: 800;
  color: #3d2c1e;
  margin: 0 0 12px;
}

.about-page__bio {
  font-size: 1.1rem;
  color: #8b7355;
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.about-page__section {
  margin-bottom: 48px;
}

.about-page__section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3d2c1e;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8ded3;
}

.about-page__tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.tech-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 20px 12px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(61, 44, 30, 0.06);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(232, 114, 42, 0.12),
                0 4px 8px rgba(61, 44, 30, 0.06);
  }
}

.tech-card__icon {
  font-size: 2rem;
}

.tech-card__name {
  font-size: 14px;
  font-weight: 600;
  color: #3d2c1e;
}

.tech-card__category {
  font-size: 11px;
  color: #b3a08a;
  padding: 2px 8px;
  background-color: #fff8f0;
  border-radius: 4px;
}

.about-page__contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background-color: #ffffff;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(61, 44, 30, 0.06);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(232, 114, 42, 0.12),
                0 4px 8px rgba(61, 44, 30, 0.06);
  }
}

.contact-card__icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-card__label {
  font-size: 12px;
  color: #b3a08a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-card__value {
  font-size: 15px;
  font-weight: 600;
  color: #3d2c1e;
}

.about-page__quote {
  background: linear-gradient(135deg, #fff8f0, #fff0e0);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  border-left: 4px solid #e8722a;

  p {
    font-size: 1.1rem;
    color: #3d2c1e;
    line-height: 1.8;
    margin: 0;
    font-style: italic;
  }
}

@media (max-width: 640px) {
  .about-page {
    padding: 24px 16px;
  }

  .about-page__name {
    font-size: 2rem;
  }

  .about-page__tech-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .about-page__contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-page__tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
