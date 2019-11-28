<template lang="pug">
    div.main-wrape 
        div.mainLayout
        div.contents
          section.nav-section-wrape
            breadcrumbs(:add-items="addBreads")
          section.section-wrape 
                div(v-if="currentPost")
                    h5 {{ currentPost.fields.title }} 
                    p {{ currentPost.fields.publishDate | format-date}} 
                    div 
                        //- img.img-phto( :src="currentPost.fields.heroImage.fields.file.url" 
                        //-         :alt="currentPost.fields.heroImage.fields.title" class="img" 
                        //-       )
                        img.img-phto(
                                    :src="setEyeCatch(currentPost).url" 
                                    :alt="setEyeCatch(currentPost).title" class="img" 
                                    v-if="currentPost.fields.transitionPost"
                                    ) 
                    div(v-if="currentPost.fields.image") 
                        img.img-phto(
                                    :src="setEyeCatchImage(currentPost).url" 
                                    :alt="setEyeCatchImage(currentPost).title" class="img" 
                                    v-if="currentPost.fields.transitionPost"
                                    ) 
                    div(v-if="currentPost.fields.image2") 
                        img.img-phto(
                                    :src="setEyeCatchImage2(currentPost).url" 
                                    :alt="setEyeCatchImage2(currentPost).title" class="img" 
                                    v-if="currentPost.fields.transitionPost"
                                    ) 
                div(v-else)
                    div not found
</template>
<script>
import { mapGetters } from 'vuex'
// import breadcrumbs from '~/components/ui/breadcrumbs.vue'
// import client from '~/plugins/contentful'
export default {
  layout: 'basicLayout',
  // components: {
  //   breadcrumbs
  // },
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
img {
  width: 300px;
  height: 175px;
}
</style>
