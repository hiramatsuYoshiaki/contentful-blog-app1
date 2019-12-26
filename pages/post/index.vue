<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
        v-touch:start="startHandler" 
        v-touch:end="endHandler"
        v-touch:swipe.right="swipeRightHandler")
    div
        section.sec-wrape.my-flex.sec1.top
            div.left-side-50
                section.upper-block-75 
                    div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id")
                        nuxt-link(:to="'/post/' + item.fields.slug")
                            transition( appear name="slideInFromTop")
                                div.bg-img(:style="{background: `top left / cover no-repeat url(${setEyeCatch(item).url})`}")
                section.buttom-block-25
                    div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id")
                        div.section-wrape
                            transition( appear name="slideInFromLeft")
                                span.head-info-new NEW POST 
                            transition( appear name="slideInFromLeft")
                                span.head-info {{item.fields.publishDate | format-date-year-month-day }}
                            nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                                transition( appear name="slideInFromLeft")
                                    span.head-info.uppercase {{item.fields.stage}}
                            nuxt-link(:to="'/post/' + item.fields.slug")
                                transition( appear name="slideInFromLeft")
                                    h6.text-ellipsis {{item.fields.title}}
                            //- nuxt-link(:to="'/post/' + item.fields.slug")
                            //-   transition( appear name="slideInFromLeft")
                            //-       div.h7.text-ellipsis {{item.fields.body}}
                            nuxt-link(:to="'/post/single/' + item.fields.slug")
                                    div.link-post
                                      transition( appear name="slideInFromLeft") 
                                        span 投稿を見る
                                      transition( appear name="slideInFromLeft") 
                                        i.fas.fa-chevron-right
            div.right-side-50
                section.upper-block-10  
                    h5 RESENT POSTS
                div.buttom-block-90
                  div.resent-wrape
                    div.resent-post(v-for="(item, index) of filterPost.slice(1,5)" :key="item.sys.id")
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
                        //- transition( appear name="slideInFromLeft")
                        //-     div.h7.text-ellipsis {{item.fields.body}}
                        nuxt-link(:to="'/post/single/' + item.fields.slug")
                            div.link-post
                              transition( appear name="slideInFromLeft") 
                                span 投稿を見る
                              transition( appear name="slideInFromLeft") 
                                i.fas.fa-chevron-right
                //- section.upper-block-10  
                //-     h5 LOCATION
                //- section.buttom-block-40 
                    //- div.bg-black-filter
                    //- div.iframeWrap  
                    //-   video(autoplay="autoplay" loop controls  muted width="640" height="400")
                    //-     source(src="~/assets/img/video/nanba_parks.mp4" type="video/mp4")
                        //- <source src="myVideo.webm" type="video/webm">
                        //- <p>Your browser doesn't support HTML5 video. Here is
                        //- a <a href="myVideo.mp4">link to the video</a> instead.</p>
                        //- iframe(width="100%" height="100%" src="https://www.youtube.com/embed/PQqHxSDZENs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
                //- section.buttom-block-40 
                    //- div.iframeWrap 
                    //-  div.iframeWrap  
                    //-   video(autoplay="autoplay" loop controls  muted width="800")
                    //-     source(src="~/assets/img/video/niho_jct.mp4" type="video/mp4")

                        //- iframe( src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4088.9937292108093!2d139.7655858807337!3d35.68162180742535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sja!2sjp!4v1577155623917!5m2!1sja!2sjp" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="")
            transition( appear :name="transitionName + 'Left'")
                  div.screen.screen-left(v-if="page === '/post'")
            transition( appear :name="transitionName + 'Right'")
                div.screen.screen-right(v-if="page === '/post'") 
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
          this.link_commit('/', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      // alert('swipeLeftHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      //  this.$router.push('about')
    },
    startHandler() {
      // alert('startHandler')
      // cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('about')
      setTimeout(() => {
        this.link_commit('/', 'fromTop')
      }, 500)
    },
    endHandler() {
      // alert('endHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
      setTimeout(() => {
        this.link_commit('/tags', 'fromTop')
      }, 500)
    },
    swipeRightHandler() {
      // alert('swipeRightHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
    },
    link_commit(linkPath, tranName) {
      this.$store.commit('pagePathSet', linkPath)
      this.$store.commit('transitionNameSet', tranName)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$nuxt-link-color: $link-color;
$nuxt-link-black: $link-color-black;

.my-flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 992px) {
    flex-direction: row;
  }
}
.sec-wrape {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.left-side-50 {
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  border-right: 1px solid rgb(128, 128, 128);
  // border: 1px solid green;
  overflow: hidden;
}
.right-side-50 {
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  // border: 1px solid blue;
  overflow: hidden;
}
//2block 50 50-------
.upper-block-50 {
  width: 100%;
  height: 50%;
  border-bottom: 1px solid gray;
  overflow: hidden;
}
.buttom-block-50 {
  width: 100%;
  height: 50%;
  overflow: hidden;
}
//2block 75 25
.upper-block-75 {
  width: 100%;
  height: 75%;
  overflow: hidden;
}
.buttom-block-25 {
  width: 100%;
  height: 25%;
  overflow: hidden;
  background-color: $body-bg-color;
  color: $white;
}

//block 10 45
.upper-block-10 {
  position: relative;
  width: 100%;
  padding: 0.5rem;
  text-align: left;
  @media (min-width: 976px) {
    width: calc(100% - #{$aside-width});
    padding: 2rem 1rem 0 1rem;
    text-align: right;
  }
  height: 10%;
  overflow: hidden;
  background-color: $body-bg-color;
  h5 {
    color: $red;
  }
}
.buttom-block-40 {
  position: relative;
  width: 100%;
  @media (min-width: 976px) {
    width: calc(100% - #{$aside-width});
  }
  height: 45%;
  overflow: hidden;
}
.buttom-block-90 {
  position: relative;
  width: 100%;
  background-color: $body-bg-color;
  height: 90%;
  overflow: hidden;
  @media (min-width: 976px) {
    width: calc(100% - #{$aside-width});
  }
}
.screen {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // background-color: rgb(37, 39, 51);
  background-color: rgb(250, 250, 250);
  transform: translateY(-100%);
}
.section-wrape {
  padding: 0.5rem;
  @media (min-width: 976px) {
    padding: 3rem;
  }
}
.section-wrape-post {
  padding: 0.5rem;
  @media (min-width: 976px) {
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
  // border: 1px solid green;
}
.upper-block-resent {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (min-width: 976px) {
    // width: calc(100% - #{$aside-width});
    width: 100%;
    height: 100%;
    // padding: 2rem 1rem 0 1rem;
    // text-align: right;
  }
  // border: 1px solid white;
}
.buttom-block-25-resent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
  color: $white;
  @media (min-width: 976px) {
    height: 25%;
  }
  // border: 1px solid red;
}
.bg-img {
  width: 100vw;
  height: 37.5vh;
  @media (min-width: 976px) {
    width: 50vw;
    height: 75vh;
  }
}
.bg-resent-img {
  width: 50vw;
  height: 25vh;
  @media (min-width: 976px) {
    width: calc((50vw -#{$aside-width}) / 2);
    height: calc((50vw -#{$header-height}) / 2.2);
  }
}

.head-info-new {
  color: $red;
  font-size: $size-7;
  @media (min-width: 992px) {
    font-size: $size-4;
  }
}
.head-info {
  color: $white;
  margin-right: 0.5rem;
  font-weight: $weight-light;
  font-size: $size-7;
  @media (min-width: 992px) {
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

.link-post {
  margin-top: 0.2rem;
  span {
    margin-right: 0.5rem;
    font-size: $size-7;
  }
}
a {
  span,
  i {
    color: $red;
    cursor: pointer;
    // font-weight: $weight-light;
    &:hover {
      opacity: 0.5;
    }
  }
}
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
.text-ellipsis {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.uppercase {
  text-transform: uppercase;
}
</style>
