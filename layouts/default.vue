<template lang="pug">
  div 
    headerLayout
    nuxt
    footerLayout
</template>
<script>
import headerLayout from '~/components/defaultLayout/headerLayout.vue'
import footerLayout from '~/components/defaultLayout/footerLayout.vue'
export default {
  components: {
    headerLayout,
    footerLayout
  }
}
</script>
