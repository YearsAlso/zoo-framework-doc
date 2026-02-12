import {defineUserConfig} from 'vuepress'
import {defaultTheme} from 'vuepress'


export default defineUserConfig({
    title: 'Zoo Framework',
    description: '一款响应式多线程开发框架',
    theme: defaultTheme({
        logo: 'https://mxstorage.oss-cn-beijing.aliyuncs.com/oss-accesslog/zf-main-logo.png',
        navbar: [
            {text: '首页', link: '/'},
            {text: '指南', link: '/start/'},
            {text: '核心概念', link: '/core/worker.html'},
            {text: 'API', link: '/api/core.html'},
        ],
        sidebar: {
            '/start/': [
                {
                    text: '快速开始',
                    collapsible: true,
                    children: [
                        '/start/',
                        '/start/new.md',
                    ],
                },
                {
                    text: '指南',
                    collapsible: true,
                    children: [
                        '/guide/structure.md',
                        '/guide/configuration.md',
                    ],
                },
            ],
            '/core/': [
                {
                    text: '核心概念',
                    collapsible: true,
                    children: [
                        '/core/worker.md',
                        '/core/event.md',
                        '/core/statemachine.md',
                        '/core/fifo.md',
                        '/core/waiter.md',
                    ],
                },
                {
                    text: '高级特性',
                    collapsible: true,
                    children: [
                        '/advanced/aop.md',
                        '/advanced/reactor.md',
                        '/advanced/lock.md',
                        '/advanced/plugin.md',
                    ],
                },
            ],
            '/api/': [
                {
                    text: 'API 参考',
                    collapsible: true,
                    children: [
                        '/api/core.md',
                        '/api/utils.md',
                        '/api/constant.md',
                    ],
                },
            ],
        },
        locales: {
            '/': {
                selectLanguageName: '简体中文',
            },
        },
        editLink: false,
        lastUpdated: true,
    }),
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Zoo Framework',
            description: '一款响应式多线程开发框架',
        },
    },
})
