import 'material-design-icons-iconfont/dist/material-design-icons.css';
import ru      from 'vuetify/es5/locale/ru';
import Vuetify from 'vuetify/lib';
import Vue     from 'vue';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { ru },
      current: 'ru',
    },
  icons: {
    iconfont: 'md',
  },
});
