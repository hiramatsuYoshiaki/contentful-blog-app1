<template lang="pug">
    div.content
          div.container-fluid
            div.row
              section.nav-section-wrape
                breadcrumbs(:add-items="addBreads")
          div.container-fluid
            div.row
                div(v-if="currentPost")
                  div(v-if="currentPost.fields.heroImage")
                    section.section-wrape.heroimage-section
                      div.heroimage-image
                        cardHeroImageComponent
                          template(v-slot:image)
                            div 
                              img.img-phto(
                                          :src="setEyeCatch(currentPost).url" 
                                          :alt="setEyeCatch(currentPost).title" class="img" 
                                          ) 
                      div.heroimage-body
                        cardHeroBodyComponent
                          
                          template(v-slot:title)
                            h4 {{ currentPost.fields.title }}
                          template(v-slot:date)
                            span {{ currentPost.fields.publishDate | format-date}}
                            span {{currentPost.fields.stage}}
                          template(v-slot:body)
                            div.h7 {{ currentPost.fields.body}} 
                          template(v-slot:description)
                            div.h7 {{ currentPost.fields.description}}
                          template.category(v-slot:category)
                            nuxt-link(:to="'/categories/' + currentPost.fields.category.fields.slug")
                              i.fas.fa-folder
                              span {{ currentPost.fields.category.fields.name}}
                            //- nuxt-link(:to="linkTo(item)") 
                            //- span 投稿を見る
                            //- i.fas.fa-chevron-right
                            //- nuxt-link(:to="'/tags/' + item.fields.slug")
                            //- span {{i + 1}}.{{ item.fields.name }}
                            //- span ({{ postCount(item) }})
                          template(v-slot:tags)
                            span.tags(v-for="(item,i) in currentPost.fields.tags" :key="item.sys.id")
                              nuxt-link(:to="'/tags/' + item.fields.slug")
                                i.fas.fa-tags
                                span {{ item.fields.name}}
                  //- Image
                  div(v-if="currentPost.fields.image") 
                    section.section-wrape.image-section
                      div.image-body
                        cardBodyComponent
                          template(v-slot:title)
                            h5 {{ currentPost.fields.image.fields.title }} 
                          template(v-slot:description) 
                            p {{ currentPost.fields.image.fields.description }} 
                      div.image-image
                        cardImageComponent
                          template(v-slot:image)
                            div
                              img.img-phto(
                                          :src="setEyeCatchImage(currentPost).url" 
                                          :alt="setEyeCatchImage(currentPost).title" class="img" 
                                          )
                              //- img.img-phto(
                              //-             :src="setEyeCatchImage(currentPost).url" 
                              //-             :alt="setEyeCatchImage(currentPost).title" class="img" 
                              //-             v-if="currentPost.fields.transitionPost"
                              //-             )
                  //- Image2    
                  div(v-if="currentPost.fields.image2") 
                    section.image-many-section
                      div.image-many
                        cardImageManyComponent(v-for="(item, index) in currentPost.fields.image2" :key="item.sys.id" :idx="index")
                          template(v-slot:image)
                            div
                              img.img-phto(
                                          :src="setEyeCatchImage2(item).url" 
                                          :alt="setEyeCatchImage2(item).title" class="img" 
                                          )
                              //- img.img-phto(
                              //-             :src="setEyeCatchImage2(item).url" 
                              //-             :alt="setEyeCatchImage2(item).title" class="img" 
                              //-             v-if="currentPost.fields.transitionPost"
                              //-             )
                          template(v-slot:title)
                            h5 {{ item.fields.title }}
                          template(v-slot:description) 
                            p {{ item.fields.description  }} 
                    
                  
                  //- p {{ currentPost.fields}} 
                div(v-else)
                    div not found
