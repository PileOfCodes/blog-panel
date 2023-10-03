// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  css: [
    '@/assets/css/main.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  modules: [
    '@unlazy/nuxt',
    "nuxt-lodash"
],
  unlazy: {
    ssr: false
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api/admin'
    }
  },
  build: {
    transpile: ['vuetify']
  }
})
