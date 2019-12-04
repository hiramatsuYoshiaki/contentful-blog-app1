<template lang="pug">
    div.container-fluid
      div.row
        div.section-header(v-scroll="handleScroll")
          transition(name="fadeInFromUnder")
            h5(v-if="isShow") {{title}}
   
        div.levelCard
          div.component-wrap.component-image
            cardComponent(v-for="(item, index) of items.slice(0,4)" :key="index")
              template(v-slot:image)
               div.img-wrape(v-scroll="handleScrollImg")
                transition(name="fadeInFromLeft")
                  img.img(:src="setEyeCatch(item).url" 
                              :alt="setEyeCatch(item).title"  
                                v-if="isShow"
                  ) 
          div.component-wrap.component-title
            cardTitleComponent(v-for="(item, index) of items.slice(0,4)" :key="item.sys.id")
              template(v-slot:title) 
                transition(name="fadeInFromLeft")
                  div(v-if="isShowImg") 
                    h1 {{ item.fields.title }}
              template(v-slot:date) 
                transition(name="fadeInFromLeft")
                  div(v-if="isShowImg") 
                    h5 {{ item.fields.publishDate | format-date}} 
              template(v-slot:link) 
                transition(name="fadeInFromLeft")
                  div.link-btn(v-if="isShowImg") 
                    nuxt-link(:to="linkTo(item)") 
                        span 投稿を見る
              template(v-slot:category) 
                transition(name="fadeInFromLeft")
                  div(v-if="isShowImg") 
                    nuxt-link(:to="'/categories/' + item.fields.category.fields.slug") 
                      span {{ item.fields.category.fields.name}}
             
</template>
<script>
import { mapGetters } from 'vuex'
import cardComponent from '~/components/cardLayout/newPosts/cardComponent.vue'
import cardTitleComponent from '~/components/cardLayout/newPosts/cardTitleComponent.vue'
export default {
  components: {
    cardComponent,
    cardTitleComponent
  },
  props: {
    items: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: 'Section Title'
    }
  },
  data() {
    return {
      isShow: false,
      isShowImg: false
    }
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
    linkTo: () => (obj) => {
      return { name: 'post-slug', params: { slug: obj.fields.slug } }
    }
  },
  methods: {
    handleScroll(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    handleScrollImg(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight) {
        this.isShowImg = true
      } else {
        this.isShowImg = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$nuxt-link-color: $link-color-black;
.section-header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  h5 {
    font-weight: 600;
  }
  @media (min-width: 976px) {
    padding: 0 5rem;
    height: 10rem;
  }
}
.levelCard {
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 5rem;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  }
  @media (min-width: 1440px) {
    padding: 0 16rem;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  }
}
.component-wrap {
  width: 100%;
}
.component-image {
  width: 100%;
  height: 100%;
  @media (min-width: 976px) {
    width: 70%;
  }
}
.component-title {
  width: 100%;
  height: 100%;
  @media (min-width: 976px) {
    width: 30%;
  }
}
.img-wrape {
  position: relative;
  overflow: hidden;
}
.img {
  width: 100%;
  height: auto;
}
a {
  // color: $nuxt-link-color;
  color: $white;
  background-color: $black-ter;
  display: inline-block;
  text-align: center;
  border-radius: 2rem;
  width: 15rem;
  padding: 0.2rem 2rem;
}
</style>
