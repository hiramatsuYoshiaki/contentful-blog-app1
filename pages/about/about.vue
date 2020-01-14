<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
          v-touch:start="startHandler" 
          v-touch:end="endHandler"
          v-touch:swipe.right="swipeRightHandler")
    div.content-wrape
      div.levelCard
          div.component-wrap.component-image
            //- div 
              //- img.img(:src="img")
            h3 ABOUT
          div.component-wrap.component-title
              h6 フォトブログ「TOURdeHDR」を２００９年から開設、その後、第二世代の「TOURdeHDR+」に移行しながら フォトブロガーとして活発に写真を投稿している。 特徴は、投稿写真の殆どが、露出の違う３枚の写真を合成したＨＤＲ写真であり、日常を非現実的な描写で表現している作品になっている。 また、ＨＤＲ写真と３Ｄモデルを合成した作品や、アニメーションなども投稿している。 初期は、サイクリング好きのため、自転車をモチーフにした写真が多数投稿されている。
      div.scroll-mouse-icon.scroll-mouse-icon__position
            i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
            div Scroll 
            div Down 
      div.swipe-mouse-icon.swipe-mouse-icon__position
          i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
          span Swipe Next   
      transition( appear :name="transitionName + 'Left'")
          div.screen-herf.screen-left(v-if="page === '/new'")
      transition( appear :name="transitionName + 'Right'")
          div.screen-herf.screen-right(v-if="page === '/new'")
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'vueLayout',
  data() {
    return {
      //   img: require('~/assets/img/brandLog2.png')
      //   img: require('~/assets/img/svg/universal1.1.svg')
      //   img: require('~/assets/img/svg/tourdehdr+svg.svg')
      img: require('~/assets/img/svg/tourdehdr_type.svg')
      //   img: require('~/assets/img/svg/rakugaki1.1.svg')
    }
  },
  computed: {
    ...mapState(['transitionName'])
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
          this.link_commit('/contact/contact', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        setTimeout(() => {
          this.link_commit('/tags', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      setTimeout(() => {
        this.link_commit('/contact/contact', 'fromTop')
      }, 500)
    },
    startHandler() {},
    endHandler() {},
    swipeRightHandler() {
      setTimeout(() => {
        this.link_commit('/tags', 'fromTop')
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
  height: calc(50vh - #{$header-height});
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
  width: 100%;
  height: calc(50vh - #{$header-height});
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
  width: 100%;
  height: auto;
}
h6 {
  line-height: 1.5rem;
  @media (min-width: 976px) {
    line-height: 2.5rem;
  }
}
.scroll-mouse-icon__position {
  top: 50%;
  left: 30%;
  margin-left: 4.6rem;
  // transform: translate(-50%, -50%);
  background-color: $body-bg-color;
}
.swipe-mouse-icon__position {
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  padding-right: 0.4rem;
  text-align: right;
}
</style>
