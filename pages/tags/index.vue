<template lang="pug">
    //- div(v-touch:swipe.top="swipeLeftHandlerTag"
    //-       v-touch:swipe.down="swipeRightHandler")
    div
      section.sec-wrape.flex-start
        div.side-30.side-30-upper 
          div.tags-wrape-top
            div.tags-inner-left
              div.tags-sellect(v-for="(sellectItem, index ) of sellectItems" :key="sellectItem.id") 
                div.tags-select-wrape(:class="{ bg: index === typeIndex}")
                  div.tag-icon(@click="setType(sellectItem.name, index)") 
                    i(:class="sellectItem.iconType + ' ' + sellectItem.icon")
                  div.tag-name(@click="setType(sellectItem.name, index)") 
                    h6 {{sellectItem.name}}
        
        div.side-30.side-30-middle 
          div.tags-wrape
            div.tags-inner-middle
                h5 {{whichType}}
                p 選択してください
                div.selectWrap(:class="{selectWrapOpen: isOpen,selectWrapClose: !isOpen }")
                  select.select( v-model="selected" @change="select()" @click="isOpen=!isOpen")
                    option(v-for="(item, i) of filterSelectData " :key="item.sys.id" :value="item")
                      span(v-if="typeIndex === 0")
                        span {{item.fields.publishDate | format-date-year-month-day }}
                        span (
                        span {{ item.fields.title }}
                        span ) 
                      span(v-if="typeIndex === 1")
                        span {{ item.fields.name }} 
                        span (
                        span {{item.fields.publishDate | format-date-year-month-day }}
                        span )
                      span(v-if="typeIndex === 2 || typeIndex === 3 || typeIndex === 4")
                        span {{ item.fields.name }} 
                        span (
                        span {{ postCount(item) }}
                        span ) 
                div.tags-choose(v-if="selected")
                  nuxt-link(:to="linkTo(sellectItems[typeIndex].routesName,selected.fields.slug)")
                    div.link-post
                      span {{selected.fields.name}} 
                        span を詳しく見る
                          i.fas.fa-chevron-right
        div.side-30.side-30-bottom 
          div.tags-wrape
              div.tags-inner-bottom 
                div.select-photo(v-if="selected") 
                  div(v-for="(post, index) of filterData" :key="post.sys.id")
                    div(v-if="(index === cnt) ")
                      nuxt-link(:to="linkTo(sellectItems[typeIndex].routesName,selected.fields.slug)")
                        div.bg-img-card-post(:style="{background: `center center / contain no-repeat url(${setEyeCatch(post).url})`}") 
          
           
        div.scroll-mouse-icon.scroll-mouse-icon__position
            i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
            div Scroll 
            div Down 
        //- div.swipe-mouse-icon.swipe-mouse-icon__position
        //-     i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
        //-     span Swipe Next   
        transition( appear :name="transitionName + 'Left'")
            div.screen-width30.screen-30-left(v-if="page === '/tags'")
        transition( appear :name="transitionName + 'Right'")
            div.screen-width30.screen-30-center(v-if="page === '/tags'")
        transition( appear :name="transitionName + 'Left'")
            div.screen-width30.screen-30-right(v-if="page === '/tags'") 
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
      // isShow: false,

      // del--------
      isOpen: true,
      isOpenStage: true,
      isOpenLocation: true,
      isOpenVeichle: true,
      isOpenTimeZone: true,
      whichType: '',

      selectedStage: null,
      selectedLocation: null,
      selectedViechle: null,
      selectedTimeZone: null,
      // -----------del

      selected: null,
      routesName: 'post-slug',
      filterDtat: null,
      filterSelectData: null,
      typeIndex: 0,

      sellectItems: [
        {
          id: 0,
          name: 'Time Line',
          icon: 'fa-history',
          iconType: 'fas',
          routesName: 'post-slug'
        },
        {
          id: 1,
          name: 'Stage',
          icon: 'fa-crown',
          iconType: 'fas',
          routesName: 'categories-slug'
        }, // <i class="fas fa-map-marker-alt"></i>
        {
          id: 2,
          name: 'Location Tga',
          icon: 'fa-map-marker-alt',
          iconType: 'fas',
          routesName: 'tags-slug'
        }, // <i class="fas fa-plane"></i>
        {
          id: 3,
          name: 'Viechle Tga',
          icon: 'fa-plane',
          iconType: 'fas',
          routesName: 'tags-slug'
        }, // <i class="fas fa-plane"></i>
        {
          id: 4,
          name: 'Time Zone Tga',
          icon: 'fa-clock',
          iconType: 'fas',
          routesName: 'tags-slug'
        } // <i class="fas fa-plane"></i>
      ],
      cnt: 0,
      acrInterval: null,
      loopTime: 3000,
      size: 30,
      postLength: 1
    }
  },
  computed: {
    ...mapState(['page']),
    ...mapState(['transitionName']),
    ...mapState(['posts']),
    ...mapState(['categories']),
    ...mapState(['tags']),
    ...mapGetters(['setEyeCatch', 'setEyeCatchImage2']),

    postCount() {
      return (currentTag) => {
        return this.$store.getters.associatePosts(currentTag).length
      }
    },

    filterTagLocation() {
      return this.tags.filter(function(item) {
        return item.fields.lacation === true
      })
    },
    filterTagMove() {
      return this.tags.filter(function(item) {
        return item.fields.move === true
      })
    },
    filterTagTime() {
      return this.tags.filter(function(item) {
        return item.fields.time === true
      })
    },
    // filterPosts() {
    //   return (selectedStageSysId) => {
    //     return this.posts.filter((post) => {
    //       return post.fields.category.sys.id === selectedStageSysId
    //     })
    //   }
    // },
    linkTo: () => (routesName, slug) => {
      return { name: routesName, params: { slug } }
      // return { name: 'post-slug', params: { slug: obj.fields.slug } }
      // return { name: 'stages-post-slag', params: { slug: obj.fields.slug } }
    }
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
    this.typeIndex = 0
    this.whichType = this.sellectItems[0].name
    this.filterSelectData = this.posts
    this.loopLoding()
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    handleScroll(evt) {
      if (evt.wheelDelta < 0) {
        setTimeout(() => {
          this.link_commit('/about/about', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        setTimeout(() => {
          this.link_commit('/post', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandlerTag() {
      //  cancelAnimationFrame(this.reqAnimation)
      //  this.$router.push('about')
      setTimeout(() => {
        this.link_commit('/about/about', 'fromTop')
      }, 500)
    },

    swipeRightHandler() {
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
      setTimeout(() => {
        this.link_commit('/post', 'fromTop')
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
      this.loopTime = 3000
      this.acrInterval = setInterval(this.renderTime, this.loopTime)
    },
    loopStop(index) {
      this.cnt = index
      clearInterval(this.acrInterval)
    },
    renderTime() {
      if (this.cnt < this.postLength - 1) {
        this.cnt += 1
      } else {
        this.cnt = 0
      }
    },
    setType(type, index) {
      this.whichType = type
      this.typeIndex = index
      if (index === 0) {
        this.filterSelectData = this.posts
      } else if (index === 1) {
        this.filterSelectData = this.categories
      } else if (index === 2) {
        this.filterSelectData = this.filterTagLocation
      } else if (index === 3) {
        this.filterSelectData = this.filterTagMove
      } else if (index === 4) {
        this.filterSelectData = this.filterTagTime
      } else {
        this.filterSelectData = this.posts
      }
    },
    select() {
      if (this.typeIndex === 0) {
        this.selectPost()
      } else if (this.typeIndex === 1) {
        this.selectStage()
      } else if (
        this.typeIndex === 2 ||
        this.typeIndex === 3 ||
        this.typeIndex === 4
      ) {
        this.selectTag()
      } else {
        this.selectPost()
      }
    },
    selectPost() {
      this.filterData = this.posts.filter((post) => {
        return post.fields.slug === this.selected.fields.slug
      })
      this.postLength = this.filterData.length
    },
    selectStage() {
      // console.log(this.selectedStage.fields.slug)
      // console.log(this.selectedStage.sys.id)
      // console.log(this.filterPosts)
      this.filterData = this.posts.filter((post) => {
        return post.fields.category.sys.id === this.selected.sys.id
      })
      this.postLength = this.filterData.length
      // console.log(this.filterData.length)
    },
    selectTag() {
      // console.log('selectTag')
      // console.log(this.selected.fields.slug)
      // console.log(this.selected.sys.id)
      this.filterData = this.posts.filter((post) => {
        let mach = false
        for (const tag of post.fields.tags) {
          if (tag.sys.id === this.selected.sys.id) {
            mach = true
            // console.log('mach')
            // console.log(tag.sys.id)
          }
        }
        return mach
      })
      this.postLength = this.filterData.length
      // console.log('data' + this.postLength)
    }
  }
}
</script>

<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
$aside-bar-width: $aside-width;

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
  color: $white;
  // border-top: 1px solid $grey-dark;
}
.side-30-upper {
  border-right: none;
  @media (min-width: 960px) {
    border-right: 1px solid $grey-dark;
  }
}
.tags-wrape {
  width: 100%;
  @media (min-width: 960px) {
    height: calc(100vh - #{$header-bar-height});
    margin-top: $header-bar-height;
  }
}
.tags-wrape-top {
  width: 100%;
  height: calc(100vh - #{$header-bar-height});
  margin-top: $header-bar-height;
}
// .tags-wrape-left {
//   position: relative;
//   // border-right: none;
//   // border-bottom: 1px solid $grey-dark;
//   @media (min-width: 960px) {
//     // border-right: 1px solid $grey-dark;
//     // border-bottom: none;
//   }
// }
.tags-inner-left {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  @media (min-width: 960px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
}
.tags-sellect {
  width: 25%;
  height: calc(20vh - #{$header-bar-height});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-right: 1px solid $grey-dark;
  border-top: 1px solid $grey-dark;
  border-bottom: 1px solid $grey-dark;
  @media (min-width: 960px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 25%;
    border-right: none;
    border-bottom: none;
  }
}
.tags-select-wrape {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tag-icon {
  font-size: $size-5;
  font-weight: 400;
  line-height: 1.5;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  @media (min-width: 960px) {
    font-size: $size-2;
    font-weight: 500;
    line-height: 1.5;
  }

  // border: 1px solid red;
}
.tag-name {
  display: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  @media (min-width: 960px) {
    display: block;
  }
}
.bg {
  background-color: $red;
}
//midel--------------------------------------
// .side-30-middle {
//   border: 1px solid red;
// }
.tags-inner-middle {
  width: 100vw;
  height: 40vh;
  padding: 1rem 0 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-right: none;
  border-bottom: 1px solid $grey-dark;
  border-top: none;
  @media (min-width: 960px) {
    width: 33.333vw;
    height: calc(100vh - #{$header-bar-height});
    padding: 2rem 0 2rem 0;
    border-right: 1px solid $grey-dark;
    border-bottom: none;
    border-top: 1px solid $grey-dark;
  }
  h5 {
    margin-bottom: 1rem;
  }
}

.tags-choose {
  position: relative;
  width: 80%;
  height: 5rem;
  text-align: center;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

//test-----
.selectWrap {
  width: 80%;
  position: relative;
  display: inline-block;
  // margin-top: 2rem;
  background-color: $grey-dark;
}
.selectWrapOpen::after {
  content: '';
  width: 0.8rem;
  height: 0.8rem;
  border: 0;
  border-bottom: solid 2px #fff;
  border-right: solid 2px #fff;
  // -ms-transform: rotate(45deg);
  // -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  // transform: rotate(-135deg);
  position: absolute;
  top: 50%;
  right: 1rem;
  margin-top: -0.6rem;
  // margin-top: -0.2rem;
}
.selectWrapClose::after {
  content: '';
  width: 0.8rem;
  height: 0.8rem;
  border: 0;
  border-bottom: solid 2px #fff;
  border-right: solid 2px #fff;
  // -ms-transform: rotate(45deg);
  // -webkit-transform: rotate(45deg);
  // transform: rotate(45deg);
  transform: rotate(-135deg);
  position: absolute;
  top: 50%;
  right: 1rem;
  // margin-top: -0.6rem;
  margin-top: -0.2rem;
}

.select {
  // -webkit-appearance: none;
  // -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 2rem;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0 40px 0 10px;
  // border: 1px solid #fff;
  border-radius: 2px;
  // background-color: $grey-dark;
  font-size: $size-7;
  font-weight: 400;
  line-height: 1.5;
  @media (min-width: 960px) {
    font-size: $size-6;
    font-weight: 400;
    line-height: 1.5;
  }
  outline: 0;
}
select::-ms-expand {
  display: none;
}
option {
  background-color: $grey-dark;
}
.option-msg {
  color: $yellow;
  opacity: 1;
}

//-----test
//link-btn
.link-post {
  // margin-top: 0.2rem;
  padding: 0.5rem 1rem;
  background-color: $red;
  width: 100%;
  border-radius: $radius-large;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-top: span {
    display: inline-block;
    margin-right: 0.5rem;
    font-size: $size-7;
    color: $white;
  }
  i {
    color: $white;
    margin-left: 0.5rem;
    display: inline-block;
  }
}
// right bottom --------
// .side-30-bottom {
//   border: 1px solid darkcyan;
// }
.tags-inner-bottom {
  width: 100vw;
  height: 40vh;
  // padding: 1rem 0 1rem 0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  border-top: none;
  @media (min-width: 960px) {
    width: calc(33.3333vw - #{$aside-bar-width} - 15px);
    height: calc(100vh - #{$header-bar-height});
    // padding: 2rem 0 2rem 0;
    border-top: 1px solid $grey-dark;
  }
  h5 {
    margin-bottom: 1rem;
  }
  // border: 1px solid white;
}
.tags-select-group {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row;
  }
}
.select-photo {
  position: relative;
}
.bg-img-card-post {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100vw;
  height: 40vh;
  // width: 8rem;
  // height: 4rem;
  @media (min-width: 960px) {
    width: calc(33.3333vw - #{$aside-bar-width} - 15px);
    height: calc(100vh - #{$header-bar-height});
  }
  // border: 1px solid darkgreen;
}
.bg-img-card-test {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 10rem;
  height: 5rem;
  @media (min-width: 960px) {
    width: 10rem;
    height: 5rem;
  }
  // border: 3px solid darkgreen;
}

//-----right
// optgroup {
//   margin: 0;
// }
// option {
//   span {
//     margin: 1rem;
//   }
//   width: 100%;
//   height: 10rem;
// }

// .tags-inner-right {
//   margin-top: 0;
//   margin-right: 0;
//   height: 100%;
//   width: 100%;
//   @media (min-width: 960px) {
//     margin-top: $header-height;
//     // margin-right: ;
//     height: 70%;
//     width: calc(100% - #{$aside-width} - 15px);
//   }
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// }
// .right-side-50 {
//   border-right: 1px solid gray;
// }
// .upper-block-50 {
//   padding-top: 0;
//   border-bottom: 1px solid gray;
//   @media (min-width: 960px) {
//     padding-top: $header-height;
//   }
//   background-color: $body-bg-color;
// }

// .buttom-block-50 {
// }
// .upper-block-25 {
//   border-bottom: 1px solid gray;
//   background-color: $body-bg-color;
//   @media (min-width: 960px) {
//     width: calc(100% - #{$aside-width});
//   }
// }
// .buttom-block-75 {
//   background-color: $body-bg-color;
//   padding-bottom: 1rem;
//   @media (min-width: 960px) {
//     width: calc(100% - #{$aside-width});
//     padding-bottom: 0;
//   }
// }
// .screen-herf {
//   position: absolute;
//   width: 50%;
//   height: 100%;
//   background-color: rgb(250, 250, 250);
//   transform: translateY(-100%);
// }
// .screen-left {
//   top: 0;
//   left: 0;
// }
// .screen-right {
//   top: 0;
//   left: 50%;
// }
//----------------------------------------------------------------------------
// .type-sellect {
//   width: 100%;
//   height: 100%;
//   margin: 0;
//   padding: 0;
//   padding-top: $header-height;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   flex-direction: space-around;
//   @media (min-width: 960px) {
//     align-items: flex-end;
//   }
//   border-radius: $radius-large;
// }
// .type-sellect-color {
//   background-color: $black-bis;
// }
// .type-items {
//   padding: 0.5rem;
//   width: 33%;
//   cursor: pointer;
//   i {
//     margin-left: 0.5rem;
//     color: $body-text;
//   }
//   @media (min-width: 960px) {
//     padding: 1rem;
//   }
//   .h7 {
//     color: $body-text;
//   }
// }
// .type-list-tag {
//   position: relative;
//   width: 100%;
//   height: 100%;
//   padding: 0.5rem;
//   @media (min-width: 960px) {
//     padding: 2rem;
//   }
//   background-color: $grey-lighter;
// }
// .tag-list-wrape {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-wrap: wrap;
// }
// .tag-item {
//   width: 50%;
//   padding: 0.8rem;
//   @media (min-width: 960px) {
//     padding: 1.5rem;
//   }
// }
// .tag-item-wrape {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   flex-direction: row;
//   padding: 0 0 0 0.5rem;
//   @media (min-width: 960px) {
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     padding: 0 0 0 0;
//   }
//   i {
//     font-size: $size-5;
//     color: $blue;
//     display: inline-block;
//     margin: 0.5rem;
//     @media (min-width: 960px) {
//       font-size: $size-1;
//     }
//   }
//   .h6 {
//     margin-right: 0.2rem;
//     color: $blue;
//   }
//   background-color: $white-ter;
//   border-radius: $radius-large;
// }
// i.location-icon {
//   font-size: $size-6;
//   color: $blue;
//   display: inline-block;
//   margin: 0.5rem;
//   @media (min-width: 960px) {
//     font-size: $size-4;
//   }
// }
// .location-name {
//   font-size: $size-5;
//   color: $blue;
//   display: inline-block;
//   margin: 0.5rem;
//   @media (min-width: 960px) {
//     font-size: $size-1;
//   }
// }
// .location-cnt {
//   font-size: $size-6;
//   color: $blue;
//   display: inline-block;
//   margin: 0.5rem;
//   @media (min-width: 960px) {
//     font-size: $size-4;
//   }
// }

// .type-list-cloud-item {
//   display: inline-block;
//   margin-right: 1rem;
//   span {
//     vertical-align: bottom;
//     font-weight: $weight-semibold;
//   }
//   @media (min-width: 960px) {
//     margin-right: 2rem;
//   }
// }
// .sec-header {
//   width: 100%;
//   height: 2rem;
//   padding: 0.5rem;
//   background-color: $body-bg-color;
//   .h7 {
//     color: $white;
//   }
//   i {
//     margin-left: 0.5rem;
//   }
//   @media (min-width: 960px) {
//     height: 4rem;
//     padding: 1rem;
//   }
// }
// .type-font {
//   font-size: 10rem;
// }

// .mobile {
//   display: block;
//   @media (min-width: 960px) {
//     display: none;
//   }
// }
// .not-mobile {
//   display: none;
//   @media (min-width: 960px) {
//     display: block;
//   }
// }
// .all-btn {
//   position: absolute;
//   bottom: 0rem;
//   right: 0.5rem;
//   height: 2rem;
//   padding: 0.3rem 0.6rem;
//   margin: 0.2rem;
//   background-color: $grey-lighter;
//   border-radius: 0.5rem;
//   vertical-align: middle;
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
//   color: $body-color;
//   // cursor: pointer;
//   // font-weight: $weight-semibold;
// }
.scroll-mouse-icon__position {
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $body-bg-color;
}
.swipe-mouse-icon__position {
  top: 70%;
  left: 0;
  transform: translate(0, -50%);
  padding-right: 0.4rem;
  text-align: right;
}
</style>
