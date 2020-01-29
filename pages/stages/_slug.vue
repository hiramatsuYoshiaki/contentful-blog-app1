<template lang="pug">
    div.content-wrape 
      section.nav-section-wrape
        breadcrumbs(:add-items="addBreads") 
      section.section-wrape 
        div.content-header 
          h3 {{ stage.fields.stage}}
              span {{ stage.fields.year }}
        div.levelCard
          div.stage-head-wrape
            div(v-if="relatedPosBytTitle.length === 0")
              cardComponent
                  template(v-slot:image)
                      img.img.bottom-margin(:src="defaultEyeCatch" 
                                        alt="defaultImage" 
                            ) 
            div(v-else)
              cardComponent(v-for="(item, index) in relatedPosBytTitle" :key="item.sys.id")
                template(v-slot:image)
                  img.img.bottom-margin(:src="setEyeCatch(item).url" 
                              :alt="setEyeCatch(item).title"  
                  )
                template(v-slot:video)
                    div.video-block.bottom-margin(v-if="item.fields.video") 
                          div.videoWrap  
                            video(autoplay="autoplay" loop muted playsinline controls)
                                source(:src="item.fields.video.fields.file.url" type="video/mp4")
                template(v-slot:map)
                    div.map-block.bottom-margin(v-if="item.fields.location") 
                          GmapMap.map-size(:center="{lat:item.fields.location.lat, lng:item.fields.location.lon}"  :zoom="16" map-type-id="satellite")
                            GmapMarker(:position="setLocation(item.fields.location.lat, item.fields.location.lon)"  :clickable="true" :draggable="false" )
          div.stage-post-wrape 
            cardPostsComponent(v-for="(item, index) in relatedPosByArticle" :key="item.sys.id")
              template(v-slot:image)
                div 
                  img.img(:src="setEyeCatch(item).url" 
                                :alt="setEyeCatch(item).title"  
                    ) 
              template(v-slot:title)
                p {{ item.fields.title }}
              template(v-slot:date) 
                p {{ item.fields.publishDate | format-date }}
              template(v-slot:link)
                nuxt-link(:to="linkTo(item)") 
                  span 投稿を見る
                  i.fas.fa-chevron-right
                  //- span {{item.fields.slug}}
                  //- span {{ $route.params }}
                  //- span {{ $route.path }}
                  //- span {{ $route.fullPath }}
                  

       
</template>
<script>
import { mapGetters } from 'vuex'
import cardComponent from '~/components/cardLayout/stages/cardComponent.vue'
import cardPostsComponent from '~/components/cardLayout/stages/cardPostsComponent.vue'
// import defaultEyeCatch from '~/assets/img/defaultEyeCatch1.png'
export default {
  layout: 'vueLayout',
  components: {
    cardComponent,
    cardPostsComponent
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
    // relatedPosts() {
    //   return this.$store.getters.relatedPosts(this.stage)
    // },
    relatedPosBytTitle() {
      return this.$store.getters.relatedPosts(this.stage).filter((item) => {
        return item.fields.titlePage
      })
    },
    relatedPosByArticle() {
      return this.$store.getters.relatedPosts(this.stage).filter((item) => {
        return !item.fields.titlePage
      })
    },
    linkTo: () => (obj) => {
      return { name: 'post-slug', params: { slug: obj.fields.slug } }
      // return { name: 'stages-post-slag', params: { slug: obj.fields.slug } }
    },
    addBreads() {
      return [
        {
          icon: 'fas fa-crown',
          text: this.stage.fields.stage,
          to: '/stages/' + this.stage.fields.stage
        }
      ]
    }
    // id() {
    //   return Number(this.$route.params.id)
    // }
  },
  async asyncData({ payload, store, params, error }) {
    const stage =
      payload ||
      (await store.state.categories.find(
        (cat) => cat.fields.stage === params.slug
      ))
    if (stage) {
      return { stage }
    } else {
      return error({ statusCode: 400 })
    }
  },
  methods: {
    setLocation(lanPosition, lonPosition) {
      const position = {
        lat: lanPosition,
        lng: lonPosition
      }
      return position
    }
  }
}
</script>
<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
$nuxt-link-color: $link-color-black;
.content-wrape {
  width: 100%;
  height: 100%;
  background-color: $body-bg-color;
  color: $white;
  padding-top: $header-height;
  padding-right: 0;
  @media (min-width: 960px) {
    padding-right: $aside-width;
  }
}
.nav-section-wrape {
  width: 100%;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  display: none;
  @media (min-width: 960px) {
    display: block;
    padding-left: 2rem;
  }
}
.levelCard {
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 960px) {
    // padding: 0 5rem;
    flex-direction: row;
  }
  // @media (min-width: 976px) {
  //   padding: 0 5rem;
  // }
  // @media (min-width: 1440px) {
  //   padding: 0 16rem;
  // }
}
.stage-head-wrape {
  width: 100%;
  @media (min-width: 1440px) {
    width: 75%;
  }
  // border: 2px solid white;
}
.stage-post-wrape {
  width: 100%;
  @media (min-width: 1440px) {
    width: 25%;
  }
}
.section-wrape {
  // padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.content-header {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  text-transform: uppercase;
  span {
    margin-left: 1rem;
  }
  h3 {
    margin-bottom: -1rem;
    font-size: $size-5;
    font-weight: 400;
    line-height: 1.5;
  }
  @media (min-width: 960px) {
    padding-left: 2rem;
    h3 {
      margin-bottom: -1rem;
      font-size: $size-3;
      font-weight: 400;
      line-height: 1.5;
    }
  }
}
img {
  width: 100%;
  height: auto;
  display: block;
  // border: 1px solid yellow;
}
a {
  color: $nuxt-link-color;
  i {
    margin-left: 0.5rem;
  }
}
.map-block {
  // position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 300px;
  // bottom: 0%;
  // left: 500px;
  // display: none;
  @media (min-width: 960px) {
    width: calc(100vw - #{$aside-width});
    height: 85vh;
  }
  @media (min-width: 1440px) {
    width: calc(74vw - #{$aside-width});
    height: 85vh;
  }
}
.map-size {
  width: 100vw;
  height: 300px;
  @media (min-width: 960px) {
    width: calc(100vw - #{$aside-width});
    height: 85vh;
  }
  @media (min-width: 1440px) {
    width: calc(74vw - #{$aside-width});
    height: 85vh;
  }
}
.video-block {
  // position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 300px;
  // bottom: 0%;
  // left: 0%;
  // @media (min-width: 500px) {
  //   width: 500px;
  // }
  // border-top: 1px solid $grey-dark;
  // border-right: 1px solid $grey-dark;
  // border-bottom: none;
  @media (min-width: 960px) {
    width: calc(100vw- #{$aside-width});
    height: 85vh;
  }
  @media (min-width: 1440px) {
    width: calc(75vw- #{$aside-width});
    height: 85vh;
  }
  // border: 1px solid red;
}
.videoWrap {
  position: relative;
  width: 100vw;
  height: 300px;
  // @media (min-width: 500px) {
  //   width: 500px;
  // }
  @media (min-width: 960px) {
    width: calc(100vw - #{$aside-width});
    height: 85vh;
  }
  @media (min-width: 1440px) {
    width: calc(75vw - #{$aside-width});
    height: 85vh;
  }
  overflow: hidden;
  // border: 3px solid green;
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
.bottom-margin {
  margin-bottom: 1rem;
  @media (min-width: 960px) {
    margin-bottom: 2rem;
  }
}
</style>
