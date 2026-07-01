<script setup lang="ts">
/**
 * AppHeader - 顶部导航栏
 * 固定顶部、毛玻璃效果、移动端汉堡菜单
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import logoImg from '@/assets/img/avatar.png'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import SearchModal from '@/components/common/SearchModal.vue'

const { t } = useI18n()
const route = useRoute()

interface NavItem {
  key: string
  path: string
}

const navItems: NavItem[] = [
  { key: 'home', path: '/' },
  { key: 'tutorials', path: '/tutorials' },
  { key: 'blog', path: '/blog' },
  { key: 'about', path: '/about' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

const headerClass = computed(() => ({
  'app-header--scrolled': isScrolled.value,
  'app-header--menu-open': isMobileMenuOpen.value,
}))

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="app-header" :class="headerClass">
    <div class="app-header__inner container">
      <!-- Logo -->
      <router-link to="/" class="app-header__logo" @click="closeMobileMenu">
        <img :src="logoImg" alt="Logo" class="app-header__logo-icon" />
        <span class="app-header__logo-text">HZ Blog</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="app-header__nav" aria-label="Main navigation">
        <router-link
          v-for="item in navItems"
          :key="item.key"
          :to="item.path"
          class="app-header__link"
          :class="{ 'app-header__link--active': isActive(item.path) }"
          @click="closeMobileMenu"
        >
          {{ t(`nav.${item.key}`) }}
        </router-link>
      </nav>

      <!-- Right Section -->
      <div class="app-header__actions">
        <SearchModal />
        <a
          href="https://github.com/hangerzou"
          class="app-header__github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
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
        <LanguageSwitcher />

        <!-- Mobile Menu Toggle -->
        <button
          class="app-header__hamburger"
          :class="{ 'app-header__hamburger--open': isMobileMenuOpen }"
          :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <span class="app-header__hamburger-line" />
          <span class="app-header__hamburger-line" />
          <span class="app-header__hamburger-line" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="app-header__mobile-menu">
        <nav class="app-header__mobile-nav" aria-label="Mobile navigation">
          <router-link
            v-for="item in navItems"
            :key="item.key"
            :to="item.path"
            class="app-header__mobile-link"
            :class="{ 'app-header__mobile-link--active': isActive(item.path) }"
            @click="closeMobileMenu"
          >
            {{ t(`nav.${item.key}`) }}
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

$header-height: 64px;

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-sticky;
  height: $header-height;
  background: rgba($color-bg, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: background $transition-base, border-color $transition-base,
              box-shadow $transition-base;

  &--scrolled {
    background: rgba($color-bg, 0.92);
    border-bottom-color: $color-border-light;
    box-shadow: $shadow-sm;
  }

  &--menu-open {
    background: rgba($color-bg, 0.98);
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: $space-6;
  }

  // ---------- Logo ----------
  &__logo {
    display: flex;
    align-items: center;
    gap: $space-2;
    text-decoration: none;
    flex-shrink: 0;
  }

  &__logo-icon {
    width: 32px;
    height: 32px;
    border-radius: $radius-md;
    object-fit: cover;
  }

  &__logo-text {
    font-family: $font-mono;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $color-text;
    letter-spacing: -0.5px;
  }

  // ---------- Desktop Nav ----------
  &__nav {
    display: flex;
    align-items: center;
    gap: $space-1;

    @media (max-width: $bp-md) {
      display: none;
    }
  }

  &__link {
    position: relative;
    padding: $space-2 $space-3;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    text-decoration: none;
    border-radius: $radius-md;
    transition: color $transition-fast, background-color $transition-fast;

    &:hover {
      color: $color-text;
      background-color: rgba($color-primary, 0.06);
    }

    &--active {
      color: $color-primary;
      font-weight: $font-weight-semibold;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        background: $gradient-primary;
        border-radius: $radius-full;
      }
    }
  }

  // ---------- Actions ----------
  &__actions {
    display: flex;
    align-items: center;
    gap: $space-3;
    flex-shrink: 0;
  }

  // ---------- GitHub ----------
  &__github {
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

  // ---------- Hamburger ----------
  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 36px;
    height: 36px;
    padding: $space-2;
    border-radius: $radius-md;
    background: transparent;
    cursor: pointer;
    transition: background-color $transition-fast;

    &:hover {
      background-color: rgba($color-primary, 0.06);
    }

    @media (max-width: $bp-md) {
      display: flex;
    }
  }

  &__hamburger-line {
    display: block;
    width: 18px;
    height: 2px;
    background-color: $color-text;
    border-radius: $radius-full;
    transition: transform $transition-base, opacity $transition-fast;
  }

  &__hamburger--open &__hamburger-line {
    &:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  // ---------- Mobile Menu ----------
  &__mobile-menu {
    position: absolute;
    top: $header-height;
    left: 0;
    right: 0;
    background: rgba($color-bg, 0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid $color-border-light;
    box-shadow: $shadow-md;
    padding: $space-4 0;

    @media (min-width: calc($bp-md + 1px)) {
      display: none;
    }
  }

  &__mobile-nav {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    padding: 0 $space-4;
  }

  &__mobile-link {
    display: block;
    padding: $space-3 $space-4;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    text-decoration: none;
    border-radius: $radius-md;
    transition: color $transition-fast, background-color $transition-fast;

    &:hover {
      color: $color-text;
      background-color: rgba($color-primary, 0.06);
    }

    &--active {
      color: $color-primary;
      background-color: rgba($color-primary, 0.08);
      font-weight: $font-weight-semibold;
    }
  }
}

// ---------- Transition ----------
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity $transition-base, transform $transition-base;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
