<script setup lang="ts">
/**
 * AppFooter - 页脚
 * 版权信息、社交链接、简洁暖色调
 */
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface SocialLink {
  name: string
  url: string
  icon: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/hangerzou',
    icon: 'github',
  },
]
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__inner container">
      <!-- Social Links -->
      <div class="app-footer__social">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          class="app-footer__social-link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="link.name"
        >
          <svg
            v-if="link.icon === 'github'"
            class="app-footer__social-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205
              11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555
              -3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02
              -.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305
              3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925
              0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315
              3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56
              3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905
              1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81
              2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02
              0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
        </a>
      </div>

      <!-- Info -->
      <div class="app-footer__info">
        <p class="app-footer__copyright">{{ t('footer.copyright') }}</p>
        <p class="app-footer__built-with">{{ t('footer.builtWith') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.app-footer {
  margin-top: auto;
  padding: $space-10 0;
  border-top: 1px solid $color-border-light;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
  }

  // ---------- Social ----------
  &__social {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: $radius-full;
    color: $color-text-muted;
    transition: color $transition-fast, background-color $transition-fast;

    &:hover {
      color: $color-primary;
      background-color: rgba($color-primary, 0.08);
    }
  }

  &__social-icon {
    width: 20px;
    height: 20px;
  }

  // ---------- Info ----------
  &__info {
    text-align: center;
  }

  &__copyright {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $space-1;
  }

  &__built-with {
    font-size: $font-size-xs;
    color: $color-text-muted;
    margin-bottom: 0;
  }
}
</style>
