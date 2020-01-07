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
                      img.img(:src="defaultEyeCatch" 
                                        alt="defaultImage" 
                            ) 
            div(v-else)
              cardComponent(v-for="(item, index) in relatedPosBytTitle" :key="item.sys.id")
                template(v-slot:image)
                      img.img(:src="setEyeCatch(item).url" 
                                  :alt="setEyeCatch(item).title"  
                      ) 

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
              //- template(v-slot:body)
              //-   h5 {{ item.fields.body}} 
              //- template(v-slot:description)
              //-   h5 {{ item.fields.description}}

              template(v-slot:link)
                nuxt-link(:to="linkTo(item)") 
                  span 投稿を見る
                  i.fas.fa-chevron-right

        //- div STAGE PAGE
        //- div {{ stage.fields.name}}
        //- div {{ stage.fields.slug}}
        //- div {{ stage.fields.sort}}
        //- div {{ stage.fields.year}}
        //- div {{ stage.fields.stage}}
        //- div {{stage}}
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
  data() {
    return {
      // defaultEyeCatch: require('~/assets/img/defaultEyeCatch1.png')
      // defaultEyeCatch: require('~/assets/img/brand_identitiy107_2w960_03.png')
      // defaultEyeCatch: require('~/assets/img/svg/universal1.1.svg')
      // defaultEyeCatch: require('~/assets/img/svg/tourdehdr+svg.svg')
    }
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
  }
}
</script>
<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
$nuxt-link-color: $link-color-black;

// .main-wrape {
//   margin-top: $header-height;
// }
// .mainLayout {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   @media (min-width: 992px) {
//     flex-direction: row;
//   }
// }
// .contents {
//   width: 100%;
//   @media (min-width: 992px) {
//     width: 100%;
//   }
// }
.content-wrape {
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
  @media (min-width: 786px) {
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
    // height: 100vh;
  }
}
.stage-post-wrape {
  // border: 1px solid green;
  width: 100%;
  // overflow-y: scroll;
  @media (min-width: 1440px) {
    width: 25%;
    // height: 100vh;
  }
}

.section-wrape {
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.content-header {
  margin-bottom: 1rem;
  padding-left: 3rem;
  text-transform: uppercase;
  span {
    margin-left: 1rem;
  }
  h3 {
    margin-bottom: -1rem;
  }
}
img {
  width: 100%;
  height: auto;
  display: block;
}
a {
  color: $nuxt-link-color;
  i {
    margin-left: 0.5rem;
  }
}
</style>
