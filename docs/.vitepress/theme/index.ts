// https://vitepress.dev/guide/custom-theme
import { h, nextTick } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Home from './Home.vue'

async function renderMermaidDiagrams() {
  // Only run in a browser
  if (typeof window === 'undefined') return

  // Dynamically import mermaid so it isn't bundled into the main chunk
  let mermaid: any
  try {
    const mod = await import('mermaid')
    mermaid = mod.default ?? mod
  } catch (e) {
    // mermaid couldn't be loaded — maybe offline or blocked. Fail silently.
    // eslint-disable-next-line no-console
    console.warn('Mermaid not available:', e)
    return
  }

  // Robust selector: accept both `language-mermaid` and `lang-mermaid` class names,
  // and code blocks inside <pre> or standalone code elements.
  const codeBlocks = Array.from(document.querySelectorAll('pre code[class*="language-mermaid"], pre code[class*="lang-mermaid"], code[class*="language-mermaid"], code[class*="lang-mermaid"]'))
  codeBlocks.forEach((codeBlock) => {
    // prefer replacing the parent <pre> if present, otherwise replace the code node itself
    const pre = codeBlock.closest('pre')
    const code = codeBlock.textContent || ''
    const wrapper = document.createElement('div')
    wrapper.className = 'mermaid'
    wrapper.textContent = code
    if (pre && pre.parentElement) {
      pre.parentElement.replaceChild(wrapper, pre)
    } else if (codeBlock.parentElement) {
      codeBlock.parentElement.replaceChild(wrapper, codeBlock)
    }
  })

  // Initialize mermaid on any .mermaid elements
  try {
    mermaid.initialize({ startOnLoad: false })
    mermaid.init(undefined, document.querySelectorAll('.mermaid'))
  } catch (e) {
    // Fail silently in case mermaid cannot render on some environments
    // eslint-disable-next-line no-console
    console.error('Mermaid render error:', e)
  }
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router: _router, siteData: _siteData }) {
    app.component('Home', Home)

    // Render diagrams on initial load and on route changes
    if (typeof window !== 'undefined') {
      // On initial mount — wait a tick so DOM from markdown is present
      nextTick(() => {
        renderMermaidDiagrams()
      })

      // When navigating between pages, VitePress changes the DOM — render again
      // Some router typings (or non-vue-router runtime) don't expose `afterEach`.
      // Guard and cast to any when present. If not available, fall back to
      // listening to browser history changes (`popstate`) so SPA navigation
      // still triggers rendering.
      if (_router && typeof (_router as any).afterEach === 'function') {
        ;(_router as any).afterEach(() => {
          // run after DOM update
          nextTick(() => {
            renderMermaidDiagrams()
          })
        })
      } else {
        // Fallback: listen to popstate which fires on back/forward/navigation
        // This is a best-effort fallback for environments without router.afterEach.
        window.addEventListener('popstate', () => {
          nextTick(() => {
            renderMermaidDiagrams()
          })
        })
      }
    }
  }
} satisfies Theme
