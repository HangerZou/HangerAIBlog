#!/usr/bin/env node

/**
 * 密码哈希生成工具
 * 用法: node scripts/gen-password-hash.js <密码>
 */

import { createHash } from 'crypto'

const password = process.argv[2]

if (!password) {
  console.log('用法: node scripts/gen-password-hash.js <密码>')
  console.log('示例: node scripts/gen-password-hash.js admin123')
  process.exit(1)
}

const hash = createHash('sha256').update(password).digest('hex')
console.log(`密码: ${password}`)
console.log(`哈希: sha256:${hash}`)
console.log('')
console.log('复制以下内容到 _meta.json:')
console.log(`"passwordHash": "sha256:${hash}"`)
