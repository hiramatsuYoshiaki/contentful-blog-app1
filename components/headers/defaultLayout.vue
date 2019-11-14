<template lang="pug">
    div.headerbarWrap
        nav.navbar
            div.burger.burger__cursol(@click="openMobileMenu()") burgerOpen
            div brand 
            div.glovalMenu glovalMenu 
            div loginMenu 

        nav.modalMenu(v-if="isOpenMobileMenu")
            div brand 
            div mobileMenu 
            div loginMenu 
            div.burger__cursol(@click="openMobileMenu()") burgerClose
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
  },
  methods: {
    ...mapMutations({ open: 'headerBar/setOpenMobileMenu' }),
    // ...mapMutation({ name: store(directory)/mutations})
    openMobileMenu() {
      // this.isOpenMobileMenu = !this.isOpenMobileMenu
      // this.$store.commit('headerBar/setOpenMobileMenu')
      this.open()
    }
  }
}
</script>
<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;

.headerbarWrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
}
.navbar {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: $header-bar-height;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $header-bg-color;
  color: $header-text-color;
  @media (min-width: 992px) {
    justify-content: space-around;
  }
}
.modalMenu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: calc(100vh + #{$header-bar-height});
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: $header-bg-color;
  color: $header-text-color;
  padding-bottom: 4rem;
}
.burger {
  display: block;
  @media (min-width: 976px) {
    display: none;
  }
}
.burger__cursol {
  cursor: pointer;
}
.glovalMenu {
  display: none;
  @media (min-width: 976px) {
    display: block;
  }
}
</style>
