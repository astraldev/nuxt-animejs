export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['../src/module'],
  devServer: {
    port: 3001,
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },
})
