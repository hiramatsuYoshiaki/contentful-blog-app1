<template lang="pug">
  div 
    headerLayout
    nuxt
    footerLayout
</template>
<script>
import headerLayout from '~/components/headers/defaultLayout.vue'
import footerLayout from '~/components/footers/defaultLayout.vue'
// import footerLayout from '~/components/layouts/footers/footer1Level.vue'
export default {
  components: {
    headerLayout,
    footerLayout
  }
}
</script>
