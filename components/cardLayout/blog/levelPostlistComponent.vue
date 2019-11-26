<template lang="pug">
    div.container-fluid 
        div.row 
          div.level2Card
            div.section-wrape.slide-item(:style="{background: `bottom / cover no-repeat url(${postLists[0].fields.heroImage.fields.file.url})`}")
            div.section-wrape.section-top-right 
              div.row 
                  div.levelCard 
                      cardComponent(v-for="(item, index) of postLists.slice(1)" :key="index") 
                          template(v-slot:image )
                              div.img-wrape(v-scroll:[index]="handleScrollImgPost")
                                  transition(name="fadeInFromLeft")
                                      img.img-phto(
                                          :src="item.fields.heroImage.fields.file.url" 
                                          :alt="item.fields.heroImage.fields.title" class="img" 
                                          ) 
                          template(v-slot:title) 
                              transition(name="fadeInFromLeft")
                                  div {{ item.fields.title }}
                          template(v-slot:subTitle) 
                              transition(name="fadeInFromLeft")
                                  div {{ item.fields.slug }}
                          template(v-slot:date) 
                              transition(name="fadeInFromLeft")
                                  div {{ item.fields.publishDate | format-date }}
</template>
<script>
import cardComponent from '~/components/cardLayout/postlist/cardComponent.vue'
export default {
  components: {
    cardComponent
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
  }
  // data() {
  //   return {
  //     isShow: false
  //   }
  // },
  // methods: {
  //   handleScroll(evt, el) {
  //     const top = el.getBoundingClientRect().top
  //     if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
  //       this.isShow = true
  //     } else {
  //       this.isShow = false
  //     }
  //   },
  //   handleScrollImgPost(evt, el, arg) {
  //     const top = el.getBoundingClientRect().top
  //     if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
  //       this.postLists[arg].fields.transitionPost = true
  //     } else {
  //       this.postLists[arg].fields.transitionPost = false
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.level2Card {
  width: 100%;
  height: 100%;
  margin-top: -3rem;
  margin-bottom: -3rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 976px) {
    flex-direction: row;
  }
  overflow: hidden;
}
.section-wrape {
  width: 100%;
  height: calc(100vh - #{$header-height});
  padding: 0;
  @media (min-width: 976px) {
    width: 50%;
  }
  overflow-y: scroll;
  overflow-x: hidden;
}
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
  // padding: 0rem 1.5rem;
  margin: 2rem 0;
  overflow-y: scroll;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    // padding: 0 5rem;
    // justify-content: center;
    // align-items: flex-start;
    // flex-direction: row;
  }
  @media (min-width: 1440px) {
    // padding: 0 16rem;
    // justify-content: center;
    // align-items: flex-start;
    // flex-direction: row;
  }
  border: 1px solid red;
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
  width: 40rem;
  height: auto;
}
</style>
