<template lang="pug">
  div.main-wrape 
    div.mainLayout
      div.contents
        section.nav-section-wrape
            breadcrumbs(:add-items="addBreads") 
        section.section-wrape 
            //- div *URLにカテゴリーのslugでアクセスする。
            div 
              h1 {{ category.fields.name }}
              div(v-for="(item, i) in relatedPosts" :key="i")
                
                h5 {{ item.fields.title }}
                div 
                  img.img-phto(:src="setEyeCatch(item).url" 
                                :alt="setEyeCatch(item).title" class="img" 
                                  v-if="item.fields.transition"
                    ) 
                //- div(v-if="item.fields.heroImage") 
                //-   img.img-phto( :src="item.fields.heroImage.fields.file.url.fields.file.url" 
                //-                 :alt="item.fields.heroImage.fields.title" class="img" 
                //-               ) 
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'basicLayout',
  computed: {
    ...mapGetters(['setEyeCatch']),
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
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
