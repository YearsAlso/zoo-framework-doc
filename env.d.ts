/// <reference types="vitepress/client" />

// Allow importing Vue single-file components (*.vue) in TS files.
// This is used by the custom VitePress theme in `docs/.vitepress/theme/*`.
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

