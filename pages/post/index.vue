<template lang="pug">
    //- div(v-touch:swipe.top="swipeLeftHandler"
    //-       v-touch:start="startHandler" 
    //-       v-touch:end="endHandler"
    //-       v-touch:swipe.down="swipeRightHandler")
    div
      section.sec-wrape.flex-start
        div.side-30.side-30-upper 
          div.resent-wrape.resent-wrape-left 
            div(v-for="(item, index) of filterPost.slice(displayStart,displayLimit)" :key="item.sys.id") 
              div(v-if="(index === cnt) || (index === cnt-1)")
                div.resent-header 
                  transition( appear name="slideInFromLeft")
                    h4.head-info-new RESENT POST
                  div.stage-no.uppercase.h7 
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                      transition( appear name="slideInFromLeft")
                        div  {{item.fields.category.fields.stage}}
                  div.stage-title.p 
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                      transition( appear name="slideInFromLeft")
                        div {{ item.fields.title }} 
                  div.stage-date.p 
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                      transition( appear name="slideInFromLeft")
                        div {{item.fields.publishDate | format-date}} 
                  nuxt-link(:to="'/post/' + item.fields.slug")
                    div.stage-link.link-post
                        transition( appear name="slideInFromLeft") 
                            span 投稿を見る
                        transition( appear name="slideInFromLeft") 
                            i.fas.fa-chevron-right
        div.side-30.side-30-middle 
          div.resent-wrape.resent-wrape-center 
            div.resent-inner-center 
              div(v-for="(item, index) of filterPost.slice(displayStart,displayLimit)" :key="item.sys.id")
                div(:class="{slidHidden: isSlideShowPhoto(index)}")
                  div.resent-img
                    nuxt-link(:to="'/post/' + item.fields.slug")
                      transition( appear name="slideInFromTop")
                        div.bg-img(:style="{background: `center center / contain no-repeat url(${setEyeCatch(item).url})`}")
                div(:class="{slidHidden: isSlideShowEarth(index)}")
                    div.videoWrap  
                      video(autoplay="autoplay" loop muted playsinline controls)
                          source(:src="item.fields.video.fields.file.url" type="video/mp4")
                div(:class="{slidHidden: isSlideShowMap(index)}")
                    GmapMap.map-size(:center="{lat:item.fields.location.lat, lng:item.fields.location.lon}"  :zoom="14" map-type-id="satellite" )
                      GmapMarker(:position="setLocation(item.fields.location.lat, item.fields.location.lon)"  :clickable="true" :draggable="false" )
               
                 
                      
        div.side-30.side-30-bottom 
          div.resent-wrape.resent-wrape-right 
            div.resent-inner-right
              div.right-element(:class="{ bg: whichType === typePhoto}") 
                div(@click="setTypePhoto()")
                  h4 HDR Image
                  p POST MAIN IMAGE 
              div.right-element(:class="{ bg: whichType === typeEarth}") 
                div(@click="setTypeEarth()")
                  h4 Google Earth
                  p SHOOTING PHOTO LOCATION DRONE IMAGE
              div.right-element(:class="{ bg: whichType === typeMap}")  
                div(@click="setTypeMap()")
                  h4 Google Map
                  p SHOOTIH PHOTO LOCATION 
        
        
        div.separater-header-resent
        div.scroll-mouse-icon.scroll-mouse-icon__position
            i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
            div Scroll 
            div Down 
        //- div.swipe-mouse-icon.swipe-mouse-icon__position
        //-     i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
        //-     span Swipe Next   
        transition( appear :name="transitionName + 'Left'")
            div.screen-width30.screen-30-left(v-if="page === '/post'")
        transition( appear :name="transitionName + 'Right'")
            div.screen-width30.screen-30-center(v-if="page === '/post'")
        transition( appear :name="transitionName + 'Left'")
            div.screen-width30.screen-30-right(v-if="page === '/post'")
        
        
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
      cnt: 1,
      acrInterval: null,
      loopTime: 7000,
      displayLimit: 5,
      displayStart: 0,
      whichType: 'photo',
      typePhoto: 'photo',
      typeEarth: 'earth',
      typeMap: 'map'
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

  mounted() {
    window.addEventListener('wheel', this.handleScroll)
    this.loopLoding()
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    setTypePhoto() {
      const type = this.typePhoto
      this.whichType = type
    },
    setTypeEarth() {
      const type = this.typeEarth
      this.whichType = type
    },
    setTypeMap() {
      const type = this.typeMap
      this.whichType = type
    },
    setLocation(lanPosition, lonPosition) {
      const position = {
        lat: lanPosition,
        lng: lonPosition
      }
      return position
    },
    isSlideShowPhoto(index) {
      if (index === this.cnt && this.whichType === this.typePhoto) {
        return false
      } else {
        return true
      }
    },
    isSlideShowEarth(index) {
      if (index === this.cnt && this.whichType === this.typeEarth) {
        return false
      } else {
        return true
      }
    },
    isSlideShowMap(index) {
      if (index === this.cnt && this.whichType === this.typeMap) {
        return false
      } else {
        return true
      }
    },
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
    },
    loopLoding() {
      this.cnt = 0
      this.loopTime = 7000
      this.acrInterval = setInterval(this.renderTime, this.loopTime)
    },
    renderTime() {
      if (this.cnt < this.displayLimit - 1) {
        this.cnt += 1
      } else {
        this.cnt = 0
      }
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
    flex-direction: row;
  }
}
.side-30 {
  background-color: $body-bg-color;
}

