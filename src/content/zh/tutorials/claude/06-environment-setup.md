---
title: "环境搭建与配置"
description: "Claude Code 的安装、配置和环境准备，让你快速上手 AI 辅助编程。"
date: 2026-06-30
tags: ["claude", "环境", "配置", "教程"]
---

# 环境搭建与配置

本文介绍如何安装和配置 Claude Code，为 AI 辅助编程做好准备。

## 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | macOS、Windows、Linux |
| Node.js | 18.0 或更高版本 |
| 内存 | 至少 4GB 可用内存 |
| 网络 | 需要稳定的网络连接 |

## 安装 Claude Code

### 方式一：npm 全局安装

```bash
npm install -g @anthropic-ai/claude-code
```

### 方式二：npx 直接运行

```bash
npx @anthropic-ai/claude-code
```

> **提示**：推荐使用全局安装，这样可以在任何目录下直接使用 `claude` 命令。

## 首次启动

安装完成后，在终端输入：

```bash
claude
```

首次启动会引导你完成认证：

1. 选择登录方式（API Key 或 OAuth）
2. 如果选择 API Key，输入你的 Anthropic API Key
3. 认证完成后即可开始使用

## 获取 API Key

1. 访访 [console.anthropic.com](https://console.anthropic.com)
2. 注册或登录账号
3. 进入 API Keys 页面
4. 点击 "Create Key" 创建新的 API Key
5. 复制并保存好 Key（只显示一次）

> **注意**：API Key 是敏感信息，不要分享给他人或提交到代码仓库。

## 基本配置

### 设置默认模型

```bash
claude config set model claude-sonnet-4-20250514
```

常用模型：
- `claude-sonnet-4-20250514`：平衡性能和速度
- `claude-opus-4-20250514`：最强能力，适合复杂任务
- `claude-haiku-4-5-20251001`：最快速度，适合简单任务

### 设置输出语言

```bash
claude config set language zh-CN
```

## 编辑器集成

### VS Code 扩展

1. 打开 VS Code
2. 搜索 "Claude Code" 扩展
3. 安装并重启

### JetBrains 插件

1. 打开 Settings → Plugins
2. 搜索 "Claude Code"
3. 安装并重启 IDE

## 验证安装

运行以下命令验证安装成功：

```bash
claude --version
```

如果显示版本号，说明安装成功。

## 常见安装问题

**Q：提示 "command not found: claude"**

A：检查 npm 全局安装路径是否在 PATH 中：

```bash
npm config get prefix
```

将输出的路径添加到 PATH 环境变量。

**Q：网络连接失败**

A：如果在国内网络环境，可以尝试使用代理：

```bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```

## 下一步

环境准备好了，下一篇我们将学习 CLAUDE.md 的高级用法，让你的 AI 编程助手更懂你。
