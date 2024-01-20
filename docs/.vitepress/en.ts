import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    description: 'Vite & Vue powered static site generator.',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuide() },
            '/reference/': { base: '/reference/', items: sidebarReference() }
        },

        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Evan You'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Guide',
            link: '/en/guide/what-is-zoo-framework',
            activeMatch: '/en/guide/'
        },
        {
            text: 'Reference',
            link: '/zh/reference/site-config',
            activeMatch: '/zh/reference/'
        },
        {
            text: "V1.0.0",
            items: [
                {
                    text: 'Changelog',
                    link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
                }
            ]
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '开始使用',
            collapsed: false,
            items: [
                {text: '简介', link: 'what-is-zoo-framework'},
                {text: '快速开始', link: 'getting-started'},
                {text: '概念', link: 'concept'}
            ]
        },
        {
            text: '组件说明',
            collapsed: false,
            items: [
                {text: '组件框架', link: 'component-framework'},
            ]
        },
        {
            text: '工具类',
            collapsed: false,
            items: [
                {text: '文件工具', link: 'file-utils'},
            ]
        }
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '配置说明',
            collapsed: false,
            items: [
                {text: '日志配置', link: 'log-config'},
            ]
        },
    ]
}