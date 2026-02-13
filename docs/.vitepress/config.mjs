import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/zoo-framework-doc/',
  title: "Zoo Framework",
  description: "A Zoo-themed Multi-threading Framework",
  
  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '🏠 首页', link: '/' },
          { text: '🎪 快速开始', link: '/start/' },
          { text: '🦁 核心概念', link: '/core/worker' },
          { text: '🔧 API', link: '/api/core' },
        ],
        sidebar: {
          '/': [
            {
              text: '🎪 快速开始',
              collapsed: false,
              items: [
                { text: '入园指南', link: '/start/' },
                { text: '搭建动物园', link: '/start/new' },
              ]
            },
            {
              text: '📚 基础指南',
              collapsed: false,
              items: [
                { text: '动物园布局', link: '/guide/structure' },
                { text: '配置说明', link: '/guide/configuration' },
              ]
            },
          ],
          '/start/': [
            {
              text: '🎪 快速开始',
              collapsed: false,
              items: [
                { text: '入园指南', link: '/start/' },
                { text: '搭建动物园', link: '/start/new' },
              ]
            },
            {
              text: '📚 基础指南',
              collapsed: false,
              items: [
                { text: '动物园布局', link: '/guide/structure' },
                { text: '配置说明', link: '/guide/configuration' },
              ]
            },
          ],
          '/guide/': [
            {
              text: '📚 基础指南',
              collapsed: false,
              items: [
                { text: '动物园布局', link: '/guide/structure' },
                { text: '配置说明', link: '/guide/configuration' },
              ]
            },
          ],
          '/core/': [
            {
              text: '🎪 动物园核心',
              collapsed: false,
              items: [
                { text: '🦁 Worker 动物', link: '/core/worker' },
                { text: '🏠 Cage 笼子', link: '/core/cage' },
                { text: '🍖 Event 食物', link: '/core/event' },
                { text: '🗺️ State 状态图', link: '/core/statemachine' },
                { text: '📊 FIFO 饲养员', link: '/core/fifo' },
                { text: '🎛️ Waiter 调度', link: '/core/waiter' },
              ]
            },
            {
              text: '🔧 高级特性',
              collapsed: false,
              items: [
                { text: '✂️ AOP 驯兽', link: '/advanced/aop' },
                { text: '⚡ Reactor 反应', link: '/advanced/reactor' },
                { text: '🔒 Lock 安全', link: '/advanced/lock' },
                { text: '🔌 Plugin 新物种', link: '/advanced/plugin' },
              ]
            },
          ],
          '/advanced/': [
            {
              text: '🔧 高级特性',
              collapsed: false,
              items: [
                { text: '✂️ AOP 驯兽', link: '/advanced/aop' },
                { text: '⚡ Reactor 反应', link: '/advanced/reactor' },
                { text: '🔒 Lock 安全', link: '/advanced/lock' },
                { text: '🔌 Plugin 新物种', link: '/advanced/plugin' },
              ]
            },
          ],
          '/api/': [
            {
              text: '📖 API 参考',
              collapsed: false,
              items: [
                { text: '🔧 核心 API', link: '/api/core' },
                { text: '🛠️ 工具类', link: '/api/utils' },
                { text: '📋 常量定义', link: '/api/constant' },
              ]
            },
          ],
        },
        outline: {
          label: '页面导航'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        lastUpdated: {
          text: '最后更新于'
        },
        editLink: {
          pattern: 'https://github.com/YearsAlso/zoo-framework-doc/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        },
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '🏠 首页', link: '/zh/' },
          { text: '🎪 快速开始', link: '/zh/start/' },
          { text: '🦁 核心概念', link: '/zh/core/worker' },
          { text: '🔧 API', link: '/zh/api/core' },
        ],
        sidebar: {
          '/zh/': [
            {
              text: '🎪 快速开始',
              collapsed: false,
              items: [
                { text: '入园指南', link: '/zh/start/' },
                { text: '搭建动物园', link: '/zh/start/new' },
              ]
            },
            {
              text: '📚 基础指南',
              collapsed: false,
              items: [
                { text: '动物园布局', link: '/zh/guide/structure' },
                { text: '配置说明', link: '/zh/guide/configuration' },
              ]
            },
          ],
          '/zh/start/': [
            {
              text: '🎪 快速开始',
              collapsed: false,
              items: [
                { text: '入园指南', link: '/zh/start/' },
                { text: '搭建动物园', link: '/zh/start/new' },
              ]
            },
            {
              text: '📚 基础指南',
              collapsed: false,
              items: [
                { text: '动物园布局', link: '/zh/guide/structure' },
                { text: '配置说明', link: '/zh/guide/configuration' },
              ]
            },
          ],
          '/zh/guide/': [
            {
              text: '📚 基础指南',
              collapsed: false,
              items: [
                { text: '动物园布局', link: '/zh/guide/structure' },
                { text: '配置说明', link: '/zh/guide/configuration' },
              ]
            },
          ],
          '/zh/core/': [
            {
              text: '🎪 动物园核心',
              collapsed: false,
              items: [
                { text: '🦁 Worker 动物', link: '/zh/core/worker' },
                { text: '🏠 Cage 笼子', link: '/zh/core/cage' },
                { text: '🍖 Event 食物', link: '/zh/core/event' },
                { text: '🗺️ State 状态图', link: '/zh/core/statemachine' },
                { text: '📊 FIFO 饲养员', link: '/zh/core/fifo' },
                { text: '🎛️ Waiter 调度', link: '/zh/core/waiter' },
              ]
            },
            {
              text: '🔧 高级特性',
              collapsed: false,
              items: [
                { text: '✂️ AOP 驯兽', link: '/zh/advanced/aop' },
                { text: '⚡ Reactor 反应', link: '/zh/advanced/reactor' },
                { text: '🔒 Lock 安全', link: '/zh/advanced/lock' },
                { text: '🔌 Plugin 新物种', link: '/zh/advanced/plugin' },
              ]
            },
          ],
          '/zh/advanced/': [
            {
              text: '🔧 高级特性',
              collapsed: false,
              items: [
                { text: '✂️ AOP 驯兽', link: '/zh/advanced/aop' },
                { text: '⚡ Reactor 反应', link: '/zh/advanced/reactor' },
                { text: '🔒 Lock 安全', link: '/zh/advanced/lock' },
                { text: '🔌 Plugin 新物种', link: '/zh/advanced/plugin' },
              ]
            },
          ],
          '/zh/api/': [
            {
              text: '📖 API 参考',
              collapsed: false,
              items: [
                { text: '🔧 核心 API', link: '/zh/api/core' },
                { text: '🛠️ 工具类', link: '/zh/api/utils' },
                { text: '📋 常量定义', link: '/zh/api/constant' },
              ]
            },
          ],
        },
        outline: {
          label: '页面导航'
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        lastUpdated: {
          text: '最后更新于'
        },
        editLink: {
          pattern: 'https://github.com/YearsAlso/zoo-framework-doc/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        },
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: '🏠 Home', link: '/en/' },
          { text: '🎪 Get Started', link: '/en/start/' },
          { text: '🦁 Core Concepts', link: '/en/core/worker' },
          { text: '🔧 API', link: '/en/api/core' },
        ],
        sidebar: {
          '/en/': [
            {
              text: '🎪 Get Started',
              collapsed: false,
              items: [
                { text: 'Quick Start', link: '/en/start/' },
                { text: 'Create Project', link: '/en/start/new' },
              ]
            },
            {
              text: '📚 Guide',
              collapsed: false,
              items: [
                { text: 'Project Structure', link: '/en/guide/structure' },
                { text: 'Configuration', link: '/en/guide/configuration' },
              ]
            },
          ],
          '/en/start/': [
            {
              text: '🎪 Get Started',
              collapsed: false,
              items: [
                { text: 'Quick Start', link: '/en/start/' },
                { text: 'Create Project', link: '/en/start/new' },
              ]
            },
            {
              text: '📚 Guide',
              collapsed: false,
              items: [
                { text: 'Project Structure', link: '/en/guide/structure' },
                { text: 'Configuration', link: '/en/guide/configuration' },
              ]
            },
          ],
          '/en/guide/': [
            {
              text: '📚 Guide',
              collapsed: false,
              items: [
                { text: 'Project Structure', link: '/en/guide/structure' },
                { text: 'Configuration', link: '/en/guide/configuration' },
              ]
            },
          ],
          '/en/core/': [
            {
              text: '🎪 Zoo Core',
              collapsed: false,
              items: [
                { text: '🦁 Worker Animals', link: '/en/core/worker' },
                { text: '🏠 Cage', link: '/en/core/cage' },
                { text: '🍖 Event Food', link: '/en/core/event' },
                { text: '🗺️ State Machine', link: '/en/core/statemachine' },
                { text: '📊 FIFO Queue', link: '/en/core/fifo' },
                { text: '🎛️ Waiter', link: '/en/core/waiter' },
              ]
            },
            {
              text: '🔧 Advanced',
              collapsed: false,
              items: [
                { text: '✂️ AOP', link: '/en/advanced/aop' },
                { text: '⚡ Reactor', link: '/en/advanced/reactor' },
                { text: '🔒 Lock', link: '/en/advanced/lock' },
                { text: '🔌 Plugin', link: '/en/advanced/plugin' },
              ]
            },
          ],
          '/en/advanced/': [
            {
              text: '🔧 Advanced',
              collapsed: false,
              items: [
                { text: '✂️ AOP', link: '/en/advanced/aop' },
                { text: '⚡ Reactor', link: '/en/advanced/reactor' },
                { text: '🔒 Lock', link: '/en/advanced/lock' },
                { text: '🔌 Plugin', link: '/en/advanced/plugin' },
              ]
            },
          ],
          '/en/api/': [
            {
              text: '📖 API Reference',
              collapsed: false,
              items: [
                { text: '🔧 Core API', link: '/en/api/core' },
                { text: '🛠️ Utils', link: '/en/api/utils' },
                { text: '📋 Constants', link: '/en/api/constant' },
              ]
            },
          ],
        },
        outline: {
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        lastUpdated: {
          text: 'Last updated'
        },
        editLink: {
          pattern: 'https://github.com/YearsAlso/zoo-framework-doc/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
      }
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://mxstorage.oss-cn-beijing.aliyuncs.com/oss-accesslog/zf-main-logo.png',
    
    siteTitle: 'Zoo Framework',
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YearsAlso/zoo-framework' }
    ],
    
    footer: {
      message: 'Released under the Apache License 2.0.',
      copyright: 'Copyright © 2024-present Zoo Framework Team'
    },
    
    search: {
      provider: 'local'
    }
  }
})
