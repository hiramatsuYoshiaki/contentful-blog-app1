<template lang="pug">
    div.main-wrape 
        div.mainLayout
            div.contents
                section.nav-section-wrape
                  breadcrumbs(:add-items="addBreads") 
                section.section-wrape 
                    //- div *URLにカテゴリーのslugでアクセスする。
                    div 
                      h1 {{ tag.fields.name }}
                      div(v-for="(item, i) in relatedPosts" :key="i")
                        div {{ item.fields.title }}
                        div 
                          img.img-phto(:src="setEyeCatch(item).url" 
                                        :alt="setEyeCatch(item).title" class="img" 
                                          v-if="item.fields.transition"
                            ) 
                      
</template>
<script>
// import client from '~/plugins/contentful'
import { mapGetters } from 'vuex'
export default {
  layout: 'basicLayout',
  computed: {
    ...mapGetters(['setEyeCatch']),
    addBreads() {
      return [
        {
          icon: 'fas fa-tag',
          // text: this.category.fields.name,
          text: this.tag.fields.name,
          to: '/tags/' + this.tag.fields.slug
        }
      ]
    }
  },
  asyncData({ payload, params, error, store, env }) {
    const tag =
      payload || store.state.tags.find((tag) => tag.fields.slug === params.slug)
    // let tag = payload
    // if (!tag) {
    //   for (let i = 0; i < store.state.posts.length; i++) {
    //     const tags = store.state.posts[i].fields.tags
    //     if (tags) tag = tags.find((tag) => tag.fields.slug === params.slug)
    //     if (tag) break
    //   }
    // }
    if (tag) {
      const relatedPosts = store.getters.associatePosts(tag)
      // const relatedPosts = await client
      //   .getEntries({
      //     content_type: env.CTF_BLOG_POST_TYPE_ID,
      //     'fields.tags.sys.id': tag.sys.id
      //   })
      //   .then((res) => res.items)
      //   .catch(console.error)
      return { tag, relatedPosts }
    } else {
      error({ statusCode: 400 })
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
