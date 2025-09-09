// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import withNuxt from './.nuxt/eslint.config.mjs'

// Read content from .gitignore
const gitignorePath = path.resolve('.gitignore')
const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')

// Filter valid rows: not empty, no comments
const ignoredFiles = gitignoreContent
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'))

export default withNuxt({
  // Your custom configs here
  ignores: ignoredFiles,
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',   // empty tags like <img> do not use self-closing
        normal: 'never', // regular tags like <div>, <pre> do not use self-closing
        component: 'always' // Vue custom components can be self-closing
      },
      svg: 'always',
      math: 'always'
    }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
})
