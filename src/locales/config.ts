const i18n = require('i18next')
const { initReactI18next } = require('react-i18next')
// import language json files
const t_ja = require('./i18n/ja.json')
const t_en = require('./i18n/en.json')

const language = [
  'ja-jp',
  'en-us',
  'ja',
  'en'
]

const resources = {
  ja: {
    translation: t_ja
  },
  en: {
    translation: t_en
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja',
    interpolation: {
      escpeValue: false
    }
  })

module.exports = {
  language
}