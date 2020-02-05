<template lang="pug">
    //- div(v-touch:swipe.top="swipeLeftHandler"
    //-     v-touch:start="startHandler" 
    //-     v-touch:end="endHandler"
    //-     v-touch:swipe.down="swipeRightHandler")
    div
      section.sec-wrape.flex-start
        div.left-side-50
          div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id")
              nuxt-link(:to="'/post/' + item.fields.slug")
                  transition( appear name="slideInFromTop")
                      div.bg-img(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
              div.bg-black-filter
              div.text-block
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
        div.right-side-50
          div.map-block 
            div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id") 
                  GmapMap.map-size(:center="{lat:item.fields.location.lat, lng:item.fields.location.lon}"  :zoom="14" map-type-id="satellite")
                      GmapMarker(:position="setLocation(item.fields.location.lat, item.fields.location.lon)"  :clickable="true" :draggable="false" )
          div.video-block 
            div(v-for="(item, index) of filterPost.slice(0,1)" :key="item.sys.id") 
              div.videoWrap  
                  video(autoplay="autoplay" loop muted playsinline controls)
                      source(:src="item.fields.video.fields.file.url" type="video/mp4")
          
        div.scroll-mouse-icon.scroll-mouse-icon__position
            i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
            div Scroll 
            div Down 
        //- div.swipe-mouse-icon.swipe-mouse-icon__position
        //-     i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
        //-     span Swipe Next   
        transition( appear :name="transitionName + 'Left'")
            div.screen-herf.screen-left(v-if="page === '/new'")
        transition( appear :name="transitionName + 'Right'")
            div.screen-herf.screen-right(v-if="page === '/new'")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'vueLayout',
  components: {},
  data() {
    return {
      scrollY: 0,
      windowHeight: 0,
      wheelMove: 0,
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
    window.addEventListener('wheel', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    setLocation(lanPosition, lonPosition) {
      const position = {
        lat: lanPosition,
        lng: lonPosition
      }
      return position
    },
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
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;

.flex-start {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row;
  }
  background-color: $body-bg-color;
}
// .left-side-100 {
//   border-bottom: 1px solid $grey-dark;
//   height: 75%;
//   @media (min-width: 960px) {
//     border-right: 1px solid $grey-dark;
//     border-bottom: none;
//     height: 100%;
//   }
// }
.left-side-50 {
  border-right: 1px solid $grey-dark;
  height: 65vh;
  @media (min-width: 960px) {
    width: 50vw;
    height: 100vh;
  }
}
.right-side-50 {
  height: 35vh;
  @media (min-width: 960px) {
    width: 50vw;
    height: 100vh;
  }
}

// .right-side-50 {
//   background-color: $body-bg-color;
//   display: none;
//   @media (min-width: 960px) {
//     display: block;
//     width: 50%;
//     padding-right: $aside-width;
//   }
// }
.upper-block-50 {
  border-bottom: 1px solid $grey-dark;
  height: 100%;
  @media (min-width: 960px) {
    height: 50%;
  }
  // border: 1px solid green;
}
.buttom-block-50 {
  background-color: rgba(0, 0, 0, 0.2);
  // display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  // z-index: -1;
  @media (min-width: 960px) {
    position: relative;
    display: block;
    height: 50%;
  }
  // border: 1px solid yellow;
}
.upper-block-75 {
  background-color: rgba(0, 0, 0, 0.1);
}
.buttom-block-25 {
  background-color: rgba(0, 0, 0, 0.2);
}

//----------------------------------------------------------------------------
.map-block {
  position: absolute;
  overflow: hidden;
  width: calc(100vw -400px);
  height: 200px;
  top: 65vh;
  left: 500px;
  display: none;
  @media (min-width: 960px) {
    display: block;
    left: 0;
    width: calc(50vw - #{$aside-width} - 15px);
    height: 35vh;
  }
  // border: 1px solid red;
}
.map-size {
  width: 50vw;
  height: 200px;
  @media (min-width: 960px) {
    width: calc(50vw - #{$aside-width});
    height: 35vh;
  }
}
.video-block {
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 35vh;
  bottom: 0%;
  left: 0%;
  @media (min-width: 500px) {
    width: 500px;
  }
  // border-top: 1px solid $grey-dark;
  border-right: 1px solid $grey-dark;
  border-bottom: none;
  @media (min-width: 960px) {
    top: 0;
    left: 0;
    width: calc(50vw - #{$aside-width} - 15px);
    height: 65vh;
    border-top: none;
    border-right: none;
    // border-bottom: 1px solid $grey-dark;
  }
  background-color: $black;
}
.videoWrap {
  position: relative;
  width: 100vw;
  height: 35vh;
  @media (min-width: 500px) {
    width: 500px;
  }
  @media (min-width: 960px) {
    width: calc(50vw - #{$aside-width});
    height: 65vh;
  }
  overflow: hidden;
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
  background-position: top center;
  //   z-index: -1;
}

.bg-img {
  width: 100vw;
  height: 100vh;
  @media (min-width: 960px) {
    width: 50vw;
    height: 100vh;
  }
}

.text-block {
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
//navigation icon
.scroll-mouse-icon__position {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 0 0 -3rem;
}
.swipe-mouse-icon__position {
  top: 60%;
  left: 0;
  transform: translate(0, -50%);
  padding-right: 0.4rem;
  text-align: right;
}
</style>
