import {createVuetify} from 'vuetify'
import * as  components from 'vuetify/components'
import * as  directives from 'vuetify/directives'
import {fa} from 'vuetify/locale'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: false,
        components,
        directives,
        theme: {
            defaultTheme: localStorage.getItem('isDark') == 1 ? 'dark' : 'light'
        },
        locale: {
            locale: fa,
            messages: {fa}
        }
    })
    nuxtApp.vueApp.use(vuetify)
})