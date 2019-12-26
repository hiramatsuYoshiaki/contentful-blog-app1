<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
        v-touch:start="startHandler" 
        v-touch:end="endHandler"
        v-touch:swipe.right="swipeRightHandler")
    div
      section.sec-wrape.my-flex
        div.left-side-50
          div.upper-block-25 
            div.type-sellect
              div.type-items(v-for="(typeItem, index ) of  typeItems" :key="typeItem.id" :class="{'type-sellect-color': cnt===index}") 
                div(@click="loopStop(index)")
                  div.h7.uppercase {{typeItem.name}}
                    i(:class="typeItem.iconType + ' ' + typeItem.icon")
             
           
          div.buttom-block-75
            div.tag-list-wrape(v-if="cnt===0")
              div.tag-item(v-for="(item, i) of filterTagTime " :key="item.sys.id" )
                    div.tag-item-wrape
                      div
                        div(v-if="item.fields.icon")
                          nuxt-link(:to="'/tags/' + item.fields.slug") 
                            i(:class="item.fields.iconSolidStyle + ' ' + item.fields.icon")
                        div(v-else)
                          i(class="fas fa-tag")
                      div 
                          nuxt-link(:to="'/tags/' + item.fields.slug") 
                            span.h6.uppercase {{ item.fields.name }} 
                            span.h6 ({{ postCount(item) }})
            div.tag-list-wrape.location(v-if="cnt===1")
                div.tag-item(v-for="(item, i) of filterTagLocation " :key="item.sys.id" )
                    div.tag-item-wrape
                      div
                        div(v-if="item.fields.icon")
                          nuxt-link(:to="'/tags/' + item.fields.slug") 
                            i.location-icon(:class="item.fields.iconSolidStyle + ' ' + item.fields.icon")
                        div(v-else)
                          i.location-icon(class="fas fa-tag")
                      div 
                          nuxt-link(:to="'/tags/' + item.fields.slug") 
                            span.location-name.h6.uppercase {{ item.fields.name }} 
                            span.location-cnt.h6 ({{ postCount(item) }})
            div.tag-list-wrape(v-if="cnt===2")
                div.tag-item(v-for="(item, i) of filterTagMove " :key="item.sys.id" )
                    div.tag-item-wrape
                      div
                        div(v-if="item.fields.icon")
                          nuxt-link(:to="'/tags/' + item.fields.slug") 
                            i(:class="item.fields.iconSolidStyle + ' ' + item.fields.icon")
                        div(v-else)
                          i(class="fas fa-tag")
                      div 
                          nuxt-link(:to="'/tags/' + item.fields.slug") 
                            span.h6.uppercase {{ item.fields.name }} 
                            span.h6 ({{ postCount(item) }})
                 
        div.right-side-50
          div.upper-block-50
            div.sec-header 
              div.h7 TITLE
                i(class="fas fa-crown")
            div.type-list-category 
                  div(v-for="(item, i) of categories " :key="item.sys.id")
                    nuxt-link(:to="'/categories/' + item.fields.slug")
                        span {{i + 1}}.
                        span {{ item.fields.name }}
                        span.cat-date {{item.fields.publishDate | format-date-year-month-day }}
           
          div.buttom-block-50 
            div.sec-header 
              div.h7 TAG CLOUD
                i(class="fas fa-tag")
            div.type-list-tag
                  div.type-list-cloud-item(v-for="(item, i) of tags " :key="item.sys.id" )
                      nuxt-link.not-mobile(:to="'/tags/' + item.fields.slug")
                          span(:style="{fontSize: `${setFontSize(postCount(item))}rem`}") {{ item.fields.name }}
                          span(:style="{fontSize: `${setFontSize(postCount(item))}rem`}") ({{ postCount(item) }})
                      nuxt-link.mobile(:to="'/tags/' + item.fields.slug")
                          span {{ i+1 }}.
                          span {{ item.fields.name }}
                          span ({{ postCount(item) }})
           
           
        transition( appear :name="transitionName + 'Left'")
            div.screen.screen-left(v-if="page === '/tags'")
        transition( appear :name="transitionName + 'Right'")
            div.screen.screen-right(v-if="page === '/tags'")
          
</template>

