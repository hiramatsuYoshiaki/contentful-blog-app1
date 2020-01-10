<template lang="pug">
    div.nav-wrape
        span(v-for="(item, index) in bradcrumbs" :key="index")
            nuxt-link(:to="item.to")
                i.nav-icon(:class="item.icon") 
                span.nav-text.text-ellipsis {{item.text}}
                span.nav-diviser
                    i.fas.fa-chevron-right(v-if="!((bradcrumbs.length) === (index+1))")
               
</template>
<script>
export default {
  props: {
    addItems: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      items: [
        { icon: 'fas fa-home', text: 'ホーム', to: '/' }
        // { icon: 'fas fa-tag', text: 'タグ', to: '/posts' },
        // { icon: 'fas fa-folder', text: 'カテゴリー', to: '/categories' },
        // { icon: 'fas fa-envelope', text: 'コンタクト', to: '/contact' },
        // { icon: 'fas fa-user', text: 'アバウト', to: '/about' },
        // { icon: 'fab fa-instagram', text: 'インスタグラム', to: '/about' },
        // { icon: 'fab fa-twitter', text: 'ツイッター', to: '/about' }
      ]
    }
  },
  computed: {
    bradcrumbs() {
      return this.items.concat(this.addItems)
    }
  }
}
</script>
<style lang="scss" scoped>
$text-color: $grey-light;
.nav-wrape {
  margin: 0.5rem;
}
.nav-icon {
  color: $text-color;
  display: inline-block;
  margin-right: 0.2rem;
  cursor: pointer;
}

.nav-text {
  color: $text-color;
  cursor: pointer;
}
.nav-diviser {
  display: inline-block;
  margin: 0 1.5rem;
  color: $grey-light;
  i {
    color: $grey-light;
  }
}
.text-ellipsis {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
