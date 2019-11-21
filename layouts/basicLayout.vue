<template lang="pug">
  div 
    headerLayout
    nuxt
    footerLayout
</template>
<script>
import headerLayout from '~/components/basicLayout/headerLayout.vue'
import footerLayout from '~/components/basicLayout/footerLayout.vue'
export default {
  components: {
    headerLayout,
    footerLayout
  }
}
</script>
