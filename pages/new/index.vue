<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
      v-touch:start="startHandler" 
      v-touch:end="endHandler"
      v-touch:swipe.right="swipeRightHandler")
    div
      section.sec-wrape.my-flex.sec1.top
        div.left-side-100
                //- div.upper-block-50 
                div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id")
                    nuxt-link(:to="'/post/' + item.fields.slug")
                        transition( appear name="slideInFromTop")
                            div.bg-img(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
                    div.bg-black-filter
                    div.text-black
                        div.new-post
                          transition( appear name="slideInFromLeft")
                            h5.head-info-new NEW POST 
                        span
                          transition( appear name="slideInFromLeft")
                            span.head-info {{item.fields.publishDate | format-date-year-month-day }}
                        nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                            transition( appear name="slideInFromLeft")
                                    span.head-info.uppercase {{item.fields.stage}}
                        nuxt-link(:to="'/post/' + item.fields.slug")
                            transition( appear name="slideInFromLeft")
                                        h4.text-ellipsis {{item.fields.title}}
                        nuxt-link(:to="'/post/' + item.fields.slug")
                            div.link-post
                                transition( appear name="slideInFromLeft") 
                                    span 投稿を見る
                                transition( appear name="slideInFromLeft") 
                                    i.fas.fa-chevron-right
                    
                //- div.buttom-block-50
                //-     div text
                transition( appear :name="transitionName + 'Left'")
                    div.screen(v-if="page === '/stages'")  
        div.right-side-50
          div.upper-block-50 
             div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id") 
                div.videoWrap  
                    video(autoplay="autoplay" loop muted playsinline controls)
                        source(:src="item.fields.video.fields.file.url" type="video/mp4")
                //- div {{item.fields.video.fields.file.url}}
          div.buttom-block-50 
            
            div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id") 
                //- div {{item.fields.location.lon}}
                //- div {{item.fields.location.lat}}
                GmapMap.map-size(  :center="{lat:item.fields.location.lat, lng:item.fields.location.lon}"  :zoom="16" map-type-id="satellite")
                    //- GmapMap(center="{lat:10, lng:10}" zoom="7" map-type-id="terrain"  style="width: 500px; height: 300px")
                    //- GmapMarker( :position="position: setPosition(item.fields.location.lat, item.fields.location.lon)" :clickable="true" :draggable="true"  )
                    GmapMarker(v-for="m in marker_items" :position="m.position" :title="m.title" :clickable="true" :draggable="false" :key="m.id")
            //- div.bg-black-filter
          transition( appear :name="transitionName + 'Right'")
              div.screen(v-if="page === '/stages'")
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
      wheelMove: 0,
      // isSection1: true,
      // isSection2: true,
      // isSection3: true,
      // isSection4: true,
      // jurnalTitle: 'DISCOVER BLOG ',
      // categoryTitle: 'CATEGORIES',
      // postTitle: '最近の投稿',
      // tagTitle: 'TAGS',
      // newPostTitle: '最新の投稿'
      pos: { lat: 35.71, lng: 139.72 },
      marker_items: [
        { id: 1, position: { lat: 34.6616, lng: 135.5019 }, title: 'marker_1' }
        // { id: 2, position: { lat: 35.76, lng: 139.72 }, title: 'marker_2' },
        // { id: 3, position: { lat: 35.85, lng: 139.72 }, title: 'marker_3' },
        // { id: 4, position: { lat: 35.95, lng: 139.72 }, title: 'marker_4' }
      ]
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
    console.log('stages mounted')
    window.addEventListener('wheel', this.handleScroll)
    console.log('stages addEventListener')
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
    console.log('stages removeEventListener')
  },
  methods: {
    // setPosition(lanPosition, lonPosition) {
    //   const position = {
    //     lat: lanPosition,
    //     lng: lonPosition
    //   }
    //   return position
    // },

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
        setTimeout(() => {
          this.link_commit('/post', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        setTimeout(() => {
          this.link_commit('/', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      // alert('swipeLeftHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      //  this.$router.push('about')
      setTimeout(() => {
        this.link_commit('/post', 'fromTop')
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
        this.link_commit('/', 'fromTop')
      }, 500)
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
$header-bar-height: $header-height;

.my-flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 960px) {
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
.left-side-100 {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-right: none;
  border-bottom: 1px solid $grey-dark;
  @media (min-width: 960px) {
    width: 50%;
    border-right: 1px solid $grey-dark;
    border-bottom: none;
  }
}
.left-side-50 {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  @media (min-width: 960px) {
    width: 50%;
  }
  border-right: 1px solid $grey-dark;
}
.right-side-50 {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  @media (min-width: 960px) {
    width: 50%;
    padding-right: $aside-width;
  }
  background-color: $body-bg-color;
}
.upper-block-50 {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50%;
  border-bottom: 1px solid $grey-dark;
}

.buttom-block-50 {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}
.upper-block-75 {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.1);
}
.buttom-block-25 {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.2);
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
//----------------------------------------------------------------------------
.main-wrape {
  margin-top: $header-height;
}
.mainLayout {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 960px) {
    flex-direction: row;
  }
}
.contents {
  width: 100%;
  @media (min-width: 960px) {
    width: 100%;
  }
}
.section-wrape {
  width: 100%;
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.sideContents {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  // border: 1px solid black;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.mainContent {
  width: 100%;
  // border: 1px solid red;
  @media (min-width: 768px) {
    width: 70%;
  }
}
.aside {
  width: 100%;
  height: 100%;
  // border: 1px solid green;
  @media (min-width: 768px) {
    width: 30%;
  }
  // background-color: $grey-lighter;
}
// img {
//   width: 300px;
//   height: 175px;
// }
.bg-img {
  width: 100vw;
  height: 50vh;
  @media (min-width: 960px) {
    width: 50vw;
    height: 100vh;
  }
}
.text-black {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: calc(1rem + #{$header-height});
  margin-left: 1rem;
  @media (min-width: 960px) {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    height: 25%;
    margin-top: 0;
  }
  color: white;
}
.new-post h5 {
  color: $red;
}
.link-post {
  margin-top: 0.2rem;
  padding: 0.2rem;
  background-color: $red;
  width: 8rem;
  border-radius: $radius-large;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-right: 0.5rem;
    font-size: $size-7;
    color: $white;
  }
  i {
    color: $white;
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
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  @media (min-width: 960px) {
    width: 50vw;
  }
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
.videoWrap {
  width: 100vw;
  height: 25vh;
  position: relative;
  //   height: 0;
  //   padding-bottom: 50%;
  @media (min-width: 960px) {
    width: calc(50vw - #{$aside-width});
    height: 50vh;
  }
}
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-width: 100%;
  min-height: 100%;
  //   background: url('../images/bg.png') no-repeat;
  background-size: cover;
  background-position: center;
  //   z-index: -1;
}
.map-size {
  width: 100vw;
  height: 25vh;
  @media (min-width: 960px) {
    width: calc(50vw - #{$aside-width});
    height: 50vh;
  }
}
</style>
