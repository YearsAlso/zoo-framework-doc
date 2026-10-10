import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/zoo-framework-doc/',
  title: "Zoo Framework",
  description: "Zoo Framework —— 进程内任务编排：调度、可观测、有状态，不需要 broker，不需要 cron 守护进程",

  head: [
    // 小尺寸专用变体：实底方块 + 三条，16px 下可辨
    // （原先是 800x800 的整张锁定图，标签页里完全不可辨）
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/zoo-framework-doc/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/zoo-framework-doc/favicon.png' }]
  ],

  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '快速开始', link: '/start/' },
          { text: '核心概念', link: '/core/worker' },
          { text: 'API', link: '/api/core' },
        ],
        sidebar: [
        {
          text: '快速开始',
          collapsed: false,
          items: [
            { text: '安装与上手', link: '/start/' },
            { text: '项目结构', link: '/start/new' },
          ]
        },
        {
          text: '基础指南',
          collapsed: false,
          items: [
            { text: '概览', link: '/guide/overview' },
            { text: '仓库布局', link: '/guide/structure' },
            { text: '配置说明', link: '/guide/configuration' },
          ]
        },
        {
          text: '核心概念',
          collapsed: false,
          items: [
            { text: 'Worker（任务单元）', link: '/core/worker' },
            { text: '容器（ScopedContainer）', link: '/core/cage' },
            { text: '事件管道', link: '/core/event' },
            { text: '状态机', link: '/core/statemachine' },
            { text: 'FIFO 队列', link: '/core/fifo' },
            { text: '调度（Waiter）', link: '/core/waiter' },
          ]
        },
        {
          text: '高级特性',
          collapsed: false,
          items: [
            { text: 'AOP 切面', link: '/advanced/aop' },
            { text: 'Reactor 响应器', link: '/advanced/reactor' },
            { text: '锁与线程安全', link: '/advanced/lock' },
            { text: '插件系统', link: '/advanced/plugin' },
          ]
        },
        {
          text: 'API 参考',
          collapsed: false,
          items: [
            { text: '核心 API', link: '/api/core' },
            { text: '工具类', link: '/api/utils' },
            { text: '常量定义', link: '/api/constant' },
          ]
        },
      ],
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
          { text: 'Home', link: '/en/' },
          { text: 'Get Started', link: '/en/start/' },
          { text: 'Core Concepts', link: '/en/core/worker' },
          { text: 'API', link: '/en/api/core' },
        ],
        sidebar: [
        {
          text: 'Get Started',
          collapsed: false,
          items: [
            { text: 'Installation & Quick Start', link: '/en/start/' },
            { text: 'Project Structure', link: '/en/start/new' },
          ]
        },
        {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/en/guide/overview' },
            { text: 'Repository Layout', link: '/en/guide/structure' },
            { text: 'Configuration', link: '/en/guide/configuration' },
          ]
        },
        {
          text: 'Core Concepts',
          collapsed: false,
          items: [
            { text: 'Worker', link: '/en/core/worker' },
            { text: 'Container (ScopedContainer)', link: '/en/core/cage' },
            { text: 'Event Pipeline', link: '/en/core/event' },
            { text: 'State Machine', link: '/en/core/statemachine' },
            { text: 'FIFO Queue', link: '/en/core/fifo' },
            { text: 'Scheduler (Waiter)', link: '/en/core/waiter' },
          ]
        },
        {
          text: 'Advanced',
          collapsed: false,
          items: [
            { text: 'AOP', link: '/en/advanced/aop' },
            { text: 'Reactor', link: '/en/advanced/reactor' },
            { text: 'Locking', link: '/en/advanced/lock' },
            { text: 'Plugins', link: '/en/advanced/plugin' },
          ]
        },
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'Core API', link: '/en/api/core' },
            { text: 'Utils', link: '/en/api/utils' },
            { text: 'Constants', link: '/en/api/constant' },
          ]
        },
      ],
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
    // 仅图形的 mark（整张锁定图在导航栏尺寸下文字会糊），
    // 深浅两套：mark.svg 是深靛蓝，在深色主题下不可见，故必须配上浅色变体
    logo: { light: '/mark.svg', dark: '/mark-dark.svg' },

    siteTitle: 'Zoo Framework',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YearsAlso/zoo-framework' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2019-2026 YearsAlso / Zoo Framework'
    },

    search: {
      provider: 'local'
    }
  }
})
