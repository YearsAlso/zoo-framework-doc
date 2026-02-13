import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh'

// For GitHub Pages project sites the app is served from `/<repo>/`.
// When developing locally or deploying to a custom domain/root, keep base as `/`.
const repo = process.env.REPO_NAME || 'zoo-framework-doc'
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const base = isGitHubPages ? `/${repo}/` : '/'

export const shared = defineConfig({
    base,
    title: "Zoo Framework",

    lastUpdated: true,
    cleanUrls: true,

    markdown: {
        math: true,
        codeTransformers: [
            // We use `[!!code` in demo to prevent transformation, here we revert it back.
            {
                postprocess(code) {
                    return code.replace(/\[\!\!code/g, '[!code')
                }
            }
        ]
    },

    sitemap: {
        hostname: 'https://vitepress.dev',
        transformItems(items) {
            return items.filter((item) => !item.url.includes('migration'))
        }
    },

    /* prettier-ignore */
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}vitepress-logo-mini.svg` }],
        ['link', { rel: 'icon', type: 'image/png', href: `${base}vitepress-logo-mini.png` }],
        ['meta', { name: 'theme-color', content: '#5f67ee' }],
        ['meta', { name: 'og:type', content: 'website' }],
        ['meta', { name: 'og:locale', content: 'en' }],
        ['meta', { name: 'og:site_name', content: 'VitePress' }],
        ['meta', { name: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
        ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
    ],

    themeConfig: {
        logo: { src: `${base}vitepress-logo-mini.svg`, width: 24, height: 24 },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ],

        search: {
            provider: 'algolia',
            options: {
                appId: '8J64VVRP8K',
                apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
                indexName: 'vitepress',
                locales: { ...zhSearch }
            }
        },

        carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' }
    }
})
