<template lang="pug">
  div.main-wrape 
    div.mainLayout
      div.contents 
        section.section-wrape section1
        section.section-wrape section2
          div(v-if="posts.length") 
            div(v-for="(post, i) in posts" :key="i")
              div title:{{ post.fields.title }}
              //- div slug:{{ post.fields.slug }}
              //- div heroImage:{{ post.fields.heroImage }}
              //- div body:{{ post.fields.body }}
              //- div author:{{ post.fields.author }}
              //- div publishDate:{{ post.fields.publishDate }}
              //- div tags:{{ post.fields.tags }}
              div
                img(
                  :src="post.fields.heroImage.fields.file.url"
                  :alt="post.fields.heroImage.fields.title"
                  :aspect-ratio="16 / 9"
                  max-width="1200"
                  max-height="700"
                )
              //- div {{ JSON.stringify(posts) }}
</template>

<script>
import client from '~/plugins/contentful'
export default {
  layout: 'default',
  // layout: 'layout3Parts',
  async asyncData({ env }) {
    let posts = []
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })
      .then((res) => {
        posts = res.items
        this.$store.commit('contentfule/setContentfulData', posts)
      })
      .catch((err) => {
        console.log('Error: ' + err)
      })
    return { posts }
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
  width: 600px;
  height: 350px;
}
</style>
