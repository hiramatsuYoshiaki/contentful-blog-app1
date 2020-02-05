<template lang="pug">
  div.wrape
    ul
      li(v-for="(item, key) of nav" :key="key")
        //- nuxt-link(:to="item.to.name")
        //-   span.uppercase {{ item.title }}
        span.uppercase(@click="link_commit(item.to.name, 'fromTop')") {{ item.title }} 
</template>
<script>
export default {
  props: {
    nav: {
      type: Array,
      default: null
    }
  },
  methods: {
    link_commit(linkPath, trnName) {
      this.$store.commit('pagePathSet', linkPath)
      this.$store.commit('transitionNameSet', trnName)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 1000)
    }
  }
}
</script>
<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
}
li {
  display: inline;
  padding: 0 0.4rem;
}
// a span {
//   color: $body-text;
//   text-decoration: none;
// }
span {
  color: $body-text;
  text-decoration: none;
  cursor: pointer;
}
.uppercase {
  text-transform: uppercase;
}
</style>
