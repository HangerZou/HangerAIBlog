<script setup lang="ts">
/**
 * BlogDetail - 博客详情页
 * Markdown 渲染 + 返回列表按钮
 */

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue'
import { renderMarkdown } from '@/utils/markdown'

const { locale } = useI18n()
const route = useRoute()

interface BlogEntry {
  slug: string
  title: string
  date: string
  tags: string[]
  content: string
}

const blogData = computed<Record<string, BlogEntry>>(() => {
  if (locale.value === 'zh') {
    return {
      '2026-06-29-claude-code-tips': {
        slug: '2026-06-29-claude-code-tips',
        title: 'Claude Code 实用技巧分享',
        date: '2026-06-29',
        tags: ['claude', '技巧', '经验分享'],
        content: `# Claude Code 实用技巧分享

用了一段时间 Claude Code，总结一些真正好用的技巧。

## 1. 快速启动

不用每次都打完整命令，设置个 alias：

\`\`\`bash
alias cc="claude"
\`\`\`

以后直接 \`cc\` 就能启动。

## 2. 善用上下文

把相关文件添加到上下文中，Claude 能更好地理解你的项目：

\`\`\`bash
claude add src/api/user.ts
claude add src/types/user.ts
\`\`\`

## 3. 分步骤来

不要一次性让 Claude 做太多事。复杂功能拆分成小任务：

1. 先创建数据模型
2. 再写 API 接口
3. 最后做前端展示

## 4. 及时反馈

Claude 写的代码不满意？直接说哪里不好，它会改进。

> 这个函数太长了，帮我拆分成几个小函数

## 5. 利用规则

在 \`.claude/rules/\` 下配置项目规范，Claude 会自动遵循：

\`\`\`markdown
# 编码规范
- 使用 TypeScript 严格模式
- 组件用 PascalCase 命名
- 函数不超过 50 行
\`\`\`

## 总结

Claude Code 是个强大的工具，关键是要学会怎么和它"对话"。越具体、越清晰的指令，得到的结果越好。`,
      },
      '2026-06-25-ai-pair-programming': {
        slug: '2026-06-25-ai-pair-programming',
        title: 'AI 结对编程实践心得',
        date: '2026-06-25',
        tags: ['claude', 'ai', '结对编程'],
        content: `# AI 结对编程实践心得

记录与 Claude 协作开发的真实体验。

## 背景

最近用 Claude Code 做了一个完整的项目，从零到部署。这篇博客记录整个过程中的心得。

## 开始之前

传统结对编程需要两个人坐在一起，一个写代码，一个审查。AI 结对编程把这个模式变了：

- **你**：负责需求分析、方案决策、代码审查
- **Claude**：负责写代码、跑测试、生成文档

## 实际体验

### 优点

1. **效率提升明显**：很多重复性工作 Claude 秒完成
2. **代码质量稳定**：Claude 生成的代码风格统一
3. **学习成本低**：不用教 Claude 语法，直接说需求

### 注意事项

1. **不要盲目信任**：Claude 写的代码也要审查
2. **保持上下文**：复杂功能要分步骤，保持清晰的上下文
3. **及时保存**：重要节点 git commit，方便回退

## 一个真实案例

我用 Claude Code 搭建这个博客：

\`\`\`
# 初始化项目
claude "帮我创建一个 Vue 3 + TypeScript 的博客项目"

# 添加功能
claude "添加 Markdown 渲染和教程页面"

# 部署
claude "配置 GitHub Pages 自动部署"
\`\`\`

整个过程不到一天，传统方式可能要一周。

## 总结

AI 结对编程不是替代程序员，而是增强程序员的能力。关键是找到人机协作的最佳平衡点。`,
      },
    }
  }
  return {
    '2026-06-29-claude-code-tips': {
      slug: '2026-06-29-claude-code-tips',
      title: 'Claude Code Practical Tips',
      date: '2026-06-29',
      tags: ['claude', 'tips', 'experience'],
      content: `# Claude Code Practical Tips

Tips accumulated from daily use of Claude Code.

## 1. Quick Launch

Set up an alias:

\`\`\`bash
alias cc="claude"
\`\`\`

## 2. Use Context Well

Add relevant files to context:

\`\`\`bash
claude add src/api/user.ts
claude add src/types/user.ts
\`\`\`

## 3. Work in Steps

Break complex features into small tasks.

## 4. Give Feedback

If code isn't right, tell Claude directly.

## 5. Use Rules

Configure project standards in \`.claude/rules/\`.

## Summary

Claude Code is a powerful tool. The key is learning how to "talk" to it.`,
    },
    '2026-06-25-ai-pair-programming': {
      slug: '2026-06-25-ai-pair-programming',
      title: 'AI Pair Programming Experience',
      date: '2026-06-25',
      tags: ['claude', 'ai', 'pair-programming'],
      content: `# AI Pair Programming Experience

Real experience of collaborative development with Claude.

## Background

I built a complete project with Claude Code from scratch to deployment.

## Before Starting

Traditional pair programming requires two people. AI pair programming changes this:

- **You**: Requirements analysis, design decisions, code review
- **Claude**: Writing code, running tests, generating docs

## Real Experience

### Pros

1. **Obvious efficiency boost**: Repetitive work done in seconds
2. **Consistent code quality**: Claude generates uniform style
3. **Low learning cost**: Just describe what you need

### Things to Watch

1. **Don't trust blindly**: Review Claude's code
2. **Maintain context**: Break complex features into steps
3. **Save often**: Git commit at important milestones

## Summary

AI pair programming enhances developer capabilities rather than replacing them.`,
    },
  }
})

