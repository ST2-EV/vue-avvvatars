import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: 'vue-avvvatar',
      fileName: (format) => `vue-avvvatar.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        vue: "Vue",
      }
    }
  },
  plugins: [vue()],
})
