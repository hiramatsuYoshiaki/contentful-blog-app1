<template lang="pug">
  div.main-wrape 
    div.mainLayout
      div.contents 
        section.section-wrape 
            div *URLにカテゴリーのslugでアクセスする。
            div 
              h1 {{ category.fields.name }}
              div(v-for="(item, i) in relatedPosts" :key="i")
                //- div {{ item.fields.category.fields.name }}
                h5 {{ item.fields.title }}
                //- p  {{ item.fields.publishDate | format-date}} 
                div 
                  img.img-phto( :src="item.fields.heroImage.fields.file.url" 
                                :alt="item.fields.heroImage.fields.title" class="img" 
                              ) 
</template>
<script>
export default {
  layout: 'basicLayout',
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
    }
  },
  async asyncData({ payload, store, params, error }) {
    console.log(params)
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
