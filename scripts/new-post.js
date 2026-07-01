#!/usr/bin/env node

/**
 * 新建文章脚本
 * 用法：
 *   node scripts/new-post.js 博客 "文章标题"
 *   node scripts/new-post.js 教程 claude "教程标题"
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const args = process.argv.slice(2)

if (args.length < 2) {
  console.log('用法：')
  console.log('  新建博客：node scripts/new-post.js 博客 "文章标题"')
  console.log('  新建教程：node scripts/new-post.js 教程 claude "教程标题"')
  process.exit(1)
}

const type = args[0]
const title = args.length === 3 ? args[2] : args[1]
const series = args.length === 3 ? args[1] : null

// 生成日期
const date = new Date().toISOString().split('T')[0]

// 生成文件名（中文转拼音简化版，直接用英文）
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const filename = `${date}-${slug}.md`

// 生成 frontmatter
const frontmatter = `---
title: "${title}"
description: "在这里写文章描述"
date: ${date}
tags: []
---

# ${title}

在这里写正文...
`

// 确定目录
let dir
if (type === '博客' || type === 'blog') {
  dir = join(process.cwd(), 'src/content/zh/blog')
} else if (type === '教程' || type === 'tutorial') {
  if (!series) {
    console.log('教程需要指定系列，例如：node scripts/new-post.js 教程 claude "标题"')
    process.exit(1)
  }
  dir = join(process.cwd(), 'src/content/zh/tutorials', series)
} else {
  console.log('类型只能是 "博客" 或 "教程"')
  process.exit(1)
}

// 创建目录
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true })
}

// 写入文件
const filepath = join(dir, filename)
writeFileSync(filepath, frontmatter)

console.log(`✅ 已创建：${filepath}`)
console.log('')
console.log('下一步：')
console.log(`1. 编辑文件填写 description 和 tags`)
console.log(`2. 写正文内容`)
console.log(`3. git add . && git commit -m "feat: 新增文章 ${title}" && git push`)
