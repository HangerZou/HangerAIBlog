---
title: "Rules Guide: How to Use Rules to Guide AI Behavior"
description: "Learn to use Claude Code's Rules feature to make AI follow your coding standards and project conventions."
date: 2026-06-29
tags: ["claude", "rules", "standards", "tutorial"]
---

# Rules Guide

Rules are one of Claude Code's core features. They let you define AI behavior standards to ensure generated code meets your requirements.

## What Are Rules?

Rules are guidelines for Claude. You tell it:

- What coding style to use
- What framework conventions to follow
- What practices to avoid

## Creating CLAUDE.md

Create a `CLAUDE.md` file in your project root. This is the default rules file Claude Code reads:

```markdown
# Project Standards

## Code Style
- Use 2-space indentation
- Prefer const, use let only when reassignment is needed
- Never use var

## Naming Conventions
- Component files use PascalCase: `UserProfile.vue`
- Utility functions use camelCase: `formatDate.ts`
- Constants use UPPER_SNAKE_CASE: `MAX_RETRY_COUNT`
```

> **Tip**: `CLAUDE.md` supports Markdown format. Use headings and lists to organize rules — Claude understands them better this way.

## How Rules Work

After setting rules, when you ask Claude to write code:

```
// You say: Create a user info component
// Claude automatically:
// 1. Names the file UserProfile.vue
// 2. Uses 2-space indentation
// 3. Declares variables with const
```

## Global vs Project Rules

| Type | Location | Scope |
|------|----------|-------|
| Global | `~/.claude/rules/` | All projects |
| Project | Project root `CLAUDE.md` | Current project |

Put common standards (like security rules) in global rules, and project-specific requirements in project rules.

## Common Rule Examples

**Security rules**:
```markdown
- Never hardcode secrets or passwords
- Always validate user input
- Use parameterized SQL queries
```

**Vue project rules**:
```markdown
- Use Composition API exclusively
- Keep components under 300 lines
- Use type-based props declarations
```

> **Note**: Don't make rules too rigid. Give Claude some flexibility — the results are often better.

## Summary

Good Rules make Claude's output more consistent and higher quality. Start with simple rules and refine them over time.
