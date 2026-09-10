import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  { ignores: ['dist/**', '.astro/**', 'node_modules/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: { parserOptions: { parser: ts.parser } },
  },
);
