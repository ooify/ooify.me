// @ts-check
import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { site } from './src/data/site';

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    // 按模块生成 CSS，避开全局模式在 Astro 7 / Vite 8 构建中的 CSS 缓存错误。
    UnoCSS({ mode: 'per-module' }),
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
  ],
  prefetch: { defaultStrategy: 'hover' },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
      ],
    },
  },
});
