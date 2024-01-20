import {createRequire} from 'module'
import {defineConfig, type DefaultTheme} from 'vitepress'

export const zh = defineConfig({
    lang: 'zh-Hans',
    description: '一款简单的 python 多线程框架',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/guide/': {base: '/zh/guide/', items: sidebarGuide()},
            '/zh/reference/': {base: '/zh/reference/', items: sidebarReference()}
        },

        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            message: '基于 MIT 许可发布',
            copyright: `版权所有 © 2019-${new Date().getFullYear()} 尤雨溪`
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: '指南',
            link: '/zh/guide/what-is-zoo-framework',
            activeMatch: '/zh/guide/'
        },
        {
            text: '配置',
            link: '/zh/reference/site-config',
            activeMatch: '/zh/reference/'
        },
        {
            text: "V1.0.0",
            items: [
                {
                    text: '更新日志',
                    link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
                },
                {
                    text: '路线图',
                    link: '/zh/road-map',
                },
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

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    zh: {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查询条件',
                    resetButtonAriaLabel: '清除查询条件',
                    cancelButtonText: '取消',
                    cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                    recentSearchesTitle: '搜索历史',
                    noRecentSearchesText: '没有搜索历史',
                    saveRecentSearchButtonTitle: '保存至搜索历史',
                    removeRecentSearchButtonTitle: '从搜索历史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                    titleText: '无法获取结果',
                    helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                    searchByText: '搜索提供者'
                },
                noResultsScreen: {
                    noResultsText: '无法找到相关结果',
                    suggestedQueryText: '你可以尝试查询',
                    reportMissingResultsText: '你认为该查询应该有结果？',
                    reportMissingResultsLinkText: '点击反馈'
                }
            }
        }
    }
}