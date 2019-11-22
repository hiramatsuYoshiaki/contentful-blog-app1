<template lang="pug">
  div.main-wrape 
    div.mainLayout
      div.contents 
        section.section-wrape
          vueCarouselBGImageComponent(:items="posts") 
        section.section-wrape 
          levelJurnalComponent(:items="posts" :title="jurnalTitle")
        section.section-wrape
          levelCategoriesComponent(:title="categoryTitle")
        section.section-wrape
          levelTagsComponent
        section.section-wrape 
          levelPostlistComponent(:postLists="posts" :title="postTitle")
        
        //- section.section-wrape 
        //-   div(v-if="posts.length") 
        //-     div(v-for="(post, i) in posts" :key="i")
        //-       div title:{{ post.fields.title }}
        //-       div
        //-         img(
        //-           :src="post.fields.heroImage.fields.file.url"
        //-           :alt="post.fields.heroImage.fields.title"
        //-           :aspect-ratio="16 / 9"
        //-           max-width="1200"
        //-           max-height="700"
        //-         )
              //- div slug:{{ post.fields.slug }}
              //- div heroImage:{{ post.fields.heroImage }}
              //- div body:{{ post.fields.body }}
              //- div author:{{ post.fields.author }}
              //- div publishDate:{{ post.fields.publishDate }}
              //- div tags:{{ post.fields.tags }}
              //- div {{ JSON.stringify(posts) }}
</template>

<script>
import { mapState } from 'vuex'
// import client from '~/plugins/contentful'
import vueCarouselBGImageComponent from '~/components/carousels/vueCarouselBGImageComponent.vue'
import levelJurnalComponent from '~/components/cardLayout/jurnal/levelJurnalComponent.vue'
import levelPostlistComponent from '~/components/cardLayout/postlist/levelPostlistComponent.vue'
import levelCategoriesComponent from '~/components/cardLayout/categories/levelCategoriesComponent.vue'
import levelTagsComponent from '~/components/cardLayout/tags/levelTagsComponent.vue'

export default {
  // layout: 'default',
  layout: 'basicLayout',
  components: {
    vueCarouselBGImageComponent,
    levelJurnalComponent,
    levelPostlistComponent,
    levelCategoriesComponent,
    levelTagsComponent
  },
  data() {
    return {
      jurnalTitle: 'DISCOVER BLOG ',
      categoryTitle: 'BLOG STAGE TITLE',
      postTitle: 'BLOG POSTS 10'
    }
  },
  computed: {
    ...mapState(['posts']),
    ...mapState(['categories'])
  }
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
  //   return { posts }
  // }
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