<script>
import { mapState } from 'vuex'
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
      isShow: false,
      isOpen: true,
      typeItems: [
        { id: 0, name: 'time', icon: 'fa-clock', iconType: 'far' },
        { id: 1, name: 'lacation', icon: 'fa-map-marker-alt', iconType: 'fas' }, // <i class="fas fa-map-marker-alt"></i>
        { id: 2, name: 'move', icon: 'fa-plane', iconType: 'fas' } // <i class="fas fa-plane"></i>
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
    this.loopLoding()
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
        setTimeout(() => {
          this.link_commit('/categories', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        setTimeout(() => {
          this.link_commit('/post', 'fromTop')
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
        this.link_commit('/post', 'fromTop')
      }, 500)
    },
    endHandler() {
      // alert('endHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
      setTimeout(() => {
        this.link_commit('/categories', 'fromTop')
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
    },
    loopLoding() {
      console.log('loop')
      this.cnt = 0
      this.loopTime = 5000
      this.acrInterval = setInterval(this.renderTime, this.loopTime)
    },
    loopStop(index) {
      console.log('stop')
      this.cnt = index
      clearInterval(this.acrInterval)
    },
    renderTime() {
      if (this.cnt < this.typeItems.length - 1) {
        this.cnt += 1
      } else {
        this.cnt = 0
      }
    },
    setFontSize(postCnt) {
      if (postCnt < 2) {
        return 1.5
      } else if (postCnt < 5) {
        return 2
      } else if (postCnt < 10) {
        return 4
      } else if (postCnt < 20) {
        return 5
      } else if (postCnt < 50) {
        return 6
      } else {
        return 7
      }
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
  position: relative;
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  border-right: 1px solid gray;
  // background-color: $body-bg-color;
  overflow: hidden;
}
.right-side-50 {
  position: relative;
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  overflow: hidden;
}
.upper-block-50 {
  position: relative;
  width: 100%;
  height: 50%;
  padding-top: 0;
  border-bottom: 1px solid gray;
  // overflow-y: scroll;
  overflow: hidden;
  @media (min-width: 976px) {
    width: calc(100% - #{$aside-width});
    padding-top: $header-height;
  }
  background-color: $body-bg-color;
}

.buttom-block-50 {
  position: relative;
  width: 100%;
  height: 50%;
  // overflow-y: scroll;
  overflow: hidden;
  @media (min-width: 976px) {
    width: calc(100% - #{$aside-width});
  }
}
.upper-block-25 {
  position: relative;
  width: 100%;
  height: 25%;
  overflow: hidden;
  border-bottom: 1px solid gray;
  background-color: $body-bg-color;
}
.buttom-block-75 {
  position: relative;
  width: 100%;
  height: 75%;
  overflow: hidden;
}
.screen {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(37, 39, 51);
  // background-color: rgb(250, 250, 250);
  transform: translateY(-100%);
}
//----------------------------------------------------------------------------
.type-sellect {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  padding-top: $header-height;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: space-around;
  @media (min-width: 976px) {
    align-items: flex-end;
  }
  border-radius: $radius-large;
}
.type-sellect-color {
  background-color: $green;
}
.type-items {
  padding: 0.5rem;
  width: 33%;
  cursor: pointer;
  i {
    margin-left: 0.5rem;
    color: $body-text;
  }
  @media (min-width: 976px) {
    padding: 1rem;
  }
  .h7 {
    color: $body-text;
  }
}
.type-list-tag {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  @media (min-width: 976px) {
    padding: 2rem;
  }
  // vertical-align: bottom;
}
.tag-list-wrape {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.tag-item {
  width: 50%;
  padding: 0.8rem;
  @media (min-width: 976px) {
    padding: 1.5rem;
  }
}
.tag-item-wrape {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding: 0 0 0 0.5rem;
  @media (min-width: 976px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0 0 0;
  }
  i {
    font-size: $size-5;
    color: $blue;
    display: inline-block;
    margin: 0.5rem;
    @media (min-width: 976px) {
      font-size: $size-1;
    }
  }
  .h6 {
    margin-right: 0.2rem;
    color: $blue;
  }
  background-color: $white-ter;
  border-radius: $radius-large;
}
i.location-icon {
  font-size: $size-6;
  color: $blue;
  display: inline-block;
  margin: 0.5rem;
  @media (min-width: 976px) {
    font-size: $size-4;
  }
}
.location-name {
  font-size: $size-5;
  color: $blue;
  display: inline-block;
  margin: 0.5rem;
  @media (min-width: 976px) {
    font-size: $size-1;
  }
}
.location-cnt {
  font-size: $size-6;
  color: $blue;
  display: inline-block;
  margin: 0.5rem;
  @media (min-width: 976px) {
    font-size: $size-4;
  }
}

.type-list-category {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  @media (min-width: 976px) {
    padding: 2rem;
  }
  vertical-align: bottom;
  background-color: $white;
  .cat-date {
    color: $grey;
    margin-left: 0.5rem;
    display: none;
    @media (min-width: 976px) {
      display: inline-block;
    }
  }
}

.type-list-cloud-item {
  display: inline-block;
  margin-right: 1rem;
  span {
    vertical-align: bottom;
    font-weight: $weight-semibold;
  }
  @media (min-width: 976px) {
    margin-right: 2rem;
  }
}
.sec-header {
  width: 100%;
  height: 2rem;
  padding: 0.5rem;
  background-color: $green;
  .h7 {
    color: $white;
  }
  i {
    margin-left: 0.5rem;
  }
  @media (min-width: 976px) {
    height: 4rem;
    padding: 1rem;
  }
}
.type-font {
  font-size: 10rem;
}

.mobile {
  display: block;
  @media (min-width: 976px) {
    display: none;
  }
}
.not-mobile {
  display: none;
  @media (min-width: 976px) {
    display: block;
  }
}
.all-btn {
  position: absolute;
  bottom: 0rem;
  right: 0.5rem;
  height: 2rem;
  padding: 0.3rem 0.6rem;
  margin: 0.2rem;
  border: 1px solid $green;
  background-color: $white;
  border-radius: 0.5rem;
  vertical-align: middle;
}
// img {
//   width: 300px;
//   height: 175px;
// }

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
  color: $body-color;
  // cursor: pointer;
  // font-weight: $weight-semibold;
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
