import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'


export default defineUserConfig({ 
theme: defaultTheme({
    locales: {
        '/': {
        selectLanguageName: 'English',
        },
        '/zh/': {
        selectLanguageName: '简体中文',
        },
    },
    }),
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器',
    },
  },
})