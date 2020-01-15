<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
        v-touch:start="startHandler" 
        v-touch:end="endHandler"
        v-touch:swipe.right="swipeRightHandler")
    div
        section.sec-wrape.flex-start
            div.left-side-50
                div.block-100 
                    div(v-for="(item, index) of filterPost.slice(1,2)" :key="item.sys.id")
                        nuxt-link(:to="'/post/' + item.fields.slug")
                            transition( appear name="slideInFromTop")
                                div.bg-img(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
                div.header-title 
                  h4.head-info-new RESENT POST    
                        
                            
            div.right-side-50
                  div.resent-wrape
                    div.resent-post(v-for="(item, index) of filterPost.slice(1,5)" :key="item.sys.id")
                        div.post-image 
                          nuxt-link(:to="'/post/' + item.fields.slug")
                            transition( appear name="slideInFromTop")
                              div.bg-resent-img(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
                        div.post-text
                          div.post-date 
                            transition( appear name="slideInFromLeft")
                              span.head-info {{item.fields.publishDate | format-date-year-month-day }}
                            transition( appear name="slideInFromLeft")
                                span.head-info.uppercase {{item.fields.stage}} 
                          div.post-title 
                            nuxt-link(:to="'/post/' + item.fields.slug")
                              transition( appear name="slideInFromLeft")
                                h6.text-ellipsis {{item.fields.title}}
                          div.post-link 
                            nuxt-link(:to="'/post/' + item.fields.slug")
                              div.link-post
                                transition( appear name="slideInFromLeft") 
                                  span 投稿を見る
                                transition( appear name="slideInFromLeft") 
                                  i.fas.fa-chevron-right

                    //-     nuxt-link(:to="'/post/' + item.fields.slug")
                    //-       transition( appear name="slideInFromTop")
                    //-           div.bg-resent-img(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
                    //-   section.buttom-block-25-resent
                    //-    div.section-wrape-post
                    //-     transition( appear name="slideInFromLeft")
                    //-         span.head-info {{item.fields.publishDate | format-date-year-month-day }}
                    //-     nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                    //-         transition( appear name="slideInFromLeft")
                    //-             span.head-info.uppercase {{item.fields.stage}}
                    //-     nuxt-link(:to="'/post/' + item.fields.slug")
                    //-         transition( appear name="slideInFromLeft")
                    //-             h6.text-ellipsis {{item.fields.title}}
                    //-     nuxt-link(:to="'/post/' + item.fields.slug")
                    //-         div.link-post
                    //-           transition( appear name="slideInFromLeft") 
                    //-             span 投稿を見る
                    //-           transition( appear name="slideInFromLeft") 
                    //-             i.fas.fa-chevron-right
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
  background-color: $body-bg-color;
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
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  // border: 1px solid yellow;
}
.resent-post {
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 25%;
  @media (min-width: 960px) {
    width: 480px;
    height: 25%;
  }
  @media (min-width: 1200px) {
    width: 600px;
    height: 25%;
  }
  @media (min-width: 1400px) {
    width: 700px;
    height: 25%;
  }
  @media (min-width: 1400px) {
    width: 700px;
    height: 25%;
  }
  @media (min-width: 1800px) {
    width: 900px;
    height: 25%;
  }
  @media (min-width: 2400px) {
    width: 1200px;
    height: 25%;
  }
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  // border: 1px solid white;
}

.post-image {
  width: calc((25vh / 2) * 1.6);
  height: 25vh;

  @media (min-width: 960px) {
    width: calc(25vh * 1.6);
    height: 25vh;
  }
  // border: 1px solid red;
}
.post-text {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}
.post-data {
  margin-bottom: 0.5rem;
}
.post-title {
  h6 {
    font-weight: $weight-light;
  }
}
.post-link {
  h6 {
    font-weight: $weight-light;
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
  width: calc((25vh / 2) * 1.6);
  height: 25vh;

  @media (min-width: 960px) {
    width: calc(25vh * 1.6);
    height: 25vh;
  }
}
.header-title {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  padding-right: 0;
  @media (min-width: 960px) {
    right: $aside-width;
    transform: translate(0, -50%);
    padding-right: 1rem;
  }
}
.head-info-new {
  color: $red;
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

.bg-black-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 50vw;
  height: 50vh;
  background: rgba(0, 0, 0, 0.3);
}

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
// .text-ellipsis {
//   max-width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
</style>
