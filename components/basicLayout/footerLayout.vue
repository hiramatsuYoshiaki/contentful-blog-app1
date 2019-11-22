<template lang="pug">
  div.footerBarWrape
    div.footerBar
        div.elementWrape
            brand2Parts
        div.elementWrape
            mobileMenu(:nav="menus")
        div.elementWrape
            loginMenu
</template>
<script>
import mobileMenu from '~/components/basicLayout/headers/mobileMenu.vue'
import loginMenu from '~/components/basicLayout/headers/loginMenu.vue'
import brand2Parts from '~/components/basicLayout/headers/brand2Parts.vue'

export default {
  components: {
    loginMenu,
    mobileMenu,
    brand2Parts
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
          to: { name: '/blog/faq/faq' }
        },
        {
          title: 'FAQ',
          to: { name: '/blog/faq/faq' }
        },
        {
          title: 'Contact',
          to: { name: '/blog/contact/contact' }
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.footerBarWrape {
  position: relative;
  width: 100%;
  background-color: #333;
}
.footerBar {
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: $body-text;
}
.elementWrape {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
