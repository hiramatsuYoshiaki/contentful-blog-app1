<template lang="pug">
    div(v-touch:swipe.left="swipeLeftHandler"
        v-touch:start="startHandler" 
        v-touch:end="endHandler"
        v-touch:swipe.right="swipeRightHandler")
      div
        div.sec-wrape.my-flex.sec1.top
          div.left-side-50
            section.upper-block-50
                div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
                  div.img-wrape(v-if="(index === cnt) || (index === cnt-1)")
                    div(v-if="item.fields.image2")
                      div(v-for="(item, index) in item.fields.image2" :key="item.sys.id" :idx="index")
                        transition( appear name="slideInFromTop")
                          div.bg-img(v-if="item.fields.file && index === 0" :style="{background: `top right / cover no-repeat url(${setEyeCatchImage2(item).url})`}")
                  div.bg-black-filter
            section.buttom-block-50
            
          div.right-side-50
            section.upper-block-50
              transition-group( appear name="slideInFromTop" tag="div") 
                div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
                    div.img-wrape(v-if="(index === cnt) || (index === cnt-1)")
                      div(v-if="item.fields.image2")
                        div(v-for="(item, index) in item.fields.image2" :key="item.sys.id" :idx="index")
                           transition( appear name="slideInFromLeft")
                            div.bg-img(v-if="item.fields.file &&  index === 1" :style="{background: `top left / cover no-repeat url(${setEyeCatchImage2(item).url})`}")
                    div.bg-black-filter
            section.buttom-block-50
              //- div(v-for="(item, index) of filterTitlePage" :key="item.sys.id") 
                    //-  transition( appear name="slideInFromLeft")
                    //-     div.img-wrape(v-if="(index === cnt) || (index === cnt-1)")
                    //- div {{index}}
                    //- div post:{{item.fields.title}}---------------
                    //- div {{item.fields.image2[0].fields.file.url}}
                    //- div {{item.fields.image2[0]}}
                    //- div(v-if="item.fields.image2")
                    //-   div(v-for="(item, index) in item.fields.image2" :key="item.sys.id" :idx="index")
                    //-     div(v-if="item.fields.file")
                          //- div {{item.fields.file.url}}
                          //- div.bg-img(:style="{background: `top right / cover no-repeat url(${setEyeCatchImage2(item).url})`}")
                        //- div {{item.fields.title}}xxxxxxx
                        //- div {{item.fields.file}}

            
          section.header-title 
            //- p DISCOVER
            //- div.h8 DISCOVER
            //- div.h7 DISCOVER
            //- h6 DISCOVER 
            //- h5 DISCOVER 
            //- h4 DISCOVER 
            //- h3 DISCOVER 
            //- h2 DISCOVER 
            h3 Destination 
            h6 to discover my favorite photos 
            h6 TOURdeHDR+THIRD 

             
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
                      //- div.h7 {{item.fields.publishDate | format-date-year-month }}
                      h4.uppercase
                        nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                          span {{item.fields.stage}} 
                      h6 
                         nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                          span {{item.fields.title}}
                      //- div {{item.fields.body}}
                      //- div {{item.fields.description}}
          section.stage-list 
            div.stage-wrap 
                div.stage-item(v-for="(item, index) of filterTitlePage.slice(0,12)" :key="item.sys.id") 
                  div.stage-bg(v-if="index===cnt")
                  div.stage-bg-index 
                      h1 {{index + 1 }}
                  div.stage-no.uppercase.h7 
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                     span  {{item.fields.category.fields.stage}}
                  div.stage-title.p 
                    nuxt-link(:to="'/stages/' + item.fields.category.fields.stage")
                      //- i.fas.fa-crown
                      span {{ item.fields.title }} 
                  
          section.logo 
            h4 TOURdeHDR+THIRD
          transition( appear :name="transitionName + 'Left'")
              div.screen.screen-left(v-if="page === '/'")
          transition( appear :name="transitionName + 'Right'")
              div.screen.screen-right(v-if="page === '/'")
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
          this.link_commit('/post', 'fromTop')
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
    },
    startHandler() {
      // alert('startHandler')
      // cancelAnimationFrame(this.reqAnimation)
      // this.$router.push('about')
      setTimeout(() => {
        this.link_commit('/post', 'fromTop')
      }, 500)
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
      console.log('loop')
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
$header-bg-color: $header-color;
$header-text-color: $header-text;
$header-bar-height: $header-height;
$title-text-color: $body-text; //#ff
$title-text-black: $body-color; //#212121
$nuxt-link-color: $link-color;
$nuxt-link-black: $link-color-black;
.my-flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  // @media (min-width: 992px) {
  //   flex-direction: row;
  // }
}
.sec-wrape {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}
.left-side-50 {
  position: relative;
  width: 100%;
  height: 100%;
  @media (min-width: 992px) {
    width: 50%;
  }
  overflow: hidden;
  background-color: $body-bg-color;
}
.right-side-50 {
  position: relative;
  width: 100%;
  height: 100%;

  @media (min-width: 992px) {
    width: 50%;
  }
  overflow: hidden;
  background-color: $body-bg-color;
}
.upper-block-50 {
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
  // border-right: 1px solid rgb(128, 128, 128);
}

.buttom-block-50 {
  position: relative;
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.header-title {
  width: 100%;
  height: 50%;
  @media (min-width: 992px) {
    width: 50%;
  }
  position: absolute;
  top: 0;
  left: 0;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 2rem;
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
  @media (min-width: 976px) {
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
  @media (min-width: 976px) {
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
  @media (min-width: 976px) {
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
.screen {
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: rgb(250, 250, 250);
  transform: translateY(-100%);
}
.screen-left {
  top: 0;
  left: 0;
}
.screen-right {
  top: 0;
  left: 50%;
}
//------------------------
.stage-list {
  width: 100%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 0;
  @media (min-width: 976px) {
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
  @media (min-width: 992px) {
    width: 33.333%;
    height: 12.5vh;
    padding: 2rem 1rem;
  }
  // border: 1px solid rgba(0, 0, 0, 0.2);

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
    @media (min-width: 992px) {
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
  text-align: right;
  transform: rotate(-20deg) translate(-3rem, 0);
  // background-color: $red;
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
  // width: 100%;
  // height: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  // @media (min-width: 976px) {
  //   width: 50%;
  // }
  text-align: right;
  color: rgba(250, 250, 250, 0.2);
  // transform: rotate(0deg) translate(-3rem, 2rem);
}
.uppercase {
  text-transform: uppercase;
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
.bg-black-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 50vw;
  height: 50vh;
  background: rgba(0, 0, 0, 0.1);
}

//----------------------------------------------------------------------------
// .main-wrape {
//   margin-top: $header-height;
// }
// .mainLayout {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;

//   @media (min-width: 992px) {
//     flex-direction: row;
//   }
// }
// .contents {
//   width: 100%;
//   @media (min-width: 992px) {
//     width: 100%;
//   }
// }
// .section-wrape {
//   width: 100%;
//   padding-top: $section-padding-top;
//   padding-bottom: $section-padding-bottom;
//   // padding-right: $section-padding-right;
//   // padding-left: $section-padding-left;
//   overflow-x: hidden;
// }
// .sideContents {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   @media (min-width: 768px) {
//     flex-direction: row;
//   }
// }
// .mainContent {
//   width: 100%;
//   @media (min-width: 768px) {
//     width: 70%;
//   }
// }
// .aside {
//   width: 100%;
//   height: 100%;
//   @media (min-width: 768px) {
//     width: 30%;
//   }
// }
</style>
