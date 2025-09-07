import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next) // pass i18n down to react-i18next
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          home: 'Home',
          toys: 'Toys',
          about: 'About',
          save: 'Save',
          name: 'Name',
          price: 'Price',
          welcome: 'Welcome to Mister Toy!',
          instructions: 'Use the navigation above to explore toys, dashboard, and branches.',
          offlineMsg: 'Offline: changes cannot be saved',
        },
      },
      es: {
        translation: {
          home: 'Inicio',
          toys: 'Juguetes',
          about: 'Acerca de',
          save: 'Guardar',
          name: 'Nombre',
          price: 'Precio',
          welcome: '¡Bienvenido a Mister Toy!',
          instructions: 'Utilice la navegación de arriba para explorar juguetes, panel de control y sucursales.',
          offlineMsg: 'Desconectado: no se pueden guardar cambios',
        },
      },
      fr: {
        translation: {
          home: 'Accueil',
          toys: 'Jouets',
          about: 'À propos',
          save: 'Enregistrer',
          name: 'Nom',
          price: 'Prix',
          welcome: 'Bienvenue chez Mister Toy !',
          instructions: 'Utilisez la navigation ci-dessus pour explorer les jouets, le tableau de bord et les succursales.',
          offlineMsg: 'Hors ligne : les modifications ne peuvent pas être enregistrées',
        },
      },
    },
  })

export default i18n