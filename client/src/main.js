import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import "vuetify/styles";
import colors from 'vuetify/lib/util/colors'

// const customDarkTheme = {
//     dark: true,
//     colors: {
//         background: "#15202b",
//         surface: "#15202b",
//         primary: "#3f51b5",
//         secondary: "#03dac6",
//         error: "#f44336",
//         info: "#2196F3",
//         success: "#4caf50",
//         warning: "#fb8c00",
//     },
// };

const veutify = createVuetify({
    components,
    directives,

    theme: {
        themes: {
            light: {
              primary: colors.purple,
              secondary: colors.grey.darken1,
              accent: colors.shades.black,
              error: colors.red.accent3,
            },
            dark: {
              primary: colors.blue.lighten3,
            },
        },
    },
})

createApp(App)
    .use(router)
    .use(store)
    .use(veutify)
    .mount('#app')
