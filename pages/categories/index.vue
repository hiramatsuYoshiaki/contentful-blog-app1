<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
      v-touch:start="startHandler" 
      v-touch:end="endHandler"
      v-touch:swipe.right="swipeRightHandler")
    div
      section.sec-wrape.flex-start-row.sec1.top
        div.left-side-50
          div.upper-block-50 
            h1 CATEGORIES
            h1 {{page}}
            h3 {{transitionName}}
          div.buttom-block-50
            div top section1 left buttom
          transition( appear :name="transitionName + 'Left'")
            div.screen(v-if="page === '/categories'")
        div.right-side-50
          div.upper-block-50  
            div top section1 right upper
          div.buttom-block-50 
            div top section1 right buttom
          transition( appear :name="transitionName + 'Right'")
            div.screen(v-if="page === '/categories'")
</template>

<script>
import { mapState } from 'vuex'
// import client from '~/plugins/contentful'
// import vueCarouselBGImageComponent from '~/components/carousels/vueCarouselBGImageComponent.vue'
// import vuetifyCarouselComponent from '~/components/carousels/vuetifyCarouselComponent.vue'
// import levelNewPostComponent from '~/components/cardLayout/newPosts/levelNewPostComponent.vue'
// import levelJurnalComponent from '~/components/cardLayout/jurnal/levelJurnalComponent.vue'
// import levelPostlistComponent from '~/components/cardLayout/postlist/levelPostlistComponent.vue'
// import levelCategoriesComponent from '~/components/cardLayout/categories/levelCategoriesComponent.vue'
// import levelTagsComponent from '~/components/cardLayout/tags/levelTagsComponent.vue'

export default {
  layout: 'vueLayout',
  components: {
    // vueCarouselBGImageComponent,
    // vuetifyCarouselComponent,
    // levelJurnalComponent,
    // levelPostlistComponent,
    // levelCategoriesComponent,
    // levelTagsComponent,
    // levelNewPostComponent
  },
  data() {
    return {
      scrollY: 0,
      windowHeight: 0,
      wheelMove: 0
      // isSection1: true,
      // isSection2: true,
      // isSection3: true,
      // isSection4: true,
      // jurnalTitle: 'DISCOVER BLOG ',
      // categoryTitle: 'CATEGORIES',
      // postTitle: '最近の投稿',
      // tagTitle: 'TAGS',
      // newPostTitle: '最新の投稿'
    }
  },
  computed: {
    ...mapState(['page']),
    ...mapState(['transitionName']),
    ...mapState(['posts']),
    ...mapState(['categories'])
  },
  // async asyncData({ env }) {
  //   let posts = []
  //   await client
  //     .getEntries({
  //       content_type: env.CTF_BLOG_POST_TYPE_ID,
  //       order: '-fields.publishDate'
  //       // 'limit': 3
  //     })
  //     .then((res) => {
  //       posts = res.items
  //       // this.$store.commit('post/setpostAllData', posts)
  //     })
  //     .catch((err) => {
  //       console.log('Error: ' + err)
  //     })
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    // handleScroll(evt, el) {
    //   const top = el.getBoundingClientRect().top
    //   this.scrollY = top
    //   this.windowHeight = window.innerHeight
    // if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
    //   this.isShow = true
    // } else {
    //   this.isShow = false
    // }
    // },
    handleScroll(evt) {
      // const userAgent = window.navigator.userAgent.toLowerCase()
      // if (userAgent.includes('msie') || userAgent.includes('trident')) {
      //   alert('Internet Explorerをお使いですね')
      //   this.wheelMove += evt.deltaY / 60
      // } else if (userAgent.includes('edge')) {
      //   alert('Edgeをお使いですね')
      // } else if (userAgent.includes('chrome')) {
      //   this.wheelMove += evt.deltaY / 60
      //   alert('Google Chromeをお使いですね')
      // } else if (userAgent.includes('safari')) {
      //   alert('Safariをお使いですね')
      // } else if (userAgent.includes('firefox')) {
      //   this.wheelMove += evt.deltaY / 3
      //   alert('FireFoxをお使いですね')
      // } else if (userAgent.includes('opera')) {
      //   alert('Operaをお使いですね')
      // } else {
      //   alert('そんなブラウザは知らん')
      // }
      this.scrollY = window.scrollY
      this.windowHeight = window.innerHeight
      if (evt.wheelDelta < 0) {
        setTimeout(() => {
          this.link_commit('/stages', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        setTimeout(() => {
          this.link_commit('/tags', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      // alert('swipeLeftHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      //  this.$router.push('about')
      setTimeout(() => {
        this.link_commit('/stages', 'fromTop')
      }, 500)
    },
    startHandler() {
      // alert('startHandler')
      // cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('about')
    },
    endHandler() {
      // alert('endHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
    },
    swipeRightHandler() {
      // alert('swipeRightHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
      setTimeout(() => {
        this.link_commit('/tags', 'fromTop')
      }, 500)
    },
    link_commit(linkPath, tranName) {
      this.$store.commit('pagePathSet', linkPath)
      this.$store.commit('transitionNameSet', tranName)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;

.flex-start-row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 992px) {
    flex-direction: row;
  }
}
.sec-wrape {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.left-side-50 {
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  border-right: 1px solid gray;
  // border: 1px solid green;
}
.right-side-50 {
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  // border: 1px solid blue;
}
.upper-block-50 {
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid gray;
}

.buttom-block-50 {
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}
.upper-block-75 {
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.1);
}
.buttom-block-25 {
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}
.screen {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // background-color: rgb(37, 39, 51);
  background-color: rgb(250, 250, 250);
  transform: translateY(-100%);
}
//----------------------------------------------------------------------------
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
.sideContents {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  // border: 1px solid black;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.mainContent {
  width: 100%;
  // border: 1px solid red;
  @media (min-width: 768px) {
    width: 70%;
  }
}
.aside {
  width: 100%;
  height: 100%;
  // border: 1px solid green;
  @media (min-width: 768px) {
    width: 30%;
  }
  // background-color: $grey-lighter;
}
img {
  width: 300px;
  height: 175px;
}
</style>
