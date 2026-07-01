import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: "db6cbc3c-c976-442c-bc4d-a891a91c0a2e",
  token: "0ba32aca56771237189713ffbf0f1b3e8e5e7bc4",
  branch: "main",

  build: {
    outputFolder: "dist",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // 中文博客
      {
        name: "zh_blog",
        label: "博客文章",
        path: "src/content/zh/blog",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              const date = new Date().toISOString().split("T")[0];
              const slug = (values.title || "")
                .toLowerCase()
                .replace(/[^a-z0-9一-龥]+/g, "-")
                .replace(/^-|-$/g, "");
              return `${date}-${slug}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "日期",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文",
            isBody: true,
          },
        ],
      },
      // 教程
      {
        name: "zh_tutorial",
        label: "教程",
        path: "src/content/zh/tutorials",
        format: "md",
        match: {
          include: "**/*",
          exclude: "**/_meta",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "日期",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文",
            isBody: true,
          },
        ],
      },
    ],
  },
});
