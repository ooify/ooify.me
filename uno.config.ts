import { defineConfig, presetWind3, presetIcons, presetWebFonts } from 'unocss';
import { projects } from './src/data/projects';

export default defineConfig({
  safelist: projects.map((project) => project.icon),
  presets: [
    presetWind3({ dark: 'class' }),
    presetIcons({ scale: 1.1, warn: true }),
    // 优先使用本机字体，暂不发起外部字体请求。
    presetWebFonts({ fonts: {} }),
  ],
  shortcuts: {
    'icon-button':
      'inline-flex items-center justify-center w-9 h-9 rounded text-lg',
    'page-shell': 'w-full max-w-3xl mx-auto px-6 sm:px-10',
  },
});
