<template lang="pug">
  div.headerbarWrap
    nav.navbar(:style="{background:bgColor, position:position}")
        div.brand
            brand2Parts
        div.glovalMenu
            glovalMenu(:nav="menus")
        div.burger
          burger
    nav.modalMenu(v-if="isOpenMobileMenu")
        div.mobileBrand
            brand2Parts
        div.mobileMenu
            mobileMenu(:nav="menus")
        div.mobileBurger
            burger
</template>
<script>
import { mapState } from 'vuex'
import burger from '~/components/basicLayout/headers/burger.vue'
import brand2Parts from '~/components/basicLayout/headers/brand2Parts.vue'
import glovalMenu from '~/components/basicLayout/headers/glovalMenu.vue'
import mobileMenu from '~/components/basicLayout/headers/mobileMenu.vue'
export default {
  components: {
    glovalMenu,
    mobileMenu,
    brand2Parts,
    burger
  },
  props: {
    bgColor: {
      type: String,
      default: 'transparent'
    },
    position: {
      type: String,
      default: 'relative'
    }
  },
  data() {
    return {
      menus: [
        {
          title: 'Home',
          to: { name: '/' }
        },
        // {
        //   title: 'Blog',
        //   to: { name: '/post' }
        // },
        // {
        //   title: 'Stage',
        //   to: { name: '/blog' }
        // },
        {
          title: 'About',
          to: { name: '/about/about' }
        },
        // {
        //   title: 'FAQ',
        //   to: { name: '/faq/faq' }
        // },
        {
          title: 'Contact',
          to: { name: '/contact/contact' }
        }
      ]
    }
  },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
  }
}
</script>
<style lang="scss" scoped>
.headerbarWrap {
  position: fixed;
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
  height: 4rem;
  padding: 0 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: $body-text;
}
.modalMenu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: calc(100vh + 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  color: $body-text;
  padding-bottom: 4rem;
}
.brand {
  width: 50%;
  padding-left: $aside-width;
}
.mobileBrand {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.burger {
  width: 50%;
  display: block;
  @media (min-width: 976px) {
    display: none;
  }
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.mobileBurger {
  width: 30px;
}
.glovalMenu {
  width: 50%;
  padding-right: $aside-width;
  display: none;
  @media (min-width: 976px) {
    display: block;
  }
}
</style>
