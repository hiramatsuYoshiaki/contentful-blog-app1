<template lang="pug">
    div.main-wrape 
        div.mainLayout
            div.contents 
                section.section-wrape 
                    levelPostlistComponent(:postLists="posts" :title="postTitle")
</template>
<script>
import { mapState } from 'vuex'
// import client from '~/plugins/contentful'
import levelPostlistComponent from '~/components/cardLayout/blog/levelPostlistComponent.vue'
export default {
  layout: 'basicLayoutNoFotter',
  components: {
    levelPostlistComponent
  },
  data() {
    return {
      jurnalTitle: 'DISCOVER BLOG CATEGORY',
      postTitle: 'BLOG POSTS'
    }
  },
  computed: {
    ...mapState(['posts'])
  }
  //   async asyncData({ env }) {
  //     let posts = []
  //     await client
  //       .getEntries({
  //         content_type: env.CTF_BLOG_POST_TYPE_ID,
  //         order: '-fields.publishDate'
  //         // 'limit': 3
  //       })
  //       .then((res) => {
  //         posts = res.items
  //         // this.$store.commit('post/setpostAllData', posts)
  //       })
  //       .catch((err) => {
  //         console.log('Error: ' + err)
  //       })
  //     return { posts }
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
