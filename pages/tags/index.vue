<template lang="pug">
    //- div(v-touch:swipe.left="swipeLeftHandler"
    //-       v-touch:start="startHandler" 
    //-       v-touch:end="endHandler"
    //-       v-touch:swipe.right="swipeRightHandler")
    div
      section.sec-wrape.flex-start
        div.side-30.side-30-upper 
          div.tags-wrape-top
            div.tags-inner-left
              div.tags-sellect(v-for="(sellectItem, index ) of sellectItems" :key="sellectItem.id")  
                div.tag-icon(@click="setType(sellectItem.name)") 
                  i(:class="sellectItem.iconType + ' ' + sellectItem.icon")
                div.tag-name 
                  h6 {{sellectItem.name}}
        
        div.side-30.side-30-middle 
          div.tags-wrape
            div.tags-inner-middle 
              h5 {{whichType}}
              p 選択してください。
              div.selectWrap(:class="{selectWrapOpen: isOpen,selectWrapClose: !isOpen }")
                select.select( v-model="selected" @click="isOpen=!isOpen")
                  //- option.option-msg( disabled value="" selected) 
                  //-   span 選択してください。
                  option(v-for="(item, i) of posts " :key="item.sys.id" :value="item")
                      span {{item.fields.publishDate | format-date-year-month-day }}
                      span.span-space -
                      span {{ item.fields.title }} 
              div.tags-choose(v-if="selected")
                  nuxt-link(:to="'/posts/' + selected.fields.slug")
                    div.link-post
                      span {{selected.fields.title}} 
                        span を詳しく見る
                          i.fas.fa-chevron-right
                  div {{selected.fields.slug}}

        div.side-30.side-30-bottom 
          div.tags-wrape
            div.tags-choose(v-if="selected")
              div select: {{selected.fields.slug}}

              div(v-for="(item, index) of posts" :key="item.sys.id")
                 div(v-if="item.fields.slug == selected.fields.slug")
                    div.bg-img-card(:style="{background: `center center / cover no-repeat url(${setEyeCatch(item).url})`}")
                  
                  
                 
                  
                
            //- div.card-top
            //-         div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
            //-           transition( appear name="slideInFromTop")
            //-             div.img-wrape-card(v-if="(index === cnt) || (index === cnt-1)")
            //-               div.bg-img-card(:style="{background: `top center / cover no-repeat url(${setEyeCatch(item).url})`}")


          

            //- div.right-side-50
            //-   div.upper-block-50
            //-     div.sec-header 
            //-       div.h7 TITLE
            //-         i(class="fas fa-crown")
            //-     div.type-list-category 
            //-           div(v-for="(item, i) of categories " :key="item.sys.id")
            //-             nuxt-link(:to="'/categories/' + item.fields.slug")
            //-                 span {{i + 1}}.
            //-                 span {{ item.fields.name }}
            //-                 span.cat-date {{item.fields.publishDate | format-date-year-month-day }}

        
        //- div.left-side-50
        //-   div.upper-block-25 
        //-     div.type-sellect
        //-       div.type-items(v-for="(typeItem, index ) of  typeItems" :key="typeItem.id" :class="{'type-sellect-color': cnt===index}") 
        //-         div(@click="loopStop(index)")
        //-           div.h7.uppercase {{typeItem.name}}
        //-             i(:class="typeItem.iconType + ' ' + typeItem.icon")
        //-   div.buttom-block-75
        //-     div.tag-list-wrape(v-if="cnt===0")
        //-       div.tag-item(v-for="(item, i) of filterTagTime " :key="item.sys.id" )
        //-             div.tag-item-wrape
        //-               div
        //-                 div(v-if="item.fields.icon")
        //-                   nuxt-link(:to="'/tags/' + item.fields.slug") 
        //-                     i(:class="item.fields.iconSolidStyle + ' ' + item.fields.icon")
        //-                 div(v-else)
        //-                   i(class="fas fa-tag")
        //-               div 
        //-                   nuxt-link(:to="'/tags/' + item.fields.slug") 
        //-                     span.h6.uppercase {{ item.fields.name }} 
        //-                     span.h6 ({{ postCount(item) }})
        //-     div.tag-list-wrape.location(v-if="cnt===1")
        //-         div.tag-item(v-for="(item, i) of filterTagLocation " :key="item.sys.id" )
        //-             div.tag-item-wrape
        //-               div
        //-                 div(v-if="item.fields.icon")
        //-                   nuxt-link(:to="'/tags/' + item.fields.slug") 
        //-                     i.location-icon(:class="item.fields.iconSolidStyle + ' ' + item.fields.icon")
        //-                 div(v-else)
        //-                   i.location-icon(class="fas fa-tag")
        //-               div 
        //-                   nuxt-link(:to="'/tags/' + item.fields.slug") 
        //-                     span.location-name.h6.uppercase {{ item.fields.name }} 
        //-                     span.location-cnt.h6 ({{ postCount(item) }})
        //-     div.tag-list-wrape(v-if="cnt===2")
        //-         div.tag-item(v-for="(item, i) of filterTagMove " :key="item.sys.id" )
        //-             div.tag-item-wrape
        //-               div
        //-                 div(v-if="item.fields.icon")
        //-                   nuxt-link(:to="'/tags/' + item.fields.slug") 
        //-                     i(:class="item.fields.iconSolidStyle + ' ' + item.fields.icon")
        //-                 div(v-else)
        //-                   i(class="fas fa-tag")
        //-               div 
        //-                   nuxt-link(:to="'/tags/' + item.fields.slug") 
        //-                     span.h6.uppercase {{ item.fields.name }} 
        //-                     span.h6 ({{ postCount(item) }})
                 
        //- div.right-side-50
        //-   div.upper-block-50
        //-     div.sec-header 
        //-       div.h7 TITLE
        //-         i(class="fas fa-crown")
        //-     div.type-list-category 
        //-           div(v-for="(item, i) of categories " :key="item.sys.id")
        //-             nuxt-link(:to="'/categories/' + item.fields.slug")
        //-                 span {{i + 1}}.
        //-                 span {{ item.fields.name }}
        //-                 span.cat-date {{item.fields.publishDate | format-date-year-month-day }}
           
        //-   div.buttom-block-50 
        //-     div.sec-header 
        //-       div.h7 TAG CLOUD
        //-         i(class="fas fa-tag")
        //-     div.type-list-tag
        //-           div.type-list-cloud-item(v-for="(item, i) of tags " :key="item.sys.id" )
        //-               nuxt-link.not-mobile(:to="'/tags/' + item.fields.slug")
        //-                   span(:style="{fontSize: `${setFontSize(postCount(item))}rem`}") {{ item.fields.name }}
        //-                   span(:style="{fontSize: `${setFontSize(postCount(item))}rem`}") ({{ postCount(item) }})
        //-               nuxt-link.mobile(:to="'/tags/' + item.fields.slug")
        //-                   span {{ i+1 }}.
        //-                   span {{ item.fields.name }}
        //-                   span ({{ postCount(item) }})
           
        //- div.scroll-mouse-icon.scroll-mouse-icon__position
        //-     i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
        //-     div Scroll 
        //-     div Down 
        //- div.swipe-mouse-icon.swipe-mouse-icon__position
        //-     i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
        //-     span Swipe Next   
        transition( appear :name="transitionName + 'Left'")
            div.screen-herf.screen-left(v-if="page === '/tags'")
        transition( appear :name="transitionName + 'Right'")
            div.screen-herf.screen-right(v-if="page === '/tags'")   
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
      isShow: false,
      isOpen: true,
      whichType: '',
      selected: null,
      test: null,
      // typeItems: [
      //   { id: 0, name: 'time', icon: 'fa-clock', iconType: 'far' },
      //   { id: 1, name: 'lacation', icon: 'fa-map-marker-alt', iconType: 'fas' }, // <i class="fas fa-map-marker-alt"></i>
      //   { id: 2, name: 'move', icon: 'fa-plane', iconType: 'fas' } // <i class="fas fa-plane"></i>
      // ],
      sellectItems: [
        { id: 0, name: 'Time Line', icon: 'fa-history', iconType: 'fas' },
        { id: 1, name: 'Stage', icon: 'fa-crown', iconType: 'fas' }, // <i class="fas fa-map-marker-alt"></i>
        {
          id: 2,
          name: 'Location Tga',
          icon: 'fa-map-marker-alt',
          iconType: 'fas'
        }, // <i class="fas fa-plane"></i>
        { id: 3, name: 'Viechle Tga', icon: 'fa-plane', iconType: 'fas' }, // <i class="fas fa-plane"></i>
        { id: 4, name: 'Time Zone Tga', icon: 'fa-clock', iconType: 'fas' } // <i class="fas fa-plane"></i>
      ],
      cnt: 0,
      acrInterval: null,
      loopTime: 5000,
      size: 30
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
    filterTagTime() {
      return this.tags.filter(function(item) {
        return item.fields.time === true
      })
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
    }
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
    this.whichType = this.sellectItems[0].name
    // this.loopLoding()
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    setType(type) {
      this.whichType = type
    },
    handleScroll(evt) {
      if (evt.wheelDelta < 0) {
        alert('about')
        setTimeout(() => {
          this.link_commit('/about/about', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        alert('post')
        setTimeout(() => {
          this.link_commit('/post', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      // alert('swipeLeftHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      //  this.$router.push('about')
      alert('swipe about')
      setTimeout(() => {
        this.link_commit('/about/about', 'fromTop')
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
        this.link_commit('/post', 'fromTop')
      }, 500)
    },
    link_commit(linkPath, tranName) {
      this.$store.commit('pagePathSet', linkPath)
      this.$store.commit('transitionNameSet', tranName)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 1000)
    }
    // loopLoding() {
    //   console.log('loop')
    //   this.cnt = 0
    //   this.loopTime = 5000
    //   this.acrInterval = setInterval(this.renderTime, this.loopTime)
    // },
    // loopStop(index) {
    //   console.log('stop')
    //   this.cnt = index
    //   clearInterval(this.acrInterval)
    // },
    // renderTime() {
    //   if (this.cnt < this.typeItems.length - 1) {
    //     this.cnt += 1
    //   } else {
    //     this.cnt = 0
    //   }
    // }
    // setFontSize(postCnt) {
    //   if (postCnt < 2) {
    //     return 1.5
    //   } else if (postCnt < 5) {
    //     return 2
    //   } else if (postCnt < 10) {
    //     return 4
    //   } else if (postCnt < 20) {
    //     return 5
    //   } else if (postCnt < 50) {
    //     return 6
    //   } else {
    //     return 7
    //   }
    // }
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
}
.side-30 {
  background-color: $body-bg-color;
  color: $white;
  // border-top: 1px solid $grey-dark;
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
  border: 1px solid yellow;
}
.tags-sellect {
  width: 25%;
  height: calc(20vh - #{$header-bar-height});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  // border-right: 1px solid $grey-dark;
  // border-top: 1px solid $grey-dark;
  // border-bottom: 1px solid $grey-dark;
  @media (min-width: 960px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 25%;
    // border-right: none;
    // border-bottom: none;
  }
  border: 1px solid green;
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
//midel--------------------------------------

.side-30-middle {
  border: 1px solid red;
}
.tags-inner-middle {
  width: 100vw;
  height: calc(100vh - #{$header-bar-height});
  padding: 1rem 0 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  @media (min-width: 960px) {
    width: 33.333vw;
    height: calc(100vh - #{$header-bar-height});
    padding: 2rem 0 2rem 0;
  }
  h5 {
    margin-bottom: 1rem;
  }
  border: 1px solid white;
}
// .select-header {
//   position: relative;
//   width: 50%;
//   height: $size-3;
// }
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
  // border: 1px solid white;
}

.span-space {
  margin: 0 1rem;
  display: inline-block;
  color: red;
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
  color: yellow;
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
  span {
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
// right--------
.bg-img-card {
  width: 10rem;
  height: 5rem;
  @media (min-width: 960px) {
    width: 10rem;
    height: 5rem;
  }
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
// .scroll-mouse-icon__position {
//   top: 50%;
//   right: 50%;
//   transform: translate(-50%, -50%);
//   background-color: $body-bg-color;
// }
// .swipe-mouse-icon__position {
//   top: 50%;
//   left: 0;
//   transform: translate(0, -50%);
//   padding-right: 0.4rem;
//   text-align: right;
// }
</style>
