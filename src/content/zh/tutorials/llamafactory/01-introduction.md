---
title: "LlamaFactory 简介"
description: "了解 LlamaFactory 是什么，以及它如何简化大模型微调流程。"
date: 2026-06-29
tags: ["llama", "微调", "入门"]
order: 1
---

# LlamaFactory 简介

LlamaFactory 是一个用于微调大语言模型的开源框架，支持多种模型和训练方法。

## 什么是 LlamaFactory？

LlamaFactory 让大模型微调变得简单：

- **一键微调**：简单的命令行界面
- **多模型支持**：LLaMA、Qwen、ChatGLM 等
- **多种训练方法**：全量微调、LoRA、QLoRA
- **Web UI**：可视化训练界面

## 为什么选择 LlamaFactory？

| 特点 | LlamaFactory | 其他框架 |
|------|--------------|----------|
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 模型支持 | 100+ | 有限 |
| 文档质量 | 优秀 | 参差不齐 |
| 社区活跃 | 高 | 因项目而异 |

## 快速开始

\`\`\`bash
# 克隆仓库
git clone https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory

# 安装依赖
pip install -e .

# 启动 Web UI
llamafactory-cli webui
\`\`\`

> **注意**：需要 Python 3.10+ 和 CUDA 11.7+

## 下一步

下一篇教程我们将搭建微调环境。
