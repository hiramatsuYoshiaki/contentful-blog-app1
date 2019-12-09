<template lang="pug">
    div.container-fluid
      div.row
        div.section-header(v-scroll="handleScroll")
          transition(name="fadeInFromUnder")
            div(v-if="isShow")
              h4.toggleTitle(@click="isOpen=!isOpen") 
                span {{title}}
                span(v-if="!isOpen") 
                  i.fas.fa-angle-down
                span(v-if="isOpen")
                  i.fas.fa-angle-up
        div(v-if="isOpen")
          div.levelCard(v-if="isShow")
              div(v-for="(item, i) of tags " :key="item.sys.id")
                  div 
                      nuxt-link(:to="'/tags/' + item.fields.slug")
                          span {{i + 1}}.{{ item.fields.name }}
                          span ({{ postCount(item) }})
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: 'Section Title'
    }
  },
  data() {
    return {
      isShow: false,
      isOpen: true
    }
  },
  computed: {
    ...mapState(['tags']),
    postCount() {
      return (currentTag) => {
        return this.$store.getters.associatePosts(currentTag).length
      }
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
  padding: 0 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // margin-top: 5rem;
  h5,
  h4 {
    font-weight: 600;
  }
  @media (min-width: 976px) {
    // padding: 0 5rem;
    height: 10rem;
  }
}
.levelCard {
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 768px) {
    // padding: 0 5rem;
  }
  @media (min-width: 1440px) {
    // padding: 0 16rem;
  }
}
a {
  color: $nuxt-link-color;
}
.toggleTitle {
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  i {
    margin-left: 0.5rem;
  }
}
</style>
