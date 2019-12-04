import Vue from 'vue'
import moment from 'moment'

Vue.filter('format-date', (value) => {
  const date = moment(value)
  return date.format('YYYY.MM.DD(ddd)')
})
Vue.filter('format-date-year', (value) => {
  const date = moment(value)
  return date.format('YYYY')
})
Vue.filter('format-date-year-month', (value) => {
  const date = moment(value)
  return date.format('YYYY.MM')
})
