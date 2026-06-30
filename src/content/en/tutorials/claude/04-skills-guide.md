---
title: "Skills Guide: How to Use Skills to Extend AI Capabilities"
description: "Understand Claude Code's Skills mechanism and learn to create custom skills that extend AI's capabilities."
date: 2026-06-29
tags: ["claude", "skills", "extensions", "tutorial"]
---

# Skills Guide

Skills are reusable capability modules in Claude Code. You can package common operations into Skills and invoke them with a single command.

## What Are Skills?

Simply put, a Skill is a predefined set of instructions. For example:

- Deploy a project to a server
- Generate database migration files
- Create standardized component templates

## Using Built-in Skills

Claude Code comes with some common skills. Invoke them with slash commands:

```
/deploy        # Deploy project
/test          # Run tests
/review        # Code review
```

> **Tip**: Type `/` to see all available Skills.

## Creating Custom Skills

Create Markdown files in the `.claude/skills/` directory:

```markdown
---
name: create-component
description: Create a standardized Vue component
---

# Create Component

Follow these steps to create a new component:

1. Create a PascalCase `.vue` file in `src/components/`
2. Use `<script setup>` syntax
3. Use `defineProps` with type-based declarations
4. Add necessary type imports
5. Keep component template under 300 lines
```

## Practical Skill Application

Suppose you have a "Create API endpoint" Skill:

```markdown
---
name: create-api
description: Create a standard RESTful API endpoint
---

# Create API Endpoint

Create an API file in the `src/api/` directory:
- File name uses kebab-case
- Exported functions use camelCase
- All request parameters and return values must have TypeScript types
- Use the shared axios instance
```

Usage:

```
/create-api User management endpoints with CRUD operations
```

Claude will generate code following the Skill's defined standards.

## Skills vs Rules

| Feature | Rule | Skill |
|---------|------|-------|
| Trigger | Automatic | Manual invocation |
| Purpose | Constrain behavior | Execute tasks |
| Analogy | Traffic rules | Driving skills |

> **Note**: Skill definitions should be specific and clear with well-defined steps — this produces the best results.

## Summary

Skills standardize repetitive work. Spend 5 minutes writing a Skill, and save 30 minutes every time you use it.
