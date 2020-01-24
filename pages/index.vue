<template lang="pug">
    div(v-touch:swipe.left="swipeLeftHandler"
        v-touch:start="startHandler" 
        v-touch:end="endHandler"
        v-touch:swipe.right="swipeRightHandler")
      div
        div.sec-wrape.flex-start-row
          div.left-side-50
            section.upper-block-50.upper-right-separater
                div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
                  div.img-wrape(v-if="(index === cnt) || (index === cnt-1)")
                    div(v-if="item.fields.image2")
                      div(v-for="(item, index) in item.fields.image2" :key="item.sys.id" :idx="index")
                        transition( appear name="slideInFromTop")
                          div.bg-img(v-if="item.fields.file && index === 0" :style="{background: `top right / cover no-repeat url(${setEyeCatchImage2(item).url})`}")
                  div.bg-black-filter
          div.right-side-50
            section.upper-block-50
              transition-group( appear name="slideInFromTop" tag="div") 
                div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
                    div.img-wrape(v-if="(index === cnt) || (index === cnt-1)")
                      div(v-if="item.fields.image2")
                        div(v-for="(item, index) in item.fields.image2" :key="item.sys.id" :idx="index")
                           transition( appear name="slideInFromLeft")
                            div.bg-img(v-if="item.fields.file &&  index === 1" :style="{background: `top left  / cover no-repeat url(${setEyeCatchImage2(item).url})`}")
                    div.bg-black-filter
          section.header-title 
            h3 Destination 
            h6 to discover my favorite photos 
            h6 TOURdeHDR+THIRD ver0.2
          section.image-card
              div.card-top
                div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
                  transition( appear name="slideInFromTop")
                    div.img-wrape-card(v-if="(index === cnt) || (index === cnt-1)")
                      div.bg-img-card(:style="{background: `top center / cover no-repeat url(${setEyeCatch(item).url})`}")
              div.card-bottom
                 div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
                  transition( appear name="slideInFromLeft")
                    div(v-if="(index === cnt) ")
                      h4.uppercase
                        nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                          span {{item.fields.stage}} 
                      h6 
                         nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                          span {{item.fields.title}}
          section.stage-list 
            div.stage-wrap 
                div.stage-item(v-for="(item, index) of filterTitlePage.slice(0,12)" :key="item.sys.id") 
                  div.stage-bg(v-if="index===cnt")
                  div.stage-bg-index 
                      h3 {{index + 1 }}
                  div.stage-no.uppercase.h7 
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                     span  {{item.fields.category.fields.stage}}
                  div.stage-title.p 
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                      span {{ item.fields.title }} 
          div.separater-header
          div.separater-right
          section.logo 
            h4 TOURdeHDR+THIRD
          div.scroll-mouse-icon.scroll-mouse-icon__position
            i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
            div Scroll 
            div Down 
          div.swipe-mouse-icon.swipe-mouse-icon__position
              i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
              span Swipe Next 
          transition( appear :name="transitionName + 'Left'")
              div.screen-herf.screen-left(v-if="page === '/'")
          transition( appear :name="transitionName + 'Right'")
              div.screen-herf.screen-right(v-if="page === '/'")
        
          
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import client from '~/plugins/contentful'
// import vueCarouselBGImageComponent from '~/components/carousels/vueCarouselBGImageComponent.vue'
// import vuetifyCarouselComponent from '~/components/carousels/vuetifyCarouselComponent.vue'
// import levelNewPostComponent from '~/components/cardLayout/newPosts/levelNewPostComponent.vue'
// import levelJurnalComponent from '~/components/cardLayout/jurnal/levelJurnalComponent.vue'
// import levelPostlistComponent from '~/components/cardLayout/postlist/levelPostlistComponent.vue'
// import levelCategoriesComponent from '~/components/cardLayout/categories/levelCategoriesComponent.vue'
// import levelTagsComponent from '~/components/cardLayout/tags/levelTagsComponent.vue'
// import TransitionScreen from '~/components/transition/TransitionScreen.vue'
export default {
  layout: 'vueLayout',
  components: {
    // vueCarouselBGImageComponent
    // vuetifyCarouselComponent,
    // levelJurnalComponent,
    // levelPostlistComponent,
    // levelCategoriesComponent,
    // levelTagsComponent,
    // levelNewPostComponent
    // TransitionScreen
  },
  data() {
    return {
      scrollY: 0,
      windowHeight: 0,
      wheelMove: 0,
      cnt: 1,
      acrInterval: null,
      loopTime: 5000

      // img1left: require('~/assets/img/img3186_left.jpg'),
      // img1right: require('~/assets/img/img3186_right.jpg'),
      // img2left: require('~/assets/img/img3252_left.jpg'),
      // img2right: require('~/assets/img/img3252_right.jpg'),
      // images: [
      //   { id: 0, url: require('~/assets/img/img3186_left.jpg') },
      //   { id: 1, url: require('~/assets/img/img3186_right.jpg') },
      //   { id: 2, url: require('~/assets/img/img3252_left.jpg') },
      //   { id: 3, url: require('~/assets/img/img3252_right.jpg') }
      // ],
      // imagesLeft: [
      //   { id: 0, url: require('~/assets/img/img3186_left.jpg') },
      //   { id: 1, url: require('~/assets/img/img3252_left.jpg') },
      //   { id: 2, url: require('~/assets/img/img3186_right.jpg') }
      // ],
      // imagesRight: [
      //   { id: 1, url: require('~/assets/img/img3186_right.jpg') },
      //   { id: 2, url: require('~/assets/img/img3252_right.jpg') },
      //   { id: 3, url: require('~/assets/img/img3186_left.jpg') }
      // ]
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
    ...mapState(['categories']),
    ...mapGetters(['setEyeCatch', 'setEyeCatchImage2']),
    // page() {
    //   return this.$store.state.page
    // }
    filterTitlePage() {
      return this.posts.filter(function(item) {
        return item.fields.titlePage === true
      })
    }
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
    // console.log('index mounted')
    // window.addEventListener('wheel', (evt) => this.handleScroll(evt))
    window.addEventListener('wheel', this.handleScroll)
    // console.log('index addEventListener')
    this.loopLoding()
  },
  destroyed() {
    // window.removeEventListener('wheel', (evt) => this.handleScroll(evt))
    window.removeEventListener('wheel', this.handleScroll)
    // console.log('index removeEventListener')
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
      // this.wheelMove += evt.originalEvent.deltaY

      if (evt.wheelDelta < 0) {
        // alert('index' + evt.wheelDelta)
        // console.log('index' + evt.wheelDelta)
        setTimeout(() => {
          this.link_commit('/new', 'fromTop')
        }, 500)
        // this.$router.push({ path: '/stages' })

        // const linkPath = '/stages'
        // this.$store.commit('pagePathSet', linkPath)
        // setTimeout(() => {
        //   this.$router.push({ path: linkPath })
        // }, 500)
        // alert('wheel up: ' + evt.wheelDelta)
        // alert('wheelDelta')
        // this.$router.push('/stages')
        // this.wheelMove += evt.wheelDelta
        // this.wheelMove += evt.deltaY
        // this.wheelMove = evt.screenY
        // } else {
        // alert('wheel down: ' + evt.wheelDelta)
        // this.$router.push('/contact/contact')
        // console.log(evt.wheelDelta)
        // this.wheelMove = evt.wheelDelta
        // this.wheelMove += evt.deltaY
        // this.wheelMove = evt.screenY
      }
    },
    swipeLeftHandler() {
      // alert('swipeLeftHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      //  this.$router.push('about')
      setTimeout(() => {
        this.link_commit('/new', 'fromTop')
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
      // setTimeout(() => {
      //   this.link_commit('/post', 'fromTop')
      // }, 500)
    },
    swipeRightHandler() {
      // alert('swipeRightHandler')
      //  cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('contact')
    },
    link_commit(linkPath, trnName) {
      this.$store.commit('pagePathSet', linkPath)
      this.$store.commit('transitionNameSet', trnName)
      setTimeout(() => {
        this.$router.push({ path: linkPath })
      }, 1000)
    },
    loopLoding() {
      // this.j = -90;
      // this.step1 = this.step2 = this.step3 = true;
      this.cnt = 0
      this.loopTime = 5000
      this.acrInterval = setInterval(this.renderTime, this.loopTime)
    },
    renderTime() {
      // console.log(this.cnt)
      // console.log(this.images.length)
      // console.log(this.loopTime)
      // this.img = this.images[this.cnt].url
      if (this.cnt < this.filterTitlePage.length - 1) {
        this.cnt += 1
        // this.loopTime = 1000
      } else {
        this.cnt = 0
        // this.loopTime = 5
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$title-text-color: $body-text; //#ff
$title-text-black: $body-color; //#212121
$nuxt-link-color: $link-color;
$nuxt-link-black: $link-color-black;
.flex-start-row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
}
.left-side-50 {
  background-color: $body-bg-color;
}
.right-side-50 {
  background-color: $body-bg-color;
  @media (min-width: 960px) {
    padding-right: $aside-width;
  }
}

.header-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 0.5rem;
  @media (min-width: 960px) {
    width: 50%;
    padding-left: 2rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  .h7,
  .h8,
  .p {
    color: $title-text-color;
  }

  h3 {
    font-size: $size-4;
    font-weight: 400;
    line-height: 1.5;
  }
  @media (min-width: 500px) {
    width: 50%;
    h3 {
      font-size: $size-3;
      font-weight: 400;
      line-height: 1.5;
    }
  }
}
//--------------------------------
.image-card {
  position: absolute;
  background-color: transparent;
  width: 50%;
  height: 50%;
  top: 0%;
  left: 50%;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  .h7,
  .h8,
  .p {
    span {
      color: $title-text-color;
    }
  }
  @media (min-width: 960px) {
    background-color: rgb(250, 250, 250);
    transform: translate(50%, -50%);
    top: 50%;
    right: #{$aside-width};
    left: 50%;
    width: calc((50% - #{$aside-width}) / 1.5);
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6,
    .h7,
    .h8,
    .p {
      span {
        color: $title-text-black;
      }
    }
  }
  @media (min-width: 1440px) {
    background-color: rgb(250, 250, 250);
    transform: translate(50%, -50%);
    top: 50%;
    left: 50%;
    width: calc((100% - #{$aside-width}) / 4);
  }
}
.card-top {
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
  display: none;
  @media (min-width: 960px) {
    display: block;
  }
}
.card-bottom {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 960px) {
    height: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
.img-wrape-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.bg-img-card {
  width: 100%;
  height: 25vh;
}
// .screen-herf {
//   position: absolute;
//   width: 50%;
//   height: 100%;
//   background-color: rgb(250, 250, 250);
//   transform: translateY(-100%);
// }
// .screen-left {
//   top: 0;
//   left: 0;
// }
// .screen-right {
//   top: 0;
//   left: 50%;
// }

.bottom-right-separater {
  border-right: none;
  @media (min-width: 960px) {
    border-right: 1px solid $grey;
  }
}
.sepapeter {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  border: 5px solid $grey;
  z-index: 100;
}
// .setapeter-list {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 50%;
//   border-right: 1px solid $grey;
// }

// .left-separater {
//   border-left: 1px solid $grey;
//   height: 50vh;
// }
// .bottom-separater {
//   border-bottom: 1px solid $grey;
//   height: $header-height;
// }
//------------------------

.stage-list {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50%;
  top: 50%;
  left: 0;
  @media (min-width: 960px) {
    width: 50%;
  }
}
.stage-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.stage-item {
  position: relative;
  overflow: hidden;
  width: 50%;
  height: 8.2vh;
  padding: 0.5rem 0.5rem;
  overflow: hidden;
  color: $title-text-color;
  @media (min-width: 960px) {
    width: 33.333%;
    height: 12.5vh;
    padding: 2rem 1rem;
  }

  .stage-title,
  .stage-no {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 90%;
    overflow: hidden;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    a span {
      color: $nuxt-link-color;
    }
  }
  .stage-title {
    margin-top: 1rem;
    @media (min-width: 960px) {
      margin-top: 1.5rem;
    }
  }
}
.stage-bg-index {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: rgba(250, 250, 250, 0.1);
  text-align: center;
  transform: rotate(-20deg) translate(-1rem, -1rem);
  transform-origin: center;
  display: inline-block;
  @media (min-width: 960px) {
    padding-top: 0;
    padding-right: 0;
    transform: rotate(-20deg) translate(-3rem, 1rem);
    text-align: right;
    transform-origin: center;
  }
}
.stage-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $red;
}

.logo {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-right: calc(1rem + #{$aside-width});
  text-align: right;
  color: rgba(250, 250, 250, 0.2);
  display: none;
  @media (min-width: 960px) {
    display: block;
  }
}

.img-wrape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
img {
  width: 100%;
  height: auto;
}
.bg-img {
  width: 50vw;
  height: 50vh;
}
//navigation icon
.scroll-mouse-icon__position {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 6rem;
  margin-left: 5rem;
}
.swipe-mouse-icon__position {
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  padding-right: 0.4rem;
  text-align: right;
}
</style>
