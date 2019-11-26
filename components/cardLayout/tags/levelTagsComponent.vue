<template lang="pug">
    div.container-fluid
      div.row
        div.section-header(v-scroll="handleScroll")
          transition(name="fadeInFromUnder")
            h5(v-if="isShow") {{title}}
        div.levelCard(v-if="isShow")
            div(v-for="(item, i) of tags " :key="i")
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
      isShow: false
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
a {
  color: $nuxt-link-color;
}
</style>
