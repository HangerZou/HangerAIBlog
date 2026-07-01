---
title: "CLAUDE.md 高级用法"
description: "深入掌握 CLAUDE.md 的高级配置技巧，让 AI 更精准地理解你的项目需求。"
date: 2026-06-30
tags: ["claude", "claude.md", "高级", "教程"]
---

# CLAUDE.md 高级用法

CLAUDE.md 是 Claude Code 的核心配置文件，掌握高级用法能让 AI 更懂你的项目。

## 文件层级结构

Claude Code 支持多层配置，优先级从高到低：

```
~/.claude/CLAUDE.md          # 全局配置
项目根目录/CLAUDE.md         # 项目配置
项目根目录/.claude/CLAUDE.md # 项目本地配置
```

> **提示**：全局配置放通用规范，项目配置放项目特有要求。

## 高级语法技巧

### 使用代码示例

在规则中嵌入代码示例，Claude 会更好地理解：

```markdown
## 代码风格

使用这种写法：
```typescript
// ✅ 正确
const user = await getUserById(id)

// ❌ 错误
getUserById(id).then(user => ...)
```
```

### 引用现有文件

让 Claude 参考现有代码风格：

```markdown
## 组件风格

参考 `src/components/UserProfile.vue` 的写法：
- 使用 `<script setup>`
- Props 用 defineProps
- 样式用 scoped SCSS
```

### 条件规则

根据上下文应用不同规则：

```markdown
## 不同场景的规则

### API 接口
- 返回统一格式：`{ code: 0, data: ..., message: '' }`
- 错误用 HTTP 状态码

### 前端组件
- 使用 Element Plus 组件
- 遵循项目配色方案
```

## 实用配置模板

### TypeScript 项目

```markdown
# TypeScript 项目规范

## 类型安全
- 开启严格模式
- 避免使用 any，用 unknown
- 优先用 interface 而非 type

## 命名规范
- 类型用 PascalCase：`UserProfile`
- 接口用 I 前缀或无前缀：`IUser` 或 `User`
- 枚举用 PascalCase，成员用 PascalCase

## 导入顺序
1. 第三方库
2. 内部模块
3. 类型导入
```

### Vue 3 项目

```markdown
# Vue 3 项目规范

## 组件规范
- 使用 `<script setup>`
- Props 用基于类型的声明
- 组件不超过 300 行

## 状态管理
- 简单状态用 ref/reactive
- 复杂状态用 Pinia
- 避免在组件外使用 ref

## 样式规范
- 使用 scoped SCSS
- BEM 命名：`.block__element--modifier`
- 优先使用 CSS 变量
```

### 后端项目

```markdown
# 后端项目规范

## API 设计
- RESTful 风格
- 版本号在 URL 中：`/api/v1/users`
- 分页用 `page` 和 `size` 参数

## 错误处理
- 自定义错误类继承 Error
- 统一错误格式：`{ code, message, details }`
- 记录详细日志

## 数据库
- 使用参数化查询
- 字段名用 camelCase
- 表名用 snake_case
```

## 动态配置

### 使用环境变量

```markdown
## 环境配置

根据 `NODE_ENV` 调整行为：
- development：开启详细日志
- production：关闭调试信息
- test：使用 mock 数据
```

### 项目特定指令

```markdown
## 项目特定

本项目使用内部 npm registry：
```bash
npm config set registry https://npm.internal.company.com
```

部署到内部服务器：
```bash
npm run deploy:internal
```
```

## 调试配置

如果 Claude 没有遵循规则，检查：

1. 文件路径是否正确
2. 语法是否有错误
3. 规则是否太模糊

```bash
# 查看当前加载的配置
claude config list

# 查看特定配置
claude config get rules
```

## 最佳实践

1. **规则要具体**：不要写 "写好代码"，要写 "函数不超过 50 行"
2. **给例子**：用代码示例说明规则
3. **分层配置**：通用规则放全局，项目规则放项目
4. **定期更新**：项目演进时同步更新规则

## 小结

好的 CLAUDE.md 配置能让 Claude 更懂你的项目。花时间打磨配置，后续开发效率会大幅提升。
