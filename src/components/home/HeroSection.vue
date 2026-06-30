<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <h1 class="hero__title">{{ t('hero.title') }}</h1>
        <p class="hero__subtitle">{{ t('hero.subtitle') }}</p>
        <router-link to="/tutorials" class="hero__cta">
          {{ t('hero.cta') }}
        </router-link>
      </div>
      <div class="hero__decoration">
        <div class="hero__circle hero__circle--1"></div>
        <div class="hero__circle hero__circle--2"></div>
        <div class="hero__circle hero__circle--3"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, #E8722A 0%, #F5A623 100%);
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.hero__content {
  max-width: 600px;
}

.hero__title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  margin: 0 0 16px;
}

.hero__subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 32px;
  line-height: 1.6;
}

.hero__cta {
  display: inline-block;
  padding: 14px 32px;
  background-color: #ffffff;
  color: #E8722A;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hero__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.hero__decoration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  pointer-events: none;
}

.hero__circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

.hero__circle--1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  background-color: #ffffff;
}

.hero__circle--2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: 100px;
  background-color: #ffffff;
}

.hero__circle--3 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 200px;
  background-color: #ffffff;
}

@media (max-width: 768px) {
  .hero {
    padding: 80px 0 60px;
  }

  .hero__title {
    font-size: 2.5rem;
  }

  .hero__subtitle {
    font-size: 1.1rem;
  }

  .hero__decoration {
    width: 100%;
    opacity: 0.5;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 2rem;
  }

  .hero__cta {
    display: block;
    text-align: center;
  }
}
</style>
