# HangerAIBlog

个人博客，记录技术与生活。

## 技术栈

- **Vue 3** + **Vite** + **TypeScript**
- **Vue Router** 路由管理
- **Vue I18n** 国际化（中文/英文）
- **Element Plus** 图标库
- **Markdown** 支持（unplugin-vue-markdown + shiki 代码高亮）

## 功能特性

- 📝 博客文章
- 📚 教程系列（Claude Code、LLaMA Factory）
- 🌍 中英文切换
- 🔒 教程访问密码保护
- 📱 响应式设计
- ✨ 毛玻璃效果导航栏

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 组件
│   ├── common/      # 公共组件
│   ├── home/        # 首页组件
│   └── layout/      # 布局组件
├── content/         # Markdown 内容
│   ├── zh/          # 中文
│   └── en/          # 英文
├── i18n/            # 国际化配置
├── router/          # 路由配置
├── utils/           # 工具函数
└── views/           # 页面视图
```

## License

MIT
