<template lang="pug">
  div(v-touch:swipe.left="swipeLeftHandler"
            v-touch:start="startHandler" 
            v-touch:end="endHandler"
            v-touch:swipe.right="swipeRightHandler")
    div.content-wrape
      div.levelCard
          div.component-wrap.component-image
              //- div 
                  //- img.img(:src="img")
              h3 CONTACT
          div.component-wrap.component-title
              //- h5 e-mail
              //- h5 hiramatsu3300@gmail.com
              //- div.form-wrape
              //-   form(name="contact" method="POST" data-netlify="true")  
              //-   input(type="hidden" name="form-name" value="contact") 
                
              //-   div.form-group
              //-     p
              //-       input(type="text" name="name" required) 
              //-       span(class="highlight")
              //-       span(class="bar")
              //-       label Name
              //-   div.form-group
              //-     p
              //-       input(type="text" name="email" required)
              //-       span(class="highlight")
              //-       span(class="bar") 
              //-       label Email
              //-   div.form-group
              //-     p
              //-       input(type="text" name="subject" required) 
              //-       span(class="highlight")
              //-       span(class="bar")
              //-       label Subject
              //-   div.form-group
              //-     p
                    
              //-       textarea(name="message"  textarea required) 
              //-       span(class="highlight")
              //-       span(class="bar")
              //-       label Message
              //-   div.form-group.send-button
              //-     p
              //-       button(type="submit" Send button) Send
              
              //- <form name="contact" method="POST" data-netlify="true" >
              //- <input type="hidden" name="form-name" value="contact" />
              //-   <p>
              //-     <label>Your Name: 
              //-       <input type="text" name="name" />
              //-     </label>   
              //-   </p>
              //-   <p>
              //-     <label>Your Email: 
              //-       <input type="email" name="email" />
              //-     </label>
              //-   </p>
              //-   <p>
              //-     <label>Message: 
              //-       <textarea name="message"></textarea>
              //-     </label>
              //-   </p>
              //-   <p>
              //-     <button type="submit">Send</button>
              //-   </p>
              //- </form>
              <p>{{ errorMessage }}</p>
              div.form-wrape
                form(name="contact" method="POST" data-netlify="true" )
                  input(type="hidden" name="form-name" value="contact")
                  p
                    
                    input( type="text" name="name" require)
                    label Your Name: 
                  p
                    
                    input( type="email" name="email" require)
                    label Your Email: 
                  p
                    
                    textarea( name="message" require)
                    label Message: 
                  p
                    button( type="submit") Send
      //- input( type="text" name="name" @keyup.enter="nameValidate())          
      div.scroll-mouse-icon.scroll-mouse-icon__position
              i.style-icon.icon-down-arrow.icon-animation(class="fas fa-angle-double-down")
              div Scroll 
              div Down 
      div.swipe-mouse-icon.swipe-mouse-icon__position
          i.style-icon.icon-animation-right(class="fas fa-angle-double-left")
          span Swipe Next   
      transition( appear :name="transitionName + 'Left'")
          div.screen-herf.screen-left(v-if="page === '/new'")
      transition( appear :name="transitionName + 'Right'")
          div.screen-herf.screen-right(v-if="page === '/new'")                    

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
      errorMessage: []
    }
  },
  computed: {
    ...mapState(['transitionName'])
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
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
  height: calc(50vh - #{$header-height});
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
  width: 100%;
  height: calc(50vh - #{$header-height});
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
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  padding-right: 0.4rem;
  text-align: right;
}
//form
.form-wrape {
  border: 1px solid red;
  padding: 2rem;
}
.form-wrape p {
  position: relative;
  margin-bottom: 25px;
  border: 1px dotted rgba(0, 0, 0, 0.3);
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
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  height: 100px;
  border: none;
  border: 1px solid #757575;
}
label {
  color: #999;
  font-size: 18px;
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
// /* BOTTOM BARS ================================= */
// .bar {
//   position: relative;
//   display: block;
//   width: 300px;
// }
// .bar:before,
// .bar:after {
//   content: '';
//   height: 2px;
//   width: 0;
//   bottom: 1px;
//   position: absolute;
//   background: #5264ae;
//   transition: 0.2s ease all;
//   -moz-transition: 0.2s ease all;
//   -webkit-transition: 0.2s ease all;
// }
// .bar:before {
//   left: 50%;
// }
// .bar:after {
//   right: 50%;
// }

// /* active state */
// input:focus ~ .bar:before,
// input:focus ~ .bar:after {
//   width: 50%;
// }

// /* HIGHLIGHTER ================================== */
// .highlight {
//   position: absolute;
//   height: 60%;
//   width: 100px;
//   top: 25%;
//   left: 0;
//   pointer-events: none;
//   opacity: 0.5;
// }

// /* active state */
// input:focus ~ .highlight {
//   -webkit-animation: inputHighlighter 0.3s ease;
//   -moz-animation: inputHighlighter 0.3s ease;
//   animation: inputHighlighter 0.3s ease;
// }

// /* ANIMATIONS ================ */
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
// @keyframes inputHighlighter {
//   from {
//     background: #5264ae;
//   }
//   to {
//     width: 0;
//     background: transparent;
//   }
// }

// button {
//   display: block;
//   padding: 0.5rem 2rem;
//   border: 1px solid gray;
//   background-color: $grey-light;
// }
</style>
