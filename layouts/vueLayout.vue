<template lang="pug">
  v-app 
    headerLayout
    asideLayout
    nuxt
</template>
<script>
import headerLayout from '~/components/basicLayout/headerLayout.vue'
import asideLayout from '~/components/basicLayout/asideLayout.vue'
export default {
  components: {
    headerLayout,
    asideLayout
  }
}
</script>
