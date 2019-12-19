<template lang="pug">
    div.asideWrape(:style="{background:asideBgColor}")
        nav.asideBar
            div.sns-icon
                nuxt-link( to="https://www.instagram.com/yoshiak_hiramatsu_hdr/?hl=ja") 
                    i.fab.fa-instagram
            div.sns-icon
                nuxt-link( to="https://twitter.com/TOURdeHDR") 
                    i.fab.fa-twitter
</template>
<script>
export default {
  props: {
    asideBgColor: {
      type: String,
      default: 'transparent'
    },
    position: {
      type: String,
      default: 'relative'
    },
    nav: {
      type: Array,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
.asideWrape {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9998;
  width: $aside-width;
  height: 100%;
  display: none;
  @media (min-width: 976px) {
    display: block;
  }
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}
.asideBar {
  width: 100%;
  height: 100%;
  padding-top: $header-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
a {
  color: $grey;
  cursor: pointer;
  i {
    color: $grey;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
