<template lang="pug">
    div(v-touch:swipe.left="swipeLeftHandler"
            v-touch:start="startHandler" 
            v-touch:end="endHandler"
            v-touch:swipe.right="swipeRightHandler")
        div.content-wrape
            div.levelCard
                div.component-wrap.component-image
                    
                    h4 CONTACT
                div.component-wrap.component-title
                    div.title
                        h5 ありがとうございました。
                        h5 メールが送信されました!
                    div
                        router-link( to="/")
                            button.h6 ホームへ戻る
 </template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'vueLayout',
  computed: {
    ...mapState(['transitionName']),
    ...mapState(['page'])
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    handleScroll(evt) {
      if (evt.wheelDelta < 0) {
        setTimeout(() => {
          this.link_commit('/', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        setTimeout(() => {
          this.link_commit('/about/about', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      setTimeout(() => {
        this.link_commit('/', 'fromTop')
      }, 500)
    },
    startHandler() {},
    endHandler() {},
    swipeRightHandler() {
      setTimeout(() => {
        this.link_commit('/about/about', 'fromTop')
      }, 500)
    },
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
<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
.content-wrape {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: $body-bg-color;
  color: $white;
  padding-top: $header-height;
  padding-right: 0;
  @media (min-width: 960px) {
    padding-right: $aside-width;
  }
}
.levelCard {
  position: relative;
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (min-width: 960px) {
    padding: 0 5rem;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  }
  @media (min-width: 1440px) {
    padding: 0 16rem;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  }
}
// .component-wrap {
//   margin: 2rem 0;
// }
.component-image {
  width: 100%;
  height: calc(25vh - #{$header-height});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 960px) {
    width: 30%;
    height: 80vh;
  }
  border: 1px solid gray;
}
.component-title {
  position: relative;
  width: 100%;
  height: calc(75vh - #{$header-height});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  @media (min-width: 960px) {
    width: 70%;
    height: 80vh;
    padding: 0 5rem;
    justify-content: center;
    align-items: center;
  }
  border: 1px solid gray;
}
.section-wrape {
  width: 100%;
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.img {
  width: 30rem;
  height: 30rem;
}
.title {
  margin-bottom: 2rem;
}
</style>
