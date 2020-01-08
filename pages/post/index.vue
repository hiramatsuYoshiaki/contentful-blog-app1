<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
        v-touch:start="startHandler" 
        v-touch:end="endHandler"
        v-touch:swipe.right="swipeRightHandler")
    div
        section.sec-wrape.flex-start
            div.left-side-50
                section.block-100 
                    div(v-for="(item, index) of filterPost.slice(1,2)" :key="item.sys.id")
                        nuxt-link(:to="'/post/' + item.fields.slug")
                            transition( appear name="slideInFromTop")
                                div.bg-img(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
                section.buttom-block-25.absolute-block
                    div(v-for="(item, index) of filterPost.slice(1,2)" :key="item.sys.id")
                        div.section-wrape
                            //- transition( appear name="slideInFromLeft")
                            //-     div.head-info-new RESENT POSTS 
                            transition( appear name="slideInFromLeft")
                                span.head-info {{item.fields.publishDate | format-date-year-month-day }}
                            nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                                transition( appear name="slideInFromLeft")
                                    span.head-info.uppercase {{item.fields.stage}}
                            nuxt-link(:to="'/post/' + item.fields.slug")
                                transition( appear name="slideInFromLeft")
                                    h6.text-ellipsis {{item.fields.title}}
                            nuxt-link(:to="'/post/' + item.fields.slug")
                                    span.link-post
                                      transition( appear name="slideInFromLeft") 
                                        span 投稿を見る
                                      transition( appear name="slideInFromLeft") 
                                        i.fas.fa-chevron-right
            div.right-side-50
                section.upper-block-10  
                    h5 RESENT POSTS
                div.buttom-block-90
                  div.resent-wrape
                    div.resent-post(v-for="(item, index) of filterPost.slice(2,6)" :key="item.sys.id")
                      section.upper-block-resent
                        nuxt-link(:to="'/post/' + item.fields.slug")
                          transition( appear name="slideInFromTop")
                              div.bg-resent-img(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
                      section.buttom-block-25-resent
                       div.section-wrape-post
                        transition( appear name="slideInFromLeft")
                            span.head-info {{item.fields.publishDate | format-date-year-month-day }}
                        nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                            transition( appear name="slideInFromLeft")
                                span.head-info.uppercase {{item.fields.stage}}
                        nuxt-link(:to="'/post/' + item.fields.slug")
                            transition( appear name="slideInFromLeft")
                                h6.text-ellipsis {{item.fields.title}}
                        nuxt-link(:to="'/post/' + item.fields.slug")
                            div.link-post
                              transition( appear name="slideInFromLeft") 
                                span 投稿を見る
                              transition( appear name="slideInFromLeft") 
                                i.fas.fa-chevron-right
            div.scroll-mouse-icon.scroll-mouse-icon__position
                i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
                div Scroll 
                div Down 
            div.swipe-mouse-icon.swipe-mouse-icon__position
                i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
                span Swipe Next   
            transition( appear :name="transitionName + 'Left'")
                div.screen-herf.screen-left(v-if="page === '/post'")
            transition( appear :name="transitionName + 'Right'")
                div.screen-herf.screen-right(v-if="page === '/post'")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import client from '~/plugins/contentful'
// import vueCarouselBGImageComponent from '~/components/carousels/vueCarouselBGImageComponent.vue'
// import vuetifyCarouselComponent from '~/components/carousels/vuetifyCarouselComponent.vue'
// import levelNewPostComponent from '~/components/cardLayout/newPosts/levelNewPostComponent.vue'
// import levelJurnalComponent from '~/components/cardLayout/jurnal/levelJurnalComponent.vue'
// import levelPostlistComponent from '~/components/cardLayout/postlist/levelPostlistComponent.vue'
// import levelCategoriesComponent from '~/components/cardLayout/categories/levelCategoriesComponent.vue'
// import levelTagsComponent from '~/components/cardLayout/tags/levelTagsComponent.vue'

export default {
  layout: 'vueLayout',
  components: {
    // vueCarouselBGImageComponent,
    // vuetifyCarouselComponent,
    // levelJurnalComponent,
    // levelPostlistComponent,
    // levelCategoriesComponent,
    // levelTagsComponent,
    // levelNewPostComponent
  },
  data() {
    return {
      scrollY: 0,
      windowHeight: 0,
      wheelMove: 0
    }
  },
  computed: {
    ...mapState(['page']),
    ...mapState(['transitionName']),
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapGetters(['setEyeCatch']),
    filterPost() {
      return this.posts.filter(function(item) {
        return item.fields.titlePage === false
      })
    }
  },
  // async asyncData({ env }) {
  //   let posts = []
  //   await client
  //     .getEntries({
  //       content_type: env.CTF_BLOG_POST_TYPE_ID,
  //       order: '-fields.publishDate'
  //       // 'limit': 3
  //     })
  //     .then((res) => {
  //       posts = res.items
  //       // this.$store.commit('post/setpostAllData', posts)
  //     })
  //     .catch((err) => {
  //       console.log('Error: ' + err)
  //     })
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    // handleScroll(evt, el) {
    //   const top = el.getBoundingClientRect().top
    //   this.scrollY = top
    //   this.windowHeight = window.innerHeight
    // if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
    //   this.isShow = true
    // } else {
    //   this.isShow = false
    // }
    // },
    handleScroll(evt) {
      // this.wheelMove += evt.wheelDelta
      if (evt.wheelDelta < 0) {
        // console.log('stages--> categories' + evt.wheelDelta)
        // this.link_commit('/tags', 'fromTop')
        setTimeout(() => {
          this.link_commit('/tags', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        // console.log('stages--> /' + evt.wheelDelta)
        // this.link_commit('/', 'fromTop')
        setTimeout(() => {
          this.link_commit('/new', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      // alert('swipeLeftHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      //  this.$router.push('about')
      setTimeout(() => {
        this.link_commit('/tags', 'fromTop')
      }, 500)
    },
    startHandler() {
      // alert('startHandler')
      // cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('about')
    },
    endHandler() {
      // alert('endHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
    },
    swipeRightHandler() {
      // alert('swipeRightHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
      setTimeout(() => {
        this.link_commit('/new', 'fromTop')
      }, 500)
    },
    link_commit(linkPath, tranName) {
      this.$store.commit('pagePathSet', linkPath)
      this.$store.commit('transitionNameSet', tranName)
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
$nuxt-link-color: $link-color;
$nuxt-link-black: $link-color-black;
.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row-reverse;
  }
}

// .left-side-50 {
// }
.right-side-50 {
  border-right: 1px solid $grey-dark;
}

.block-100 {
  @media (min-width: 960px) {
    width: calc(100% - #{$aside-width});
  }
  border-bottom: 1px solid $grey-dark;
}
.buttom-block-25 {
  width: 100%;
  @media (min-width: 960px) {
    width: calc(100% - #{$aside-width});
  }
  height: 25%;
  color: $white;
  margin-bottom: 3rem;
}
.absolute-block {
  position: absolute;
  bottom: 0;
  left: 0;
}

//block 10 45
.upper-block-10 {
  padding: 0.5rem 1rem 0 0.5rem;
  text-align: left;
  @media (min-width: 960px) {
    padding: 2.5rem 1rem 0 0.5rem;
  }
  background-color: $body-bg-color;
  h5 {
    color: $red;
  }
  border-bottom: 1px solid $grey-dark;
}
// .buttom-block-40 {
// }
.buttom-block-90 {
  background-color: $body-bg-color;
  overflow: hidden;
}

.screen {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(250, 250, 250);
  transform: translateY(-100%);
}
.section-wrape {
  padding: 0.5rem;
  @media (min-width: 960px) {
    padding: 3rem;
  }
}
.section-wrape-post {
  padding: 0.5rem;
  @media (min-width: 960px) {
    padding: 0.5rem;
  }
}
.resent-wrape {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
}
.resent-post {
  position: relative;
  width: 50%;
  height: 50%;
  overflow: hidden;
}
.upper-block-resent {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (min-width: 960px) {
    // width: calc(100% - #{$aside-width});
    width: 100%;
    height: 100%;
    // padding: 2rem 1rem 0 1rem;
    // text-align: right;
  }
  border-bottom: 1px solid $grey-dark;
}
.buttom-block-25-resent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 30%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
  color: $white;
  @media (min-width: 960px) {
    height: 25%;
    padding-top: 0;
  }
}
.bg-img {
  width: 100vw;
  height: 50vh;
  @media (min-width: 960px) {
    width: 50vw;
    height: 100vh;
  }
}
.bg-resent-img {
  width: 50vw;
  height: 25vh;
  @media (min-width: 960px) {
    width: calc((50vw -#{$aside-width}) / 2);
    height: calc((50vw -#{$header-height}) / 2.2);
  }
}

.head-info-new {
  color: $red;
  font-size: $size-6;
  @media (min-width: 960px) {
    font-size: $size-4;
  }
}
.head-info {
  color: $white;
  margin-right: 0.5rem;
  font-weight: $weight-light;
  font-size: $size-7;
  @media (min-width: 960px) {
    font-size: $size-6;
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
.h7,
.h8,
p {
  color: $white;
  cursor: pointer;
  font-weight: $weight-semibold;
  &:hover {
    opacity: 0.5;
  }
}

// .link-post {
//   margin-top: 0.2rem;
//   padding: 0.2rem;
//   background-color: $red;
//   width: 8rem;
//   border-radius: $radius-large;
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   span {
//     margin-right: 0.5rem;
//     font-size: $size-7;
//     color: $white;
//   }
//   i {
//     color: $white;
//   }
// }
// a {
//   span,
//   i {
//     color: $red;
//     cursor: pointer;
//     &:hover {
//       opacity: 0.5;
//     }
//   }
// }
.iframeWrap {
  height: 0;
  padding-bottom: 50%;
}

iframe {
  position: absolute;
  top: 0;
  left: 0;
}
.bg-black-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 50vw;
  height: 50vh;
  background: rgba(0, 0, 0, 0.3);
}
// .text-ellipsis {
//   max-width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
// .uppercase {
//   text-transform: uppercase;
// }
//navigation icon
.scroll-mouse-icon__position {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 0 0 3rem;
}
.swipe-mouse-icon__position {
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  padding-right: 0.4rem;
  text-align: right;
}
</style>
