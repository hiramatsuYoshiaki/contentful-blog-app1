<template lang="pug">
  div.container-fluid
    div.row
      div.carousel-wrape
        carousel(:autoplay="true" :per-page="1" :loop="true" :autoplay-timeout="5000" :pagination-enabled="false")
          slide(v-for="(item, i) of items.slice(0,3)" :key="i")
              div.slide-item(:style="{background: `bottom / cover no-repeat url(${item.fields.heroImage.fields.file.url})`}")
                  div.slider-content
                    div.black-filter
                    div.slider-header
                      section.title
                        h5 {{item.fields.title}}
                      section
                        h6 {{item.fields.slug}}
                      section
                        div.title-link(@click="linkSingle(item)")
                            h6 {{ linkName }}
                      //- section
                      //-   div.title-link
                      //-     nuxt-link(:to="{path: item.fields.linkpage}")
                      //-       h6 {{ item.fields.linkpagename}}
</template>
<script>
// import { mapActions, mapState, mapGetters } from 'vuex'

// import { mapMutations } from 'vuex'
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
export default {
  components: {
    Carousel,
    Slide
  },
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      linkName: 'Detail Page'
    }
  },
  methods: {
    // ...mapMutations({ setPost: 'post/setpostSingleData' }),
    linkSingle(item) {
      // this.setPost(item)
      this.$store.commit('setSingle', item)
      this.$router.push('/single/postSingle')
      // this.$router.push({
      //   name: 'post-single',
      //   params: { slug: 'TokyoBigSiteSlug' }
      // })
      // this.$router.push({
      //   name: 'post-single',
      //   params: { slug: item.fields.slug }
      // })
    }
  }
}
</script>
<style scoped lang="scss">
$carousel-padding-top: calc(#{$section-padding-top} * -1);
$carousel-padding-bottom: calc(#{$section-padding-bottom} * -1);
$carousel-height: $header-height;
$carousel-mobile-height: 50vh;
$carousel-tablet-height: 70vh;
$carousel-text-color: #fff;

.carousel-wrape {
  position: relative;
  width: 100%;
  $section-padding-topheight: 100%;
  margin-top: $carousel-padding-top;
  margin-bottom: $carousel-padding-bottom;
  padding: 0;
  overflow: hidden;
  // border: 1px solid green;
}
// .container-fluid {
//   position: relative;
//   margin-left: auto;
//   margin-right: auto;
//   padding-right: 15px;
//   padding-left: 15px;
// }
// .row {
//   margin-left: -15px;
//   margin-right: -15px;
//   display: flex;
//   justify-content: center;
//   flex-direction: row;
//   flex-wrap: wrap;
// }

.slide-item {
  position: relative;
  background-color: white;
  color: black;
  width: 100%;
  height: $carousel-mobile-height;
  margin: 0;
  padding: 0;
  @media (min-width: 768px) {
    height: $carousel-tablet-height;
  }
  @media (min-width: 976px) {
    height: calc(100vh - #{$carousel-height});
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.slider-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.slider-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
section {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h5,
  h6 {
    color: $carousel-text-color;
  }
  h5 {
    font-weight: 700;
  }

  h6 {
    font-weight: 500;
  }
}
.slider-title,
.slider-sub-title {
  width: 100%;
}

.title-link {
  margin-top: 1.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  width: 12rem;
  height: 2.2rem;
  padding: 1rem;
  cursor: pointer;
  @media (min-width: 976px) {
    width: 13rem;
    height: 3.5rem;
    background-color: #000;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  h6 {
    color: #fff;
    font-size: 16px;
  }
}
.black-filter {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: $carousel-mobile-height;
  @media (min-width: 768px) {
    height: $carousel-tablet-height;
  }
  @media (min-width: 976px) {
    width: 100vw;
    height: calc(100vh - #{$carousel-height});
  }
}
</style>
