<template>
  <div class="wrape">
    <div v-for="(item, key) of nav" :key="key">
      <div @click="closeMobileMenu()" class="mobileElemntWrape">
        <nuxt-link :to="item.to.name">{{ item.title }}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    nav: {
      type: Array,
      default: null
    }
  },

  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
    // ...mapState(store/directory,state)
  },
  methods: {
    ...mapMutations({ close: 'headerBar/closeMobileMenu' }),
    // ...mapMutation({ name: store(directory)/mutations})
    closeMobileMenu() {
      // this.$store.commit('headerBar/setOpenMobileMenu')
      this.close()
    }
  }
}
</script>

<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mobileElemntWrape {
  margin: 1rem 0;
}
a {
  color: $body-text;
  text-decoration: none;
}
</style>