const slug = computed(() => route.params.slug as string)

const post = computed(() => blogData.value[slug.value])
</script>

<template>
  <div class="blog-detail">
    <div class="blog-detail__container">
      <router-link to="/blog" class="blog-detail__back">
        ← 返回列表
      </router-link>

      <article v-if="post" class="blog-detail__article">
        <header class="blog-detail__header">
          <h1 class="blog-detail__title">{{ post.title }}</h1>
          <div class="blog-detail__meta">
            <time class="blog-detail__date">{{ post.date }}</time>
            <div class="blog-detail__tags">
              <span v-for="tag in post.tags" :key="tag" class="blog-detail__tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </header>

        <MarkdownRenderer :content="renderMarkdown(post.content)" />
      </article>

      <div v-else class="blog-detail__not-found">
        <p>文章不存在</p>
        <router-link to="/blog">返回博客列表</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
}

.blog-detail__back {
  display: inline-block;
  padding: 8px 16px;
  margin-bottom: 24px;
  color: #e8722a;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: #fff8f0;
    color: #c45d1e;
  }
}

.blog-detail__article {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(61, 44, 30, 0.06);
}

.blog-detail__header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e8ded3;
}

.blog-detail__title {
  font-size: 2rem;
  font-weight: 800;
  color: #3d2c1e;
  margin: 0 0 16px;
  line-height: 1.3;
}

.blog-detail__meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.blog-detail__date {
  font-size: 14px;
  color: #b3a08a;
}

.blog-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.blog-detail__tag {
  padding: 2px 10px;
  background-color: #fff8f0;
  border-radius: 4px;
  font-size: 12px;
  color: #e8722a;
}

.blog-detail__not-found {
  text-align: center;
  padding: 80px 0;
  background-color: #ffffff;
  border-radius: 12px;

  p {
    font-size: 1.2rem;
    color: #8b7355;
    margin-bottom: 16px;
  }

  a {
    color: #e8722a;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 640px) {
  .blog-detail {
    padding: 16px;
  }

  .blog-detail__article {
    padding: 20px;
  }

  .blog-detail__title {
    font-size: 1.5rem;
  }

  .blog-detail__meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
