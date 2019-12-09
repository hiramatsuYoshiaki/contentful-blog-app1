<template lang="pug">
    div.container-fluid
      div.row
        div.section-header(v-scroll="handleScroll")
          transition(name="fadeInFromUnder")
            h4(v-if="isShow") {{title}}
        div.levelCard
            cardComponent(v-for="(item, index) of filterTitlePage" :key="item.sys.id")
              template(v-slot:image)
                  div.img-wrape
                    transition(name="fadeInFromLeft")
                      img.img(:src="setEyeCatch(item).url" 
                                  :alt="setEyeCatch(item).title"
                                 v-if="isShow"
                      ) 
              template(v-slot:stage) 
                transition(name="fadeInFromLeft")
                  div(v-if="isShow")
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                        i.fas.fa-crown
                        span {{ item.fields.stage }} 
              template(v-slot:category) 
                transition(name="fadeInFromLeft")
                    div(v-if="isShow") 
                      nuxt-link(:to="'/categories/' + item.fields.category.fields.slug") 
                        i.fas.fa-folder
                        span {{ item.fields.category.fields.name}}
              template(v-slot:date) 
                transition(name="fadeInFromLeft")
                  div(v-if="isShow")
                    p {{ item.fields.publishDate | format-date-year-month}}
                  
              //- template(v-slot:subTitle) 
              //-   transition(name="fadeInFromLeft")
              //-     div(v-if="item.fields.transition") 
              //-       nuxt-link(:to="linkTo(item)") 
              //-           span 投稿を見る
              //-           i.fas.fa-chevron-right
              
</template>
<script>
import { mapGetters } from 'vuex'
import cardComponent from '~/components/cardLayout/jurnal/cardComponent.vue'
export default {
  components: {
    cardComponent
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
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
    linkTo: () => (obj) => {
      return { name: 'post-slug', params: { slug: obj.fields.slug } }
    },
    filterTitlePage() {
      return this.items.filter(function(item) {
        return item.fields.titlePage === true
      })
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
    }
  }
}
</script>
<style lang="scss" scoped>
$nuxt-link-color: $link-color-black;
.section-header {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  h5,
  h4 {
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
.img-wrape {
  position: relative;
  overflow: hidden;
}
.img {
  width: 100%;
  height: auto;
}
a {
  color: $nuxt-link-color;
}
i {
  margin-right: 0.5rem;
}
// i.fa-folder {
//   margin-left: 0.5rem;
// }
</style>
