<template lang="pug">
    div.container-fluid
      div.row
        div.section-header(v-scroll="handleScroll")
          transition(name="fadeInFromUnder")
            h5(v-if="isShow") {{title}}
        div.levelCard
            cardComponent(v-for="(item, index) of items.slice(0,4)" :key="index")
              template(v-slot:image)
               div.img-wrape(v-scroll:[index]="handleScrollImg")
                transition(name="fadeInFromLeft")
                  img.img-phto(
                    :src="item.fields.heroImage.fields.file.url" 
                    :alt="item.fields.heroImage.fields.title" class="img" 
                    v-if="item.fields.transition"
                    )
              template(v-slot:title) 
                transition(name="fadeInFromLeft")
                  div(v-if="item.fields.transition") {{ item.fields.title }}
              template(v-slot:subTitle) 
                transition(name="fadeInFromLeft")
                  div(v-if="item.fields.transition") {{ item.fields.slug }}
              //- template(v-slot:category) 
              //-   transition(name="fadeInFromLeft")
              //-     div(v-if="item.fields.transition") 
              //-       span link category: {{ item.fields.category.fields.name}} 
              template(v-slot:category) 
                transition(name="fadeInFromLeft")
                  div(v-if="item.fields.transition") 
                    nuxt-link(:to="'/categories/' + item.fields.category.fields.name") 
                      span {{ item.fields.category.fields.name}}
              //-     div fields
              //- template(v-slot:subTitle) 
              //-   transition(name="fadeInFromLeft")
              //-     div(v-if="item.fields.transition") {{ item.fields.category.fields.name }}
</template>
<script>
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
  methods: {
    handleScroll(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    handleScrollImg(evt, el, arg) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        // this.items[arg].fields.transition = true
        this.$store.commit('setImgTransition', { index: arg, boolean: true })
      } else {
        // this.items[arg].fields.transition = false
        this.$store.commit('setImgTransition', { index: arg, boolean: false })
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
.img-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: cadetblue;
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
