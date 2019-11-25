<template lang="pug">
    div.container-fluid 
        div.row 
            div.section-header 
              //- span(:is="draftChip(postLists)")
        div.row 
            div.section-header(v-scroll="handleScroll") 
                transition(name="fadeInFromUnder")
                    h5(v-if="isShow") {{title}} 
        div.row 
            div.levelCard 
                cardComponent(v-for="(item, index) of postLists" :key="index") 
                    template(v-slot:image)
                        div.img-wrape(v-scroll:[index]="handleScrollImgPost")
                            transition(name="fadeInFromLeft")
                                img.img-phto(
                                    :src="setEyeCatch(item).url" 
                                    :alt="setEyeCatch(item).title" class="img" 
                                    v-if="item.fields.transitionPost"
                                    ) 
                    template(v-slot:title) 
                      transition(name="fadeInFromLeft")
                        div(v-if="item.fields.transitionPost") {{ item.fields.title }}
                    template(v-slot:subTitle) 
                      transition(name="fadeInFromLeft")
                        div(v-if="item.fields.transitionPost") 
                          nuxt-link(:to="linkTo(item)") 
                              span Slug link:{{item.fields.slug}}
                    template(v-slot:date) 
                      transition(name="fadeInFromLeft")
                        div(v-if="item.fields.transitionPost") {{ item.fields.publishDate | format-date }}
                    template(v-slot:category) 
                      transition(name="fadeInFromLeft")
                        div(v-if="item.fields.transitionPost") 
                          nuxt-link(:to="'/categories/' + item.fields.category.fields.slug") 
                            span {{ item.fields.category.fields.name}}
                    //- template(v-slot:tags) 
                    //-   transition(name="fadeInFromLeft")
                    //-     div(v-if="item.fields.tags")
                    //-       span(v-for="(tag, i) of item.fields.tags" :key="tag.sys.id") 
                    //-         span {{tag.fields.name}},
                    template(v-slot:tags) 
                      transition(name="fadeInFromLeft")
                        div(v-if="item.fields.tags")
                          span(v-for="(tag, i) of item.fields.tags" :key="tag.sys.id")
                            nuxt-link(:to="'/tags/' + tag.fields.slug")  
                              span {{tag.fields.name}}({{tag.fields.slug}}),
                    template(v-slot:draft) 
                      transition(name="fadeInFromLeft")
                        div(:is="draftChip(item)")
                     


</template>
<script>
import { mapGetters } from 'vuex'
import cardComponent from '~/components/cardLayout/postlist/cardComponent.vue'
import draftChip from '~/components/posts/draftChip.vue'
export default {
  components: {
    cardComponent,
    draftChip
  },
  props: {
    postLists: {
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
      isShow: false
      //   isShowImg: false
    }
  },
  computed: {
    ...mapGetters(['setEyeCatch', 'draftChip']),
    linkTo: () => (obj) => {
      return { name: 'post-slug', params: { slug: obj.fields.slug } }
    }
  },
  methods: {
    handleScroll(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    handleScrollImgPost(evt, el, arg) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        // this.postLists[arg].fields.transitionPost = true
        this.$store.commit('setListTransition', {
          index: arg,
          boolean: true
        })
      } else {
        // this.postLists[arg].fields.transitionPost = false
        this.$store.commit('setListTransition', {
          index: arg,
          boolean: false
        })
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
  margin-top: 5rem;
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
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 5rem;
    // justify-content: center;
    // align-items: flex-start;
    // flex-direction: row;
  }
  @media (min-width: 1440px) {
    padding: 0 16rem;
    // justify-content: center;
    // align-items: flex-start;
    // flex-direction: row;
  }
}
.img-wrape {
  position: relative;
  overflow: hidden;
}
.img-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: auto;
}
a {
  color: $nuxt-link-color;
}
</style>
