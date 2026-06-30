---
title: "Skills 指南：如何用 skills 扩展 AI 能力"
description: "了解 Claude Code 的 Skills 机制，学会自定义技能来扩展 AI 的能力边界。"
date: 2026-06-29
tags: ["claude", "skills", "扩展", "教程"]
---

# Skills 指南

Skills 是 Claude Code 的可复用能力模块。你可以把常用的操作封装成 Skill，一键调用。

## 什么是 Skills？

简单来说，Skill 就是一段预定义的指令。比如：

- 部署项目到服务器
- 生成数据库迁移文件
- 创建标准化的组件模板

## 使用内置 Skills

Claude Code 自带了一些常用技能，直接用斜杠命令调用：

```
/deploy        # 部署项目
/test          # 运行测试
/review        # 代码审查
```

> **提示**：输入 `/` 就能看到所有可用的 Skills 列表。

## 创建自定义 Skill

在 `.claude/skills/` 目录下创建 Markdown 文件：

```markdown
---
name: create-component
description: 创建标准化的 Vue 组件
---

# 创建组件

按照以下步骤创建新组件：

1. 在 `src/components/` 下创建 PascalCase 命名的 `.vue` 文件
2. 使用 `<script setup>` 语法
3. Props 用 `defineProps` 基于类型声明
4. 添加必要的类型导入
5. 组件模板不超过 300 行
```

## Skill 的实际应用

假设你有一个"创建 API 接口"的 Skill：

```markdown
---
name: create-api
description: 创建标准的 RESTful API 接口
---

# 创建 API 接口

在 `src/api/` 目录下创建接口文件：
- 文件名用 kebab-case
- 导出函数用 camelCase
- 所有请求参数和返回值都要有 TypeScript 类型
- 统一使用 axios 实例
```

使用时只需：

```
/create-api 用户管理接口，包含增删改查
```

Claude 就会按照 Skill 定义的规范来生成代码。

## Skill 和 Rule 的区别

| 特点 | Rule | Skill |
|------|------|-------|
| 触发方式 | 自动生效 | 手动调用 |
| 用途 | 约束行为 | 执行任务 |
| 类比 | 交通规则 | 驾驶技能 |

> **注意**：Skill 定义要具体明确，步骤清晰，这样 Claude 执行起来效果最好。

## 小结

Skills 让你把重复性工作标准化。花 5 分钟写一个 Skill，以后每次都能省下半小时。
