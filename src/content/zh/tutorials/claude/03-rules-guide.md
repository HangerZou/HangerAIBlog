---
title: "Rules 指南：如何用 rules 规范 AI 行为"
description: "学会使用 Claude Code 的 Rules 功能，让 AI 按照你的编码规范和项目标准来工作。"
date: 2026-06-29
tags: ["claude", "rules", "规范", "教程"]
---

# Rules 指南

Rules 是 Claude Code 的核心功能之一，它让你可以定义 AI 的行为规范，确保生成的代码符合你的标准。

## 什么是 Rules？

Rules 就是给 Claude 的"规矩"。你告诉它：

- 用什么编码风格
- 遵循什么框架规范
- 哪些做法要避免

## 创建 CLAUDE.md

在项目根目录创建 `CLAUDE.md` 文件，这是 Claude Code 默认读取的规则文件：

```markdown
# 项目规范

## 代码风格
- 使用 2 空格缩进
- 优先使用 const，需要重新赋值才用 let
- 禁止使用 var

## 命名规范
- 组件文件用 PascalCase：`UserProfile.vue`
- 工具函数用 camelCase：`formatDate.ts`
- 常量用 UPPER_SNAKE_CASE：`MAX_RETRY_COUNT`
```

> **提示**：`CLAUDE.md` 支持 Markdown 格式，用标题和列表来组织规则，Claude 会更好地理解。

## 规则的实际效果

设好规则后，当你让 Claude 写代码时：

```
// 你说：帮我写一个用户信息组件
// Claude 会自动：
// 1. 文件命名为 UserProfile.vue
// 2. 使用 2 空格缩进
// 3. 用 const 声明变量
```

## 全局规则 vs 项目规则

| 类型 | 位置 | 作用范围 |
|------|------|---------|
| 全局规则 | `~/.claude/rules/` | 所有项目 |
| 项目规则 | 项目根目录 `CLAUDE.md` | 当前项目 |

你可以在全局规则里放通用规范（如安全规则），在项目规则里放项目特有的要求。

## 常用规则示例

**安全规则**：
```markdown
- 绝对不能硬编码密钥或密码
- 用户输入必须做校验
- SQL 查询必须用参数化
```

**Vue 项目规则**：
```markdown
- 统一使用 Composition API
- 组件不超过 300 行
- Props 用基于类型的声明
```

> **注意**：规则不要写得太细太死，给 Claude 一定的灵活性，效果反而更好。

## 小结

好的 Rules 能让 Claude 生成的代码风格一致、质量更高。建议从简单的规则开始，逐步完善。
