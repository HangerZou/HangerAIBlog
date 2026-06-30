<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Feature {
  key: string
  icon: string
}

const features: Feature[] = [
  { key: 'claude', icon: '📘' },
  { key: 'rules', icon: '📐' },
  { key: 'skills', icon: '🧰' },
  { key: 'workflow', icon: '🚀' },
]
</script>

<template>
  <section class="features">
    <div class="features__container">
      <div class="features__grid">
        <article
          v-for="feature in features"
          :key="feature.key"
          class="feature-card"
        >
          <div class="feature-card__icon">{{ feature.icon }}</div>
          <h3 class="feature-card__title">
            {{ t(`features.${feature.key}.title`) }}
          </h3>
          <p class="feature-card__desc">
            {{ t(`features.${feature.key}.desc`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 80px 0;
  background-color: #FFF8F0;
}

.features__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  padding: 32px 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(61, 44, 30, 0.06);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px -4px rgba(61, 44, 30, 0.06);
}

.feature-card__icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.feature-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px;
}

.feature-card__desc {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 1024px) {
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .features {
    padding: 60px 0;
  }

  .features__grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 24px 20px;
  }
}
</style>
