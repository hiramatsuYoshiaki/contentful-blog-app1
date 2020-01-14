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
              h3 CONTACT
          div.component-wrap.component-title
              //- h5 e-mail
              //- h5 hiramatsu3300@gmail.com
              <form name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
                <p>
                  <label>Your Name: <input type="text" name="name" /></label>   
                </p>
                <p>
                  <label>Your Email: <input type="email" name="email" /></label>
                </p>
                <p>
                  <label>Your Role: <select name="role[]" multiple>
                    <option value="leader">Leader</option>
                    <option value="follower">Follower</option>
                  </select></label>
                </p>
                <p>
                  <label>Message: <textarea name="message"></textarea></label>
                </p>
                <p>
                  <button type="submit">Send</button>
                </p>
              </form>
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
  background-color: white;
  color: black;
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
h3 {
  margin-bottom: 5rem;
}
h5 {
  line-height: 2.5rem;
  @media (min-width: 976px) {
    line-height: 4rem;
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
