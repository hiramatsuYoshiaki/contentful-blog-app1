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
                        h5 {{ item.fields.title }}
                      template(v-slot:date) 
                        p {{ item.fields.publishDate | format-date }}
                      template(v-slot:subTitle)
                        nuxt-link(:to="linkTo(item)") 
                          span 投稿を見る
                          i.fas.fa-chevron-right
</template>
<script>
import { mapGetters } from 'vuex'
import cardComponent from '~/components/cardLayout/categories/cardComponent.vue'
export default {
  layout: 'basicLayout',
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
    padding: 0 5rem;
    flex-direction: row;
  }
  @media (min-width: 976px) {
    padding: 0 5rem;
  }
  @media (min-width: 1440px) {
    padding: 0 16rem;
  }
  // border: 1px solid green;
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
  padding-left: 1.5rem;
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
