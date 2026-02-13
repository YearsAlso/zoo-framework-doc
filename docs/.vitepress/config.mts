import {defineConfig} from 'vitepress'
import {shared} from "./share";
import {en} from "./en";
import {zh} from "./zh";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    ...shared,
    base: '/zoo-framework-doc/',
    locales: {
        root: { label: 'English', ...en },
        zh: { label: '简体中文', ...zh }
    }
})
