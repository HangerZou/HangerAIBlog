---
title: "第一个 AI 辅助项目"
description: "手把手教你用 Claude Code 完成第一个项目，从零开始体验 AI 辅助编程的魅力。"
date: 2026-06-29
tags: ["claude", "教程", "实战", "入门"]
---

# 第一个 AI 辅助项目

本教程带你用 Claude Code 从零创建一个简单的待办事项（Todo）应用。

## 第一步：创建项目

打开终端，创建一个新目录：

```bash
mkdir my-todo-app
cd my-todo-app
npm init -y
```

## 第二步：启动 Claude Code

在项目目录下启动 Claude：

```bash
claude
```

然后用自然语言告诉它你想要什么：

```
帮我创建一个命令行待办事项应用，支持添加、查看、删除任务，用 Node.js 实现
```

Claude 会自动帮你生成代码文件。

## 第三步：查看生成的代码

Claude 生成的代码大概是这样的：

```javascript
const todos = [];

function addTodo(text) {
  todos.push({ id: Date.now(), text, done: false });
}

function listTodos() {
  todos.forEach((t, i) => {
    console.log(`${i + 1}. [${t.done ? 'x' : ' '}] ${t.text}`);
  });
}
```

> **提示**：生成的代码不一定要直接用。你可以让 Claude 修改、优化，或者解释每一段代码的含义。

## 第四步：迭代改进

你可以继续和 Claude 对话，比如：

- "给每个任务加上优先级功能"
- "把数据保存到文件里，下次启动还能看到"
- "加上颜色输出，让界面更好看"

## 小结

恭喜！你已经完成了第一个 AI 辅助项目。关键要点：

1. **描述清楚你想要什么** — 越具体，结果越好
2. **不要怕迭代** — 第一次生成的不一定完美，多聊几轮
3. **理解代码** — 不要只是复制粘贴，要理解 Claude 生成的逻辑

> **注意**：AI 生成的代码一定要自己审查，确保没有安全问题和逻辑错误。
