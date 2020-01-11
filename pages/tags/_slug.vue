<template lang="pug">
    div.content-wrape 
      section.nav-section-wrape
        breadcrumbs(:add-items="addBreads")
      section.section-wrape 
          //- div *URLにカテゴリーのslugでアクセスする。
          div.content-header 
            h1 {{ tag.fields.name }}
          div.levelCard  
            cardComponent(v-for="(item, i) in relatedPosts" :key="i")
              template(v-slot:image)
                  img.img-phto(:src="setEyeCatch(item).url" 
                                :alt="setEyeCatch(item).title" class="img" 
                    ) 
              template(v-slot:title)
                h5.text-ellipsis {{ item.fields.title }}
              template(v-slot:date) 
                p {{ item.fields.publishDate | format-date }}
              template(v-slot:link)
                nuxt-link(:to="linkTo(item)") 
                  span 投稿を見る
                  i.fas.fa-chevron-right
            
                        
</template>
<script>
import { mapGetters } from 'vuex'
import cardComponent from '~/components/cardLayout/tags/cardComponent.vue'
export default {
  layout: 'vueLayout',
  components: {
    cardComponent
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
    linkTo: () => (obj) => {
      return { name: 'post-slug', params: { slug: obj.fields.slug } }
    },
    addBreads() {
      return [
        {
          icon: 'fas fa-tag',
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
  h1 {
    font-weight: $weight-light;
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
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.section-wrape {
  width: 100%;
  // padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.content-header {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  span {
    margin-left: 1rem;
  }
  h3 {
    margin-bottom: -1rem;
    font-weight: $weight-light;
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
