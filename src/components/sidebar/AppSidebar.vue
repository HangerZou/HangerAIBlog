<script setup lang="ts">
/**
 * AppSidebar - 教程目录侧边栏
 * 支持移动端折叠，高亮当前项
 */

interface SidebarItem {
  slug: string
  title: string
}

defineProps<{
  items: SidebarItem[]
  currentSlug: string
}>()

defineEmits<{
  select: [slug: string]
}>()

const collapsed = ref(false)

const toggle = () => {
  collapsed.value = !collapsed.value
}

import { ref } from 'vue'
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
    <button class="sidebar__toggle" @click="toggle">
      <span class="sidebar__toggle-icon">{{ collapsed ? '☰' : '✕' }}</span>
      <span class="sidebar__toggle-text">
        {{ collapsed ? '展开目录' : '收起目录' }}
      </span>
    </button>

    <nav v-show="!collapsed" class="sidebar__nav">
      <ul class="sidebar__list">
        <li
          v-for="item in items"
          :key="item.slug"
          class="sidebar__item"
          :class="{ 'sidebar__item--active': item.slug === currentSlug }"
          @click="$emit('select', item.slug)"
        >
          {{ item.title }}
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-right: 1px solid #e8ded3;
  padding: 24px 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.3s ease;
}

.sidebar--collapsed {
  width: 48px;
}

.sidebar__toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #8b7355;
  transition: color 0.2s;

  &:hover {
    color: #e8722a;
  }
}

.sidebar__toggle-icon {
  font-size: 18px;
}

.sidebar__nav {
  margin-top: 16px;
}

.sidebar__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__item {
  padding: 10px 24px;
  font-size: 14px;
  color: #3d2c1e;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;

  &:hover {
    background-color: #fff8f0;
    color: #e8722a;
  }

  &--active {
    background-color: #fff0e0;
    color: #e8722a;
    font-weight: 600;
    border-left-color: #e8722a;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #e8ded3;
  }

  .sidebar--collapsed {
    width: 100%;
  }
}
</style>
