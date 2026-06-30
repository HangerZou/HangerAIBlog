<script setup lang="ts">
/**
 * MarkdownRenderer - 通用 Markdown 渲染组件
 * 接收预渲染的 HTML 字符串，应用 markdown.scss 样式
 */

interface Props {
  /** 预渲染的 HTML 内容 */
  content: string
}

defineProps<Props>()
</script>

<template>
  <div class="markdown-body" v-html="content" />
</template>

<style lang="scss">
@use '@/assets/styles/markdown';
</style>
