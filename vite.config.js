import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landingOne: resolve(__dirname, 'src/landing-one/index.html'),
        landingTwo: resolve(__dirname, 'src/landing-two/index.html'),
      },
    },
  },
})
