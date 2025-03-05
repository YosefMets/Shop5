export const i18n = {

  locales: [
    {
      code: 'en',
      iso: 'en',
      N: 'English',
    },
    {
      code: 'ru',
      iso: 'ru',
      N: 'Русский',
    },
    {
      code: 'he',
      iso: 'he',
      N: 'עברית',
      dir: 'rtl',
    },
  ], // used in URL path prefix
  strategy: 'prefix',
  defaultLocale: 'en',

  vueI18n: './configs/i18n.config.ts',

  detectBrowserLanguage: {
    useCookie: true,
    // alwaysRedirect: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  }
}
