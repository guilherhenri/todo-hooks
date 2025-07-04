import classnamesPlugin from 'prettier-plugin-classnames'
import mergePlugin from 'prettier-plugin-merge'
import * as tailwindcssPlugin from 'prettier-plugin-tailwindcss'

/** @typedef {import('prettier').Config} PrettierConfig */

/** @type { PrettierConfig } */
export const config = {
  plugins: [tailwindcssPlugin, classnamesPlugin, mergePlugin],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  bracketSameLine: false,
}
