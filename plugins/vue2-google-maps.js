import Vue from 'vue'
import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    // key: 'TAbjUIOy9P1CvxbS1eDsMl8Mg7qU9QhsV6s8M0IeBKM',
    libraries: 'places'
  }
})
