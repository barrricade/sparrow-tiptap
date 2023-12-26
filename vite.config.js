import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),],
  /** 打包时根据实际情况修改 base */
  resolve: {
    alias: {
      /** @ 符号指向 src 目录 */
      '@': resolve(__dirname, './src')
    }
  },
})
