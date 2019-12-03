<template lang="pug">
    div.main-wrape 
      div.mainLayout
        div.contents
          div.container-fluid
            div.row
              section.nav-section-wrape
                breadcrumbs(:add-items="addBreads")
          div.container-fluid
            div.row
                //- heroImage
                div(v-if="currentPost")
                  div(v-if="currentPost.fields.heroImage")
                    section.section-wrape.heroImage-section
                      cardHeroImageComponent
                        template(v-slot:image)
                          div 
                            img.img-phto(
                                        :src="setEyeCatch(currentPost).url" 
                                        :alt="setEyeCatch(currentPost).title" class="img" 
                                        v-if="currentPost.fields.transitionPost"
                                        ) 
                      cardHeroBodyComponent
                        template(v-slot:title)
                          h4 {{ currentPost.fields.title }}
                        template(v-slot:date)
                          p {{ currentPost.fields.publishDate | format-date}}
                        template(v-slot:body)
                          p {{ currentPost.fields.body}} 
                        template(v-slot:description)
                          p {{ currentPost.fields.description}}
                          
                  //- Image
                  div(v-if="currentPost.fields.image") 
                    section.section-wrape.image-section
                      cardBodyComponent
                        template(v-slot:title)
                          h5 {{ currentPost.fields.image.fields.title }} 
                        template(v-slot:description) 
                          p {{ currentPost.fields.image.fields.description }} 
                      cardImageComponent
                        template(v-slot:image)
                          div
                            img.img-phto(
                                        :src="setEyeCatchImage(currentPost).url" 
                                        :alt="setEyeCatchImage(currentPost).title" class="img" 
                                        v-if="currentPost.fields.transitionPost"
                                        )
                  //- Image2    
                  div(v-if="currentPost.fields.image2") 
                    section.image-many-section
                        cardImageManyComponent(v-for="(item, index) in currentPost.fields.image2" :key="item.sys.id" :idx="index")
                          template(v-slot:image)
                            div
                              img.img-phto(
                                          :src="setEyeCatchImage2(item).url" 
                                          :alt="setEyeCatchImage2(item).title" class="img" 
                                          v-if="currentPost.fields.transitionPost"
                                          )
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
  layout: 'basicLayout',
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

.main-wrape {
  margin-top: $header-height;
}
.mainLayout {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 992px) {
    flex-direction: row;
  }
}
.contents {
  width: 100%;
  @media (min-width: 992px) {
    width: 100%;
  }
}
.nav-section-wrape {
  width: 100%;
  padding-top: 0.5rem;
}
.section-wrape {
  width: 100%;
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.heroImage-section {
  // border: 1px solid red;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 786px) {
    flex-direction: row;
  }
  margin-bottom: 10rem;
}
.image-section {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 786px) {
    flex-direction: row;
  }
  margin-bottom: 10rem;
}
.image-many-section {
  // border: 3px solid blue;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  @media (min-width: 786px) {
    flex-direction: row;
  }
  margin-bottom: 5rem;
}
img {
  width: 100%;
  height: auto;
}
.for {
  // border: 1px dotted black;
}
</style>
