import { i18n } from './configs/i18n'
import { image } from './configs/image'
import { stripe } from './configs/stripe'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
    // baseURL: '.',
    // buildAssetsDir: './',
  },

  css: [
    'assets/css/fonts.css',
    'assets/css/common.css',
  ],
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    ['@nuxtjs/i18n', i18n],
    ['@unlok-co/nuxt-stripe', stripe],
    ['@nuxt/image', image],
  ],
  build: {
    transpile: ['pinia']
  },
  alias: {
    pinia: 'pinia/dist/pinia.cjs'
  },
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true
    }
  },
  // Development
  devtools: { enabled: true },
})
