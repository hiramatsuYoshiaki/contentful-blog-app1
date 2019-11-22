<template lang="pug">
    div.main-wrape 
        div.mainLayout
        div.contents 
            section.section-wrape 
                div(v-if="currentPost")
                    h5 {{ currentPost.fields.title }} 
                    p {{ currentPost.fields.publishDate | format-date}} 
                    div 
                        img.img-phto( :src="currentPost.fields.heroImage.fields.file.url" 
                                :alt="currentPost.fields.heroImage.fields.title" class="img" 
                              )
                div(v-else)
                    div not found
</template>
<script>
import client from '~/plugins/contentful'
// import { mapState } from 'vuex'
export default {
  layout: 'basicLayout',
  //   computed: {
  //     ...mapState(['posts'])
  //     //   currentPost() {
  //     //     return this.$store.getters.currentPosts(this.category)
  //     //   }
  //   }
  async asyncData({ env, params }) {
    let currentPost = null
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      })
      .then((res) => (currentPost = res.items[0]))
      .catch(console.error)
    return { currentPost }
  }
  //   async asyncData({ payload, store, params, error }) {
  //     const category =
  //       payload ||
  //       (await store.state.categories.find(
  //         (cat) => cat.fields.slug === params.slug
  //       ))
  //     console.log('params')
  //     console.log(params)
  //     console.log('store.state.categories')
  //     console.log(store.state.categories)
  //     if (category) {
  //       return { category }
  //     } else {
  //       return error({ statusCode: 400 })
  //     }
  //   }
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
