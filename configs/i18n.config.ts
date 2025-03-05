import en from "../locales/en";
import ru from "../locales/ru";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: { en, ru },

  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
      }
    },
    ru: {
      currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
      }
    },
  },

  datetimeFormats: {
    en: {
      short: {
        year: '2-digit', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric'
      }
    },
    ru: {
      short: {
        year: '2-digit', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
      }
    },
    he: {
      short: {
        year: '2-digit', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
      }
    }
  },
}))
