<template lang="pug">
    //- div(v-touch:swipe.top="swipeLeftHandler"
    //-           v-touch:start="startHandler" 
    //-           v-touch:end="endHandler"
    //-           v-touch:swipe.down="swipeRightHandler")
    div.content-wrape
      div.levelCard
          div.component-wrap.component-image
              //- div 
                  //- img.img(:src="img")
              h4 CONTACT
          div.component-wrap.component-title
              div.form-wrape
                form(name="contact" method="POST" data-netlify="true" novalidate @submit="handleSubmit" action="/thanksEmail/thanksEmail")
                  input(type="hidden" name="form-name" value="contact")
                  div.form-group
                    p
                      input( type="text" name="name" v-model="name" required)
                      span(class="highlight")
                      span(class="bar")
                      label 名前:
                  div.form-group 
                    p
                      input( type="text" name="email" v-model="email" required)
                      span(class="highlight")
                      span(class="bar")
                      label メール:
                  div.form-group 
                    p
                      input( type="text" name="subject" v-model="subject" required)
                      span(class="highlight")
                      span(class="bar")
                      label 件名: 
                  div.form-group
                    p
                      textarea( name="message"  v-model="message" required)
                      span(class="highlight")
                      span(class="bar")
                      label メッセージ: 
                  div.form-group.send-button
                    p
                      input( type="submit" value="Submit")
              div( v-if="errors.length && isOpen")
                div.error-message
                  div.h7.error-title エラーを確認してください。
                    ul
                      li( v-for="error in errors " )
                        div.h7.error-text {{ error }}
                  div.h7.error-title.close-btn(@click="isOpen = !isOpen") close
      div.scroll-mouse-icon.scroll-mouse-icon__position
              i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
              div Scroll 
              div Down 
      //- div.swipe-mouse-icon.swipe-mouse-icon__position
      //-     i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
      //-     span Swipe Next   
      transition( appear :name="transitionName + 'Left'")
          div.screen.screen-left(v-if="page === '/contact/contact'")
      //- transition( appear :name="transitionName + 'Right'")
      //-     div.screen-width60.screen-30-center(v-if="page === '/contact/contact'")                    
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'vueLayout',
  data() {
    return {
      //   img: require('~/assets/img/brandLog2.png')
      //   img: require('~/assets/img/svg/universal1.1.svg')
      //   img: require('~/assets/img/svg/tourdehdr+svg.svg')
      img: require('~/assets/img/svg/tourdehdr_type.svg'),
      //   img: require('~/assets/img/svg/rakugaki1.1.svg')
      errors: [],
      name: '',
      email: '',
      subject: '',
      message: '',
      isOpen: true
    }
  },
  computed: {
    ...mapState(['transitionName']),
    ...mapState(['page'])
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    handleSubmit(e) {
      this.errors = []
      this.isOpen = true

      if (!this.name) {
        this.errors.push('名前は必須です。')
      } else if (this.name.length > 40) {
        this.errors.push('名前は４０文字以下です。')
      }

      if (!this.email) {
        this.errors.push('メールは必須です。')
      } else if (!this.validUrl(this.email)) {
        this.errors.push('無効なメールです。')
      }

      if (!this.subject) {
        this.errors.push('件名は必須です。')
      } else if (this.subject.length > 40) {
        this.errors.push('件名は４０文字以下です。')
      }

      if (!this.message) {
        this.errors.push('メッセージは必須です。')
      } else if (this.message.length > 100) {
        this.errors.push('メッセージは１００文字以下です。')
      }

      if (this.errors.length) {
        e.preventDefault()
      }
    },
    validUrl: (email) => {
      /* eslint-disable */
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      /* eslint-disable */
      return re.test(email)
    },
    handleScroll(evt) {
      if (evt.wheelDelta < 0) {
        setTimeout(() => {
          this.link_commit('/', 'fromTop')
        }, 500)
      }
      if (evt.wheelDelta > 0) {
        setTimeout(() => {
          this.link_commit('/about/about', 'fromTop')
        }, 500)
      }
    },
    swipeLeftHandler() {
      setTimeout(() => {
        this.link_commit('/', 'fromTop')
      }, 500)
    },
    startHandler() {},
    endHandler() {},
    swipeRightHandler() {
      setTimeout(() => {
        this.link_commit('/about/about', 'fromTop')
      }, 500)
    },
    link_commit(linkPath, trnName) {
      this.$store.commit('pagePathSet', linkPath)
      this.$store.commit('transitionNameSet', trnName)
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
.content-wrape {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: $body-bg-color;
  color: $white;
  padding-top: $header-height;
  padding-right: 0;
  @media (min-width: 960px) {
    padding-right: $aside-width;
  }
}

.levelCard {
  position: relative;
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (min-width: 960px) {
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
// .component-wrap {
//   margin: 2rem 0;
// }
.component-image {
  width: 100%;
  height: calc(25vh - #{$header-height});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 960px) {
    width: 30%;
    height: 80vh;
  }
  border: 1px solid gray;
}
.component-title {
  position: relative;
  width: 100%;
  height: calc(75vh - #{$header-height});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  @media (min-width: 960px) {
    width: 70%;
    height: 80vh;
    padding: 0 5rem;
    justify-content: center;
    align-items: center;
  }
  border: 1px solid gray;
}
.section-wrape {
  width: 100%;
  padding-top: $section-padding-top;
  padding-bottom: $section-padding-bottom;
  // padding-right: $section-padding-right;
  // padding-left: $section-padding-left;
  overflow-x: hidden;
}
.img {
  width: 30rem;
  height: 30rem;
}
h3 {
  margin-bottom: 5rem;
}
h5 {
  line-height: 2.5rem;
  @media (min-width: 976px) {
    line-height: 4rem;
  }
}
.scroll-mouse-icon__position {
  top: 50%;
  left: 30%;
  margin-left: 4.6rem;
  // transform: translate(-50%, -50%);
  background-color: $body-bg-color;
}
.swipe-mouse-icon__position {
  top: 25%;
  left: 0;
  transform: translate(0, -50%);
  padding-right: 0.4rem;
  text-align: right;
}
//form
.form-wrape {
  padding: 2rem;
}
.form-wrape p {
  position: relative;
  margin-bottom: 25px;
  // border: 1px dotted rgba(0, 0, 0, 0.3);
}
input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
}
input:focus {
  outline: none;
}
textarea {
  font-size: $size-6;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  height: 100px;
  border: none;
  border: 1px solid #757575;
}
textarea:focus {
  outline: none;
}
label {
  color: #999;
  font-size: $size-6;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
}
/* active state */
input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

textarea:focus ~ label,
textarea:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}
/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  width: 300px;
}
.bar:before,
.bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  // -moz-transition: 0.2s ease all;
  // -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active state */
input:focus ~ .highlight {
  // -webkit-animation: inputHighlighter 0.3s ease;
  // -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
// @-webkit-keyframes inputHighlighter {
//   from {
//     background: #5264ae;
//   }
//   to {
//     width: 0;
//     background: transparent;
//   }
// }
// @-moz-keyframes inputHighlighter {
//   from {
//     background: #5264ae;
//   }
//   to {
//     width: 0;
//     background: transparent;
//   }
// }
@keyframes inputHighlighter {
  from {
    background: #5264ae;
  }
  to {
    width: 0;
    background: transparent;
  }
}

.send-button input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 150px;
  border: none;
  border: 1px solid #757575;
  background-color: #757575;
}
//error message
.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  @media (min-width: 960px) {
    width: 50%;
    height: 80%;
  }
  background-color: rgba(250, 250, 250, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.error-title {
  color: $black;
  font-weight: $weight-semibold;
  ul {
    margin: 2rem 0;
  }
}
.error-text {
  color: $red;
  font-weight: $weight-normal;
  margin: 0.5rem;
}
.close-btn {
  color: $grey;
  border: 1px solid $grey;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  &:hover {
    color: $black;
  }
}
</style>