.resent-wrape {
  width: 100%;
  height: 100%;
}
.resent-wrape-left {
  position: relative;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  padding-top: $header-height;
  border-right: none;
  border-bottom: 1px solid $grey-dark;
  @media (min-width: 960px) {
    padding: 0;
    border-right: 1px solid $grey-dark;
    border-bottom: none;
  }
}
.resent-wrape-center {
  position: relative;
  // padding: 0rem;
  // @media (min-width: 960px) {
  //   padding: 1rem;
  // }
}
.resent-inner-center {
  position: relative;
  margin-top: 0;
  height: 100%;
  width: 100%;
  @media (min-width: 960px) {
    margin-top: $header-height;
    height: 70%;
  }
  border-bottom: 1px solid $grey-dark;
}
.resent-wrape-right {
  border-top: 1px solid $grey-dark;
  @media (min-width: 960px) {
    border-top: none;
  }
}
.resent-inner-right {
  margin-top: 0;
  margin-right: 0;
  height: 100%;
  width: 100%;
  @media (min-width: 960px) {
    margin-top: $header-height;
    // margin-right: ;
    height: 70%;
    width: calc(100% - #{$aside-width} - 15px);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.right-element {
  height: 33.3333%;
  width: 100%;
  border-bottom: 1px solid $grey-dark;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem 0.5rem;
  h4 {
    margin-top: 0.5rem;
    font-size: $size-5;
    font-weight: 400;
    line-height: 1.5;
  }
  p {
    font-size: $size-7;
    font-weight: 500;
    line-height: 1.5;
  }
  @media (min-width: 960px) {
    border-left: 1px solid $grey-dark;
    padding: 1rem 3rem;
    // h4 {
    //   font-size: $size-5;
    //   font-weight: 300;
    //   line-height: 1.5;
    // }
    // p {
    //   font-size: $size-7;
    //   font-weight: 300;
    //   line-height: 1.5;
    // }
  }
  @media (min-width: 1440px) {
    h4 {
      font-size: $size-4;
      font-weight: 400;
      line-height: 1.5;
    }
  }

  h4,
  p {
    color: $white;
    font-weight: $weight-light;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  div {
    width: 90%;
  }
}
.resent-header {
  position: absolute;
  top: 0%;
  left: 0%;
  // transform: translate(-50%, -50%);
  // border: 1px solid red;
  width: 100%;
  background-color: $body-bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: $header-height;
  padding-top: 0;
  @media (min-width: 960px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 0;
  }
}
.resent-img {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  // border: 1px solid greenyellow;
  // padding: 1rem;
}
.bg-img {
  width: 100%;
  height: 100%;
  @media (min-width: 960px) {
    // width: 10rem;
    // height: 5rem;
    width: 100%;
    height: 100%;
  }
}
.map-block {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  // display: none;
  // @media (min-width: 960px) {
  //   // display: block;
  //   left: 50%;
  //   width: calc(50vw - #{$aside-width});
  //   height: 35vh;
  // }
}
.map-size {
  width: 100vw;
  height: 25vh;
  @media (min-width: 960px) {
    width: 33.333vw;
    height: 70vh;
  }
}
.video-block {
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 250px;
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
    left: 50%;
    width: calc(50vw - #{$aside-width});
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
  height: 250px;
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

.scroll-mouse-icon.scroll-mouse-icon__position {
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
}
.slidShow {
  display: block;
}
.slidHidden {
  display: none;
}
.bg {
  background-color: $red;
}
// .right-side-50 {
//   border-right: 1px solid $grey-dark;
//   background-color: $body-bg-color;
// }

// .block-100 {
//   @media (min-width: 960px) {
//     width: calc(100% - #{$aside-width});
//   }
//   border-bottom: 1px solid $grey-dark;
// }
// .buttom-block-25 {
//   width: 100%;
//   @media (min-width: 960px) {
//     width: calc(100% - #{$aside-width});
//   }
//   height: 25%;
//   color: $white;
//   margin-bottom: 3rem;
// }

// .section-wrape {
//   padding: 0.5rem;
//   @media (min-width: 960px) {
//     padding: 3rem;
//   }
// }

// .section-wrape-post {
//   padding: 0.5rem;
//   @media (min-width: 960px) {
//     padding: 0.5rem;
//   }
// }
// .resent-wrape {
//   position: relative;
//   overflow: hidden;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   flex-wrap: wrap;
//   // border: 1px solid yellow;
// }
// .resent-post {
//   position: relative;
//   overflow: hidden;
//   width: 400px;
//   height: 25%;
//   @media (min-width: 960px) {
//     width: 480px;
//     height: 25%;
//   }
//   @media (min-width: 1200px) {
//     width: 600px;
//     height: 25%;
//   }
//   @media (min-width: 1400px) {
//     width: 700px;
//     height: 25%;
//   }
//   @media (min-width: 1400px) {
//     width: 700px;
//     height: 25%;
//   }
//   @media (min-width: 1800px) {
//     width: 900px;
//     height: 25%;
//   }
//   @media (min-width: 2400px) {
//     width: 1200px;
//     height: 25%;
//   }
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-start;
//   flex-direction: row;
//   // border: 1px solid white;
// }

// .post-image {
//   width: calc((25vh / 2) * 1.6);
//   height: 25vh;

//   @media (min-width: 960px) {
//     width: calc(25vh * 1.6);
//     height: 25vh;
//   }
//   // border: 1px solid red;
// }
// .post-text {
//   overflow: hidden;
//   width: 100%;
//   height: 100%;
//   padding: 0.5rem;
// }
// .post-data {
//   margin-bottom: 0.5rem;
// }
// .post-title {
//   h6 {
//     font-weight: $weight-light;
//   }
// }
// .post-link {
//   h6 {
//     font-weight: $weight-light;
//   }
// }

// .bg-img {
//   width: 100vw;
//   height: 50vh;
//   @media (min-width: 960px) {
//     width: 50vw;
//     height: 100vh;
//   }
// }
// .bg-resent-img {
//   width: calc((25vh / 2) * 1.6);
//   height: 25vh;

//   @media (min-width: 960px) {
//     width: calc(25vh * 1.6);
//     height: 25vh;
//   }
// }
// .header-title {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   // padding-right: 0;
//   background-color: $body-bg-color;
//   @media (min-width: 960px) {
//     // right: $aside-width;
//     transform: translate(-50, -50%);
//     // padding-right: 1rem;
//   }
// }
.head-info-new {
  color: $red;
  margin-bottom: 0.4rem;
  @media (min-width: 960px) {
    margin-bottom: 1rem;
  }
}
.stage-no,
.stage-title,
.stage-date,
.stage-body {
  a div {
    color: $white;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}
.stage-link {
  margin-top: 0.4rem;
  @media (min-width: 960px) {
    margin-top: 1rem;
  }
}

// .head-info {
//   color: $white;
//   margin-right: 0.5rem;
//   font-weight: $weight-light;
//   font-size: $size-7;
//   @media (min-width: 960px) {
//     font-size: $size-6;
//   }
// }

// h1,
// h2,
// h3,
// h4,
// h5,
// h6,
// p,
// .h1,
// .h2,
// .h3,
// .h4,
// .h5,
// .h6,
// .h7,
// .h8,
// p {
//   color: $white;
// cursor: pointer;
// font-weight: $weight-semibold;
// &:hover {
//   opacity: 0.5;
// }
// }

// .bg-black-filter {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 50vw;
//   height: 50vh;
//   background: rgba(0, 0, 0, 0.3);
// }

// //navigation icon
// .scroll-mouse-icon__position {
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   margin: 0 0 0 3rem;
// }
.swipe-mouse-icon__position {
  top: 70%;
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
