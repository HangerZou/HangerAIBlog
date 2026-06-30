<script setup lang="ts">
/**
 * AppFooter - 页脚
 * 版权信息、备案号
 */
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__inner container">
      <!-- Info -->
      <div class="app-footer__info">
        <p class="app-footer__copyright">{{ t('footer.copyright') }}</p>
        <p class="app-footer__built-with">{{ t('footer.builtWith') }}</p>
        <p class="app-footer__icp">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
            辽ICP备2021013083号
          </a>
        </p>
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
    margin-bottom: $space-1;
  }

  &__icp {
    font-size: $font-size-xs;
    color: $color-text-muted;
    margin-bottom: 0;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: $color-primary;
      }
    }
  }
}
</style>
