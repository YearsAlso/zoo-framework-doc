import {defineUserConfig} from 'vuepress'
import {defaultTheme} from 'vuepress'


export default defineUserConfig({
    title: 'Zoo Framework',
    description: '',
    theme: defaultTheme({
        locales: {
            '/': {
                selectLanguageName: 'English',
            },
            '/zh/': {
                selectLanguageName: '简体中文',

            },
        },
        sidebar: [{
            text: '快速开始',
            link: '/start/',
            children: [
                // SidebarItem
                // 字符串 - 页面文件路径
                '/start/new.md',
            ],
        },]
    }),
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN',
            title: 'Zoo Framework',
            description: 'Vue-powered Static Site Generator',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Zoo Framework',
            description: 'Vue 驱动的静态网站生成器',
        },
    },
})