</template>
<script>
import { mapGetters } from 'vuex'
// import breadcrumbs from '~/components/ui/breadcrumbs.vue'
// import client from '~/plugins/contentful'
import cardHeroImageComponent from '~/components/cardLayout/post/cardHeroImageComponent.vue'
import cardHeroBodyComponent from '~/components/cardLayout/post/cardHeroBodyComponent.vue'
import cardImageComponent from '~/components/cardLayout/post/cardImageComponent.vue'
import cardBodyComponent from '~/components/cardLayout/post/cardBodyComponent.vue'
import cardImageManyComponent from '~/components/cardLayout/post/cardImageManyComponent.vue'
export default {
  layout: 'vueLayout',
  components: {
    cardHeroImageComponent,
    cardHeroBodyComponent,
    cardImageComponent,
    cardBodyComponent,
    cardImageManyComponent
    // breadcrumbs
  },
  computed: {
    ...mapGetters(['setEyeCatch', 'setEyeCatchImage', 'setEyeCatchImage2']),
    addBreads() {
      return [
        {
          icon: 'fas fa-folder',
          text: this.category.fields.name,
          to: '/categories/' + this.category.fields.slug
        }
        // {
        //   icon: 'fas fa-camera',
        //   text: this.currentPost.fields.title,
        //   to: '/posts/'
        // }
      ]
    }
  },

  //   computed: {
  //     ...mapState(['posts'])
  //     //   currentPost() {
  //     //     return this.$store.getters.currentPosts(this.category)
  //     //   }
  //   }
  //   async asyncData({ env, params }) {
  //     let currentPost = null
  //     await client
  //       .getEntries({
  //         content_type: env.CTF_BLOG_POST_TYPE_ID,
  //         'fields.slug': params.slug
  //       })
  //       .then((res) => (currentPost = res.items[0]))
  //       .catch(console.error)
  //     return { currentPost }
  //   }
  async asyncData({ payload, store, params, error }) {
    const currentPost =
      payload ||
      (await store.state.posts.find((post) => post.fields.slug === params.slug))

    if (currentPost) {
      return {
        currentPost,
        category: currentPost.fields.category
      }
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
.content {
  background-color: $body-bg-color;
  color: $white;
  padding-top: $header-height;
  @media (min-width: 960px) {
    padding-right: $aside-width;
  }
}

// .main-wrape {
//   margin-top: $header-height;
//   background-color: $header-bg-color;
// }
// .mainLayout {
//   width: 100%;
// display: flex;
// flex-direction: column;
// justify-content: flex-start;
// align-items: flex-start;

// @media (min-width: 992px) {
//   flex-direction: row;
// }
//   overflow-x: hidden;
// }
// .contents {
//   width: 100%;
//   @media (min-width: 992px) {
//     width: 100%;
//   }
// }
.nav-section-wrape {
  width: 100%;
  padding-top: 0.5rem;
}
.section-wrape {
  width: 100%;
  padding-top: $section-padding-top;
  // padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
  border: 1px dotted;
}
.heroimage-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 960px) {
    flex-direction: row;
  }
  overflow: hidden;
}
.heroimage-image {
  width: 100%;
  @media (min-width: 960px) {
    width: 70%;
  }
  border: 1px dotted;
}
.heroimage-body {
  width: 100%;
  @media (min-width: 960px) {
    width: 30%;
  }
  border: 1px dotted;
}
.image-image {
  width: 100%;
  @media (min-width: 960px) {
    width: 70%;
  }
}
.image-body {
  width: 100%;
  @media (min-width: 960px) {
    width: 30%;
  }
}
.image-many {
  width: 100%;
  @media (min-width: 960px) {
    width: 50%;
  }
}
.image-section {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 960px) {
    flex-direction: row;
  }
  // margin-bottom: 10rem;
  // border: 1px solid orangered;
}
.image-many-section {
  // border: 3px solid blue;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  @media (min-width: 960px) {
    flex-direction: row;
  }
  // margin-bottom: 5rem;
}
img {
  width: 100%;
  height: auto;
}
.category {
  i {
    margin-right: 0.5rem;
  }
}
.tags {
  i {
    margin-right: 0.5rem;
  }
  span {
    margin-right: 1.5rem;
  }
}
// a {
//   color: $nuxt-link-color;
// }
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
.uppercase {
  text-transform: uppercase;
}
</style>
