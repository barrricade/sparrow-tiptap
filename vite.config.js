import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
const coreDir = path.resolve(__dirname, 'core')

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const IS_DEPLOY = process.env.VITE_BUILD_TARGET === 'deploy'
  return defineConfig({
    build: IS_DEPLOY
      ? undefined
      : {
        outDir: coreDir,
        lib: {
          entry: path.resolve('src', 'tiptap/tiptap.jsx'),
          name: 'sparrow-tiptap',
          fileName: (format) => `sparrow-tiptap.${format}.js`
        },
        rollupOptions: {
          external: [
            'react',
            'react-dom',
            '@testing-library/jest-dom',
            '@testing-library/user-event',
            '@testing-library/dom',
            '@testing-library/react',
            'c8',
            'eslint',
            'eslint-config-standard',
            'eslint-plugin-import',
            'eslint-plugin-n',
            'eslint-plugin-promise',
            'eslint-plugin-react',
            'husky',
            'jsdom',
            'lint-staged',
            'vitest'
          ],
          output: {
            globals: {
              react: 'React'
            }
          }
        }
      },
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      })],
    /** 打包时根据实际情况修改 base */
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src')
      }
    }
  })
}
