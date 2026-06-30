<script setup lang="ts">
/**
 * LanguageSwitcher - 中/EN 语言切换器
 * 切换 vue-i18n locale 并同步更新 URL
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()

const isZh = computed(() => locale.value === 'zh')

function toggleLocale() {
  const next = isZh.value ? 'en' : 'zh'
  locale.value = next

  // 同步更新 URL 中的语言前缀
  const path = route.path
  const hasLangPrefix = /^\/(zh|en)(\/|$)/.test(path)

  let newPath: string
  if (hasLangPrefix) {
    newPath = path.replace(/^\/(zh|en)/, `/${next}`)
  } else {
    newPath = `/${next}${path}`
  }

  router.replace(newPath)
}
</script>

<template>
  <button
    class="lang-switcher"
    :aria-label="isZh ? 'Switch to English' : '切换到中文'"
    @click="toggleLocale"
  >
    <span :class="{ active: isZh }">中</span>
    <span class="divider">/</span>
    <span :class="{ active: !isZh }">EN</span>
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.lang-switcher {
  display: inline-flex;
  align-items: center;
  gap: $space-1;
  padding: $space-1 $space-2;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: transparent;
  font-family: $font-sans;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-muted;
  cursor: pointer;
  transition: border-color $transition-fast, color $transition-fast;

  &:hover {
    border-color: $color-primary;
    color: $color-text;
  }

  .active {
    color: $color-primary;
    font-weight: $font-weight-semibold;
  }

  .divider {
    color: $color-border;
    user-select: none;
  }
}
</style>
