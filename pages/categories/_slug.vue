<template lang="pug">
  div.content-wrape 
    section.nav-section-wrape
        breadcrumbs(:add-items="addBreads") 
    section.section-wrape 
        //- div *URLにカテゴリーのslugでアクセスする。
        div.content-header 
          h3 {{ category.fields.name }}
          p {{ category.fields.year }}
            span {{ category.fields.stage }}
        div.levelCard
          cardComponent(v-for="(item, index) in relatedPosts" :key="item.sys.id")
            template(v-slot:image)
              div 
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
// import cardComponent from '~/components/cardLayout/categories/cardComponent.vue'
import cardComponent from '~/components/cardLayout/tags/cardComponent.vue'
export default {
  layout: 'vueLayout',
  components: {
    cardComponent
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
    },
    linkTo: () => (obj) => {
      return { name: 'post-slug', params: { slug: obj.fields.slug } }
    },
    addBreads() {
      return [
        {
          icon: 'fas fa-folder',
          text: this.category.fields.name,
          to: '/categories/' + this.category.fields.slug
        }
      ]
    }
  },
  async asyncData({ payload, store, params, error }) {
    const category =
      payload ||
      (await store.state.categories.find(
        (cat) => cat.fields.slug === params.slug
      ))
    if (category) {
      return { category }
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
  // padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  // @media (min-width: 786px) {
  //   padding: 0 5rem;
  //   flex-direction: row;
  // }
  // @media (min-width: 976px) {
  //   padding: 0 5rem;
  // }
  // @media (min-width: 1440px) {
  //   padding: 0 16rem;
  // }
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